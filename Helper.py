import asyncio
import os
from copy import copy
from datetime import timedelta
from urllib.parse import urlparse

import discord
import yt_dlp

from bot import bot


def p(a: any):
    if os.getenv('ZEROTWO_VERSION') == 'develop':
        print(a)


class NoSongException(Exception):
    ...


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
        p(f'{source=}')
        if source:
            return source
        else:
            raise CommonException("Source is not ready.")
    except Exception as e:
        print(e)


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
        self.previous_song: Song | None = None

    def _add_song(self, arg: str, applicant: any) -> [Song]:
        """
        Add song to `self.queue`.
        """
        ydl_options = {
            'format': 'bestaudio/best',
            'restrictfilenames': True,
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
        with yt_dlp.YoutubeDL(ydl_options) as ydl:
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

            results = []
            if 'entries' in info:
                for entry in info['entries']:
                    results.append(Song(webpage_url=entry['webpage_url'],
                                        audio_url=entry['url'],
                                        title=entry['title'],
                                        thumbnail_url=entry['thumbnail'],
                                        applicant=applicant,
                                        duration=entry['duration']))
            else:
                results.append(Song(webpage_url=info['webpage_url'],
                                    audio_url=info['url'],
                                    title=info['title'],
                                    thumbnail_url=info['thumbnail'],
                                    applicant=applicant,
                                    duration=info['duration']))
            self.play_queue += results
            p(f'add_song {results=}')
            return results

    async def _play(self, after) -> None:
        """
        Play next song from `self.queue`.
        """
        # if self.play_queue:
        p(f'_play')
        if not self.is_repeating:
            next_song: Song = self.play_queue.pop(0) if self.play_queue else None
        else:
            p(f'repeating mode is on and i will play current song again.')
            next_song: Song = self.previous_song
        p(f'{next_song=}')

        source = await _get_source(next_song)
        p(f'{source=}')

        if self._context.voice_client and hasattr(self._context.voice_client, 'play'):
            self._context.voice_client.play(source, after=after)
            p('vc play')

            if self._context.voice_client.is_playing():
                p('is_playing')
                self._current_playing = next_song
                self.previous_song = self._current_playing
            else:
                raise CommonException('vc is not playing now.')
        else:
            raise CommonException(f'voice_client is not ready\n'
                                  f'vc: {self._context.voice_client}\n'
                                  f'play: {hasattr(self._context.voice_client, "play")}')

    async def _loop(self) -> None:
        while True:
            p('in the _loop')
            p('before clear event')
            self._event.clear()

            if not self._context.voice_client.is_playing() and not self._is_paused:
                p(f'not playing and not paused')
                if self.play_queue or self.is_repeating:
                    p(f'not play_queue')
                    await self._play(self._after_play)
                elif not self.is_repeating:
                    p(f'condition to disconnect')
                    await self._context.voice_client.disconnect(force=True)
                    if players.get(self._context.guild_id):
                        del players[self._context.guild_id]

            p('before wait event')
            await self._event.wait()

    def _after_play(self, error=None):
        if error:
            print(str(error))
            self._task.cancel(str(error))
            raise CommonException(str(error))

        self._event.set()

    async def play(self, arg: str, applicant: any) -> Song:
        # Add song to queue
        song: [Song] = self._add_song(arg, applicant)
        return song[0]

    async def get_queue(self) -> (Song | None, [Song]):
        return self._current_playing, [song for song in self.play_queue]

    async def get_queue_len(self) -> int:
        return len(self.play_queue)

    async def get_current_playing_song(self) -> Song:
        return self._current_playing

    async def repeat_this_song(self, is_repeating: bool | None = None) -> bool:
        if is_repeating:
            self.is_repeating = is_repeating
        else:
            self.is_repeating = not self.is_repeating
        return self.is_repeating

    def paused(self, context: discord.ApplicationContext):
        self._is_paused = True
        context.voice_client.pause()

    def resumed(self, context: discord.ApplicationContext):
        self._is_paused = False
        context.voice_client.resume()

    @property
    def is_paused(self):
        return self._is_paused

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
        self._current_playing = player_queue[index]
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


players: dict[int, Player] = {}
