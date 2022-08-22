import asyncio
import os
import threading
from datetime import datetime, timedelta

import discord
import youtube_dl
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()


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


class Player:
    __instance = None

    def __init__(self):
        self._queue: dict = {}
        self._instance = None
        self._is_loop_running = False
        self._current_playing: dict = {}
        self._is_paused = False
        self._lock = threading.Lock()

    @classmethod
    def __getInstance(cls):
        return cls.__instance

    @classmethod
    def instance(cls, *args, **kargs):
        cls.__instance = cls(*args, **kargs)
        cls.instance = cls.__getInstance
        return cls.__instance

    def _add_song(self, context: discord.ApplicationContext, arg: str) -> Song:
        """
        Add song to `self.queue`.
        """
        ydl_options = {
            'format': 'bestaudio/best',
            'restrictfilenames': True,
            'noplaylist': True,
            'nocheckcertificate': True,
            'ignoreerrors': False,
            'logtostderr': False,
            'quiet': True,
            'no_warnings': True,
            'default_search': 'auto',
            'forceduration': True,
        }
        with youtube_dl.YoutubeDL(ydl_options) as ydl:
            info = ydl.extract_info(f'ytsearch:{arg}', download=False)
            # print(f'info: {ujson.dumps(info["entries"][0], indent=4)}')
            song = Song(webpage_url=info['entries'][0]['webpage_url'],
                        audio_url=info['entries'][0]['url'],
                        title=info['entries'][0]['title'],
                        thumbnail_url=info['entries'][0]['thumbnail'],
                        applicant=context.author.id,
                        duration=info["entries"][0]['duration'])
            self._queue[context.guild_id].append(song)
            # print(f'queue after append song: {[song.title for song in self._queue[context.guild_id]]}', end=' ')
            # print(f'queue length: {len(self._queue)}')
            return song

    async def _get_source(self, song: Song) -> discord.FFmpegOpusAudio:
        ffmpeg_options = {'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5',
                          'options': '-vn'}
        # await discord.FFmpegOpusAudio.from_probe(song.url, **ffmpeg_options)
        source = await MyAudio.from_probe(song.audio_url, **ffmpeg_options)
        if source:
            return source
        else:
            raise CommonException("Source is not ready.")

    async def _play(self, context: discord.ApplicationContext) -> None:
        """
        Play next song from `self.queue`.
        """
        if self._queue:
            next_song: Song = self._queue[context.guild_id].pop(0)
            source = await self._get_source(next_song)
            if context.voice_client and hasattr(context.voice_client, 'play'):
                context.voice_client.play(source)
                self._current_playing[context.guild_id] = next_song
            else:
                raise CommonException(f'voice_client is not ready\n'
                                      f'vc: {context.voice_client}\n'
                                      f'play: {hasattr(context.voice_client, "play")}')

    async def _loop(self, context: discord.ApplicationContext) -> None:
        # print(f'enter loop!')

        if context.voice_client and context.voice_client.is_playing():
            print('currently playing in voice channel.')
            return

        # print('before while True')
        while True:
            if not context.voice_client:
                raise CommonException('voice_client is not ready')
            elif not hasattr(context.voice_client, 'is_playing'):
                raise CommonException('is_playing is not ready')

            # print(f'.', end='')
            self._lock.acquire()
            # print(f'is_playing: {context.voice_client.is_playing()} | _is_paused: {self._is_paused}')
            if not context.voice_client.is_playing() and not self._is_paused:
                self._lock.release()
                if self._queue[context.guild_id]:
                    await self._play(context)
            else:  # Because release timing is not fitted to `self._play(context)`
                self._lock.release()

            if not context.voice_client.is_playing() and not self._queue:
                print(f'not playing and queue is even empty.')
                break

        print('end loop!')

    async def play(self, context: discord.ApplicationContext, arg: str):
        # First, look at queue whether it's empty.
        # print(f'queue: {self._queue}')
        if self._queue.get(context.guild_id) == None:
            self._queue[context.guild_id] = list()

        # Add song to queue
        song = self._add_song(context, arg)
        threading.Thread(target=asyncio.run, args=[self._loop(context)]).start()
        # await self._loop(context)
        return song

    async def queue(self, context: discord.ApplicationContext) -> (Song, Song):
        return self._current_playing[context.guild_id], [song for song in self._queue[context.guild_id]]

    def paused(self, context: discord.ApplicationContext):
        self._is_paused = True
        context.voice_client.pause()

    def resumed(self, context: discord.ApplicationContext):
        self._is_paused = False
        context.voice_client.resume()
        threading.Thread(target=asyncio.run, args=[self._loop(context)]).start()

    def _check_index(self, context: discord.ApplicationContext, index: int) -> bool:
        length = len(self._queue[context.guild_id])
        if 0 <= index and index < length and length != 0:
            return True
        else:
            return False

    def skip(self, context: discord.ApplicationContext, index: int) -> Song | None:
        if not self._check_index(context, index):
            return None

        queue = self._queue[context.guild_id]
        # print(f'row queue: {queue}')
        # print(f'new queue: {queue[index:]}')
        self._queue[context.guild_id] = queue[index:]
        context.voice_client.stop()
        return queue[index]
        # and next loop should play next song automatically.

    def remove(self, context: discord.ApplicationContext, index: int) -> Song | None:
        if not self._check_index(context, index):
            return None
        else:
            return self._queue[context.guild_id].pop(index)

    def clear(self, context: discord.ApplicationContext):
        # print(f'before: {self._queue[context.guild_id]}')
        # print(f'before: {self._current_playing[context.guild_id]}')
        self._queue[context.guild_id] = []
        self._current_playing[context.guild_id] = None
        # print(f'after: {self._queue[context.guild_id]}')
        # print(f'after: {self._current_playing[context.guild_id]}')


bot = commands.Bot()


@bot.event
async def on_ready():
    print('on_ready zerotwo!')


# @bot.event
# async def on_message(message):
#     print(f'on_message: {message}')


@bot.slash_command(name='dance', description='Dance zerotwo.')
async def dance(ctx):
    await ctx.respond('https://tenor.com/bU2jx.gif')


@bot.slash_command(name='ping', description='Ping Pong 무한 Repeat!')
async def ping(context: discord.ApplicationContext):
    await context.defer()

    embed = discord.Embed(title='Ping Pong 무한 Repeat! 🏓', description='')
    embed.add_field(name=f'Websocket Latency', value=f' `{round(bot.latency, 1)}`ms')
    embed.set_footer(text=datetime.now())

    await context.respond(embed=embed)


@bot.slash_command(name='play', aliases=['p', 'ㅔ'], description='Search keyword or Use URL.')
async def play(context: discord.ApplicationContext, url_or_keyword: str):
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
        song = await Player.instance().play(context, url_or_keyword)
        if not song:
            return await context.respond('cannot fetch song.')

        embed = discord.Embed()
        embed.add_field(name='Now playing 🎧', value=f"[{song.title}]({song.webpage_url}) - {song.duration}")
        embed.set_image(url=song.thumbnail_url)
        embed.set_footer(text=datetime.now())
        return await context.respond(embed=embed)
    except CommonException as e:
        return await context.respond(e.detail)


@bot.slash_command(name='pause', description='Pause the music')
async def pause(context: discord.ApplicationContext):
    await context.defer()
    if not context.author.voice:
        return await context.respond('You have to join VC first!')
    Player.instance().paused(context)
    return await context.respond('paused.')


@bot.slash_command(name='resume', aliases=['r', 'ㄱ'], description='Resume the music')
async def resume(context: discord.ApplicationContext):
    await context.defer()
    author = context.author
    if not author.voice:
        return await context.respond('You have to join VC first!')
    Player.instance().resumed(context)
    return await context.respond(f'resume')


@bot.slash_command(name='queue', description='Get songs in queue.')
async def queue(context: discord.ApplicationContext):
    await context.defer()

    if not context.voice_client:
        return await context.respond('You have to play something!.')

    try:
        current_song, queue = await Player.instance().queue(context)
        if not current_song:
            return await context.respond('cannot fetch current song.')

        source: MyAudio = context.voice_client.source
        played = timedelta(seconds=source.played // 1000) if hasattr(source, 'played') else 0

        embed = discord.Embed(title='Queue', description='')
        v = f"[{current_song.title}]({current_song.webpage_url}) <@{current_song.applicant}> {played}/{current_song.duration}"
        embed.add_field(name='Now Playing 🎧', value=v)

        if not queue:
            embed.add_field(name='Queue', value='empty!')
        else:
            content = ''
            for i in range(len(queue)):
                content += f"{i + 1}. **[{queue[i].title}]({queue[i].webpage_url}) <@{queue[i].applicant}>** {queue[i].duration}\n"
            embed.add_field(name='Queue', value=content)
        return await context.respond(embed=embed)
    except CommonException as e:
        return await context.respond(e.detail)


@bot.slash_command(name='skip', description='Skip away!')
async def skip(context: discord.ApplicationContext, index: int = 1):
    await context.defer()
    skipped_song = Player.instance().skip(context, index - 1)
    if skipped_song:
        return await context.respond(
            f'Skipped to `{skipped_song.title}`({skipped_song.duration}) <@{skipped_song.applicant}>!')
    else:
        return await context.respond('Nothing to skip!')


@bot.slash_command(name='remove', description='Remove some song on the queue.')
async def remove(context: discord.ApplicationContext, index: int = 1):
    await context.defer()
    removed_song = Player.instance().remove(context, index - 1)
    if removed_song:
        return await context.respond(
            f'`{removed_song.title}`({removed_song.duration}) <@{removed_song.applicant}> removed!')
    else:
        return await context.respond('Nothing to remove!')


@bot.slash_command(name='stop', aliases=['s'], description='Make zerotwo_bot stop.')
async def stop(context: discord.ApplicationContext):
    await context.defer()
    if not context.author.voice:
        return await context.respond('You have to join VC first!')

    if not context.voice_client:
        return await context.respond('Already not joined voice channel.')

    await context.voice_client.disconnect(force=True)
    Player.instance().clear(context)
    return await context.respond("Okay, Bye.")


@bot.slash_command(name='force_quit', description='this require password')
async def force_quit(context: discord.ApplicationContext, password: str):
    if password == os.getenv('ZEROTWO_FORCE_RESTART_PWD', ''):
        await context.respond('ZeroTwo_bot restarting')
        return exit(-1)
    else:
        return await context.respond('password is not matched.')


@bot.slash_command(name='version', description='Check new features!')
async def version(context: discord.ApplicationContext):
    embed = discord.Embed(
        title=f'Welcome to [ZeroTwo_bot](https://github.com/kreimben/ZeroTwo_bot) {os.getenv("ZEROTWO_VERSION")}!')

    content = '1. Rewritten in Python.\n'
    content += '2. Use multi-threading.\n'
    content += '3. Remove weather and pollution features.\n'
    content += '4. Remove sound filter features.\n'

    embed.add_field(name='Features', value=content)

    embed.add_field(name='Thanks a lot!', value='[by kreimben](https://kreimben.com)')

    embed.set_footer(text=datetime.now())

    return await context.respond(embed=embed)


@bot.slash_command(name='help')
async def help(context: discord.ApplicationContext):
    embed = discord.Embed(title='Help', description='to help you')

    content = 'aksidion@kreimben.com\n'
    content += '[kreimben.com](https://kreimben.com)\n'
    content += '[instagram](https://instagram.com/kreimben)\n'
    content += '[paypal](https://paypal.me/kreimben)\n'
    content += '[github](https://github.com/kreimben)\n'
    embed.add_field(name='Contact to Kreimben#7005', value=content)

    embed.add_field(name='Report to', value='[github](https://github.com/kreimben/ZeroTwo_bot/issues)')

    embed.set_footer(text=datetime.now())

    return await context.respond(embed=embed)


bot.run(os.getenv('DISCORD_TOKEN'))
