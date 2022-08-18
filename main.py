import os
from datetime import datetime

import discord
from dotenv import load_dotenv

load_dotenv()

bot = discord.Bot()


@bot.event
async def on_ready():
    print('on_ready zerotwo!')


@bot.event
async def on_message(message):
    print(f'on_message: {message}')


@bot.slash_command(name='dance', description='Dance zerotwo.')
async def dance(ctx):
    await ctx.respond('https://tenor.com/9YMQ.gif')


@bot.slash_command(name='ping', description='Ping Pong 무한 Repeat!')
async def ping(context: discord.ApplicationContext):
    await context.defer()

    embed = discord.Embed(title='Ping Pong 무한 Repeat! 🏓', description='')
    embed.add_field(name=f'Websocket Latency', value=f' `{round(bot.latency, 1)}`ms')
    embed.set_footer(text=datetime.now())

    await context.respond(embed=embed)


play_group = bot.create_group('play', 'play music!')


@play_group.command()
async def from_(context: discord.ApplicationContext, url: str):
    author = context.author

    if not author.voice:
        return await context.respond('You have to join VC first!')
    voice_channel = author.voice.channel

    vc: discord.VoiceClient = await voice_channel.connect()

    FFMPEG_OPTIONS = {'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5', 'options': '-vn'}
    source = discord.FFmpegAudio(url, **FFMPEG_OPTIONS)
    vc.play(source)


bot.run(os.getenv('DISCORD_TOKEN'))
