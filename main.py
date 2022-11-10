import asyncio
import os
from copy import copy
from datetime import timedelta
from urllib.parse import urlparse

import discord
import youtube_dl
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()

class NoSongException(Exception):
    ...


def p(a: any):
    if os.getenv('ZEROTWO_VERSION') == 'develop':
        print(a)


class CommonException(Exception):
    def __init__(self, msg: str):
        self.detail = msg


class MyAudio(discord.FFmpegOpusAudio):
    played = 0

    def read(self) -> bytes:
        self.played += 20
        return super().read()


class Song:
    def __init__(self, webpage_url: str, audio_url: str, applicant: any, title: str, thumbnail_url: str, duration: int):
        self.webpage_url: str = webpage_url
        self.audio_url: str = audio_url
        self.applicant: any = applicant
        self.title: str = title
        self.thumbnail_url: str = thumbnail_url
        self.duration: timedelta = timedelta(seconds=duration)

    def __repr__(self):
        return f'{self.title} ({self.duration}, {self.webpage_url}, {self.applicant})'


async def _get_source(song: Song) -> MyAudio:
    ffmpeg_options = {'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5',
                      'options': '-vn'}
    p(f'{ffmpeg_options=}')
    p(f'_get_source {song=}')
    if song is None:
        p('raise')
        raise NoSongException()
    p(f'{song.audio_url=}')
    try:
        source = await MyAudio.from_probe(song.audio_url, method='fallback', **ffmpeg_options)
    except Exception as e:
        print(e)
    p(f'{source=}')
    if source:
        return source
    else:
        raise CommonException("Source is not ready.")


class Player:
    def __init__(self, context: discord.ApplicationContext):
        self.play_queue: list = []
        self._instance = None
        self._is_loop_running = False
        self._current_playing: Song | None = None
        self._is_paused = False
        self._event = asyncio.Event()

        self._context = copy(context)
        self._task = bot.loop.create_task(self._loop())

        self.is_repeating = False

    def _add_song(self, arg: str, applicant: any) -> Song:
        """
        Add song to `self.queue`.
        """
        ydl_options = {
            'format': 'bestaudio/best',
            'restrictfilenames': True,
            'noplaylist': True,
            'nocheckcertificate': True,
            'ignoreerrors': False,
            'logtostderr': True,
            'quiet': False,
            'no_warnings': False,
            'default_search': 'auto',
            'forceduration': True,
            'source_address': '0.0.0.0',
            'force-ipv4': True,
            'cachedir': False
        }
        with youtube_dl.YoutubeDL(ydl_options) as ydl:
            def is_url(url):
                try:
                    result = urlparse(url)
                    return all([result.scheme, result.netloc])
                except ValueError:
                    return False

            if is_url(arg):
                ready = f'{arg}'
            else:
                ready = f'ytsearch:{arg}'

            info = ydl.extract_info(ready, download=False)

            if 'entries' in info:
                info = info['entries'][0]

            # print(f'info: {ujson.dumps(info, indent=4)}')

            song = Song(webpage_url=info['webpage_url'],
                        audio_url=info['url'],
                        title=info['title'],
                        thumbnail_url=info['thumbnail'],
                        applicant=applicant,
                        duration=info['duration'])

            p(f'add_song {song=}')

            self.play_queue.append(song)
            return song

    async def _play(self, after) -> None:
        """
        Play next song from `self.queue`.
        """
        if self.play_queue:
            p(f'if self.play_queue')
            if not self.is_repeating:
                next_song: Song = self.play_queue.pop(0)
            else:
                p(f'repeating mode is on and i will play current song again.')
                next_song: Song = self.get_current_playing_song()
            p(f'{next_song=}')

            try:
                source = await _get_source(next_song)
            except NoSongException as e:
                p('caught in exception')
                p(e)
                exit(-1)
            p(f'{source=}')
            if self._context.voice_client and hasattr(self._context.voice_client, 'play'):
                self._context.voice_client.play(source, after=after)
                p('vc play')

                if self._context.voice_client.is_playing():
                    p('is_playing')
                    self._current_playing = next_song
                else:
                    raise CommonException('vc is not playing now.')
            else:
                raise CommonException(f'voice_client is not ready\n'
                                      f'vc: {self._context.voice_client}\n'
                                      f'play: {hasattr(self._context.voice_client, "play")}')

    async def _loop(self) -> None:
        while True:
            self._event.clear()

            if not self._context.voice_client.is_playing() and not self._is_paused and self.play_queue:
                if self.play_queue:
                    await self._play(self._play_next_song)
            elif not self.is_repeating and not self._is_paused and not self.play_queue:
                await self._context.voice_client.disconnect(force=True)
                del players[self._context.guild_id]
                players[self._context.guild_id] = None

            await self._event.wait()

    def _play_next_song(self, error=None):
        if error:
            print(str(error))
            self._task.cancel(str(error))
            raise CommonException(str(error))

        self._event.set()

    async def play(self, arg: str, applicant: any) -> Song:
        # Add song to queue
        song = self._add_song(arg, applicant)
        return song

    async def get_queue(self) -> (Song | None, [Song]):
        return self._current_playing, [song for song in self.play_queue]

    def get_queue_len(self) -> int:
        return len(self.play_queue)

    def get_current_playing_song(self) -> Song:
        return self._current_playing

    def repeat_this_song(self, is_repeating: bool) -> bool:
        self.is_repeating = is_repeating
        return self.is_repeating

    def paused(self, context: discord.ApplicationContext):
        self._is_paused = True
        context.voice_client.pause()

    def resumed(self, context: discord.ApplicationContext):
        self._is_paused = False
        context.voice_client.resume()

    def _check_index(self, index: int) -> bool:
        length = len(self.play_queue)
        if 0 <= index < length != 0:
            return True
        else:
            return False

    def skip(self, index: int) -> Song | None:
        vc = self._context.voice_client
        if hasattr(vc, 'is_paused') and vc.is_paused():
            raise CommonException('You have to `/resume` first to skip this song!')

        if not self._check_index(index):
            return None

        player_queue = self.play_queue
        self.play_queue = player_queue[index:]
        self._context.voice_client.stop()
        return player_queue[index]
        # and next loop should play next song automatically.

    def remove(self, index: int) -> Song | None:
        if not self._check_index(index):
            return None
        else:
            return self.play_queue.pop(index)

    def clear(self):
        self.play_queue = []
        self._current_playing = None


intents = discord.Intents.all()

bot = commands.Bot(intents=intents)
players: dict[int, Player | None] = {}


@bot.event
async def on_ready():
    print('on_ready zerotwo!')


@bot.slash_command(name='dance', description='Dance zerotwo.')
async def dance(context: discord.ApplicationContext):
    # For logging.
    print('Command: dance')
    print(f'who: {context.author.name}')
    await context.respond('https://tenor.com/bU2jx.gif')


@bot.slash_command(name='ping', description='Ping Pong 무한 Repeat!')
async def ping(context: discord.ApplicationContext):
    # For logging.
    print('Command: ping')
    print(f'who: {context.author.name}')

    await context.defer()

    embed = discord.Embed(title='Ping Pong 무한 Repeat! 🏓')

    if context.voice_client and hasattr(context.voice_client, 'latency') and hasattr(context.voice_client,
                                                                                     'average_latency'):
        content = f'`now: {round(context.voice_client.latency, 3)}`ms\n'
        content += f'`average: {round(context.voice_client.average_latency, 3)}`ms'
        embed.add_field(name=f'Websocket Latency', value=content)

        return await context.respond(embed=embed)
    else:
        embed.add_field(name='Error', value='I cannot get a valid latency :(')

        return await context.respond(embed=embed)


@bot.slash_command(name='play', aliases=['p', 'ㅔ'], description='Search keyword or Use URL.')
async def play(context: discord.ApplicationContext, url_or_keyword: str):
    # For logging.
    print('Command: play')
    print(f'who: {context.author.name}')
    print(f'message: {url_or_keyword}')

    await context.defer()
    if not context.author.voice:
        return await context.respond('You have to join VC first!')
    voice_channel = context.author.voice.channel

    if not context.voice_client:
        await voice_channel.connect()
    else:
        await context.voice_client.move_to(channel=voice_channel)

    # Play the song!
    try:
        p = players.get(context.guild_id)
        if not p and not hasattr(p, 'play_queue'):
            print(f'creating player in players!')
            players[context.guild_id] = Player(context)

        song = await players[context.guild_id].play(url_or_keyword, context.author.id)
        if not song:
            return await context.respond('cannot fetch song.')

        embed = discord.Embed()
        embed.add_field(name='Now playing 🎧', value=f"[{song.title}]({song.webpage_url}) - {song.duration}")
        embed.set_image(url=song.thumbnail_url)

        return await context.respond(embed=embed)
    except CommonException as e:
        return await context.respond(e.detail)


@bot.slash_command(name='pause', description='Pause the music')
async def pause(context: discord.ApplicationContext):
    # For logging.
    print('Command: pause')
    print(f'who: {context.author.name}')

    await context.defer()
    if not context.author.voice:
        return await context.respond('You have to join voice channel first!')
    players[context.guild_id].paused(context)
    return await context.respond('paused.')


@bot.slash_command(name='resume', aliases=['r', 'ㄱ'], description='Resume the music')
async def resume(context: discord.ApplicationContext):
    # For logging.
    print('Command: resume')
    print(f'who: {context.author.name}')

    await context.defer()
    author = context.author
    if not author.voice:
        return await context.respond('You have to join VC first!')
    players[context.guild_id].resumed(context)
    return await context.respond(f'resume')


@bot.slash_command(name='queue', description='Get songs in queue.')
async def queue(context: discord.ApplicationContext):
    # For logging.
    print('Command: queue')
    print(f'who: {context.author.name}')

    await context.defer()

    if not context.voice_client:
        return await context.respond('You have to play something!')

    try:
        p(f'players: {players}')
        current_song, play_queue = await players[context.guild_id].get_queue()
        is_playing = hasattr(context.voice_client, 'is_playing')

        p(f'current song: {current_song}')
        p(f'play queue: {play_queue}')
        p(f'has attr: {is_playing}')

        if not current_song and is_playing:
            return await context.respond('cannot fetch current song.')
        elif not current_song and not is_playing:
            return await context.respond('not playing now! But if you see this message, something is going to wrong!')

        source: MyAudio = context.voice_client.source
        if hasattr(source, 'played'):
            played = timedelta(seconds=source.played // 1000)
        else:
            return await context.respond('Player is having deadlock. Please report to kreimben.')

        embed = discord.Embed(title='Queue', description='')
        v = f"[{current_song.title}]({current_song.webpage_url}) <@{current_song.applicant}> "
        v += f"{played}/{current_song.duration}"
        if players[context.guild_id].is_repeating:
            v += f' (repeating)'
        embed.add_field(name='Now Playing 🎧', value=v)

        if not play_queue:
            embed.add_field(name='Queue', value='empty!')
        else:
            contents = []
            content = ''
            for i in range(len(play_queue)):
                contents.append(f"{i + 1}. **[{play_queue[i].title}]({play_queue[i].webpage_url}) ")
                contents.append(f"<@{play_queue[i].applicant}>** {play_queue[i].duration}\n")

            for i in range(len(contents)):
                if i + 1 < len(contents) and len(content) + len(contents[i + 1]) >= 1000:
                    break
                else:
                    content += contents[i]

            content += f'total: `{len(play_queue)} songs.`'
            embed.add_field(name='Queue', value=content)
        return await context.respond(embed=embed)
    except CommonException as e:
        return await context.respond(e.detail)
    except discord.errors.HTTPException as e:
        return await context.respond(e.text)


@bot.slash_command(name='repeat', description='지금 틀고 있는 이 노래만 반복됩니다.')
async def repeat_this_song(context: discord.ApplicationContext, value: bool):
    # For logging.
    print('Command: repeat_this_song')
    print(f'who: {context.author.name}')

    await context.defer()

    if not context.voice_client:
        return await context.respond('You have to play something!')

    try:
        current_song = players[context.guild_id].get_current_playing_song()

        result = players[context.guild_id].repeat_this_song(value)
        embed = discord.Embed()

        if result:
            embed.title = f'Repeat on **{current_song.title}**'
            embed.set_image(url=current_song.thumbnail_url)  # https only.
        else:
            embed.title = 'Turn off repeat.'

        return await context.respond(embed=embed)

    except CommonException as e:
        return await context.respond(e.detail)
    except discord.errors.HTTPException as e:
        return await context.respond(e.text)
    except AttributeError as e:
        return await context.respond('현재 나오고 있는 음악을 알 수 없어요!')


@bot.slash_command(name='skip', description='Skip away!')
async def skip(context: discord.ApplicationContext, index: int = 1):
    # For logging.
    print('Command: skip')
    print(f'who: {context.author.name}')

    await context.defer()

    queue_size = players[context.guild_id].get_queue_len()
    if queue_size + 1 < index:
        return await context.responsd(f'Your index({index}) is larger than queue\'s size({queue_size})!')

    try:
        skipped_song = players[context.guild_id].skip(index - 1)

        if skipped_song:
            return await context.respond(
                f'Skipped to `{skipped_song.title}`({skipped_song.duration}) <@{skipped_song.applicant}>!')
        else:
            return await context.respond('Nothing to skip!')
    except CommonException as e:
        return await context.respond(e.detail)
    except AttributeError as e:
        return await context.respond(e.detail)


@bot.slash_command(name='remove', aliases=['rm'], description='Remove some song on the queue.')
async def remove(context: discord.ApplicationContext, index: int = 1):
    # For logging.
    print('Command: remove')
    print(f'who: {context.author.name}')

    await context.defer()
    queue_size = players[context.guild_id].get_queue_len()
    if queue_size + 1 < index:
        return await context.responsd(f'Your index({index}) is larger than queue\'s size({queue_size})!')

    removed_song = players[context.guild_id].remove(index - 1)
    if removed_song:
        return await context.respond(
            f'`{removed_song.title}`({removed_song.duration}) <@{removed_song.applicant}> removed!')
    else:
        return await context.respond('Nothing to remove!')


@bot.slash_command(name='stop', aliases=['s'], description='Make zerotwo_bot stop.')
async def stop(context: discord.ApplicationContext):
    # For logging.
    print('Command: stop')
    print(f'who: {context.author.name}')

    await context.defer()
    if not context.author.voice:
        return await context.respond('You have to join VC first!')

    if not context.voice_client:
        return await context.respond('Already not joined voice channel.')

    await context.voice_client.disconnect(force=True)
    del players[context.guild_id]
    players[context.guild_id] = None
    return await context.respond("Okay, Bye.")


@bot.slash_command(name='force_quit', description='this require password')
async def force_quit(context: discord.ApplicationContext, password: str):
    # For logging.
    print('Command: force_quit')
    print(f'who: {context.author.name}')
    print(f'password: {password}')

    if password == os.getenv('ZEROTWO_FORCE_RESTART_PWD', ''):
        await context.respond('ZeroTwo_bot restarting')
        return exit(-1)
    else:
        return await context.respond('password is not matched.')


@bot.slash_command(name='version', description='Check new features!')
async def version(context: discord.ApplicationContext):
    # For logging.
    print('Command: version')
    print(f'who: {context.author.name}')

    embed = discord.Embed(
        title=f'Welcome to [ZeroTwo_bot](https://github.com/kreimben/ZeroTwo_bot) {os.getenv("ZEROTWO_VERSION")}!')

    content = '1. Rewritten in Python.\n'
    content += '2. Use multi-threading.\n'
    content += '3. Remove weather and pollution features.\n'
    content += '4. Remove sound filter features.\n'
    content += '5. Fix ping command.\n'
    content += '6. Add `force_quit` command to restart process.\n'
    content += '7. Add repeat mode.\n'

    embed.add_field(name='Features', value=content)

    embed.add_field(name='Thanks a lot!', value='[by kreimben](https://kreimben.com)')

    return await context.respond(embed=embed)


@bot.slash_command(name='help')
async def _help(context: discord.ApplicationContext):
    # For logging.
    print('Command: help')
    print(f'who: {context.author.name}')

    embed = discord.Embed(title='Help', description='to help you')

    content = 'aksidion@kreimben.com\n'
    content += '[kreimben.com](https://kreimben.com)\n'
    content += '[instagram](https://instagram.com/kreimben)\n'
    content += '[paypal](https://paypal.me/kreimben)\n'
    content += '[github](https://github.com/kreimben)\n'
    embed.add_field(name='Contact to Kreimben#7005', value=content)

    embed.add_field(name='Report to', value='[github](https://github.com/kreimben/ZeroTwo_bot/issues)')

    return await context.respond(embed=embed)


bot.run(os.getenv('DISCORD_TOKEN'))
