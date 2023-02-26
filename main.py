import os

import discord
from dotenv import load_dotenv

from Helper import Player, players
from bot import bot
from buttons import PlayerView

load_dotenv()


def p(a: any):
    if os.getenv('ZEROTWO_VERSION') == 'develop':
        print(a)


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


@bot.slash_command(name='zerotwo',
                   description='Search keyword or Use URL. (To add more songs in queue, Just use this command)')
async def zerotwo(context: discord.ApplicationContext, url_or_keyword: str):
    # For logging.
    print('Command: play')
    print(f'who: {context.author.name}')
    print(f'message: {url_or_keyword}')

    await context.defer()

    if not context.author.voice:
        return await context.respond(content='You have to join VC first!')
    voice_channel = context.author.voice.channel

    if not context.voice_client:
        await voice_channel.connect()
    else:
        await context.voice_client.move_to(channel=voice_channel)

    # Play the song!
    try:
        player = players.get(context.guild_id)
        if not player and not hasattr(player, 'play_queue'):
            p(f'creating player in players!')
            player = Player(context)
            players[context.guild_id] = player

        view = PlayerView(context, player)

        # Fetch first song of added to queue.
        song = await players[context.guild_id].play(url_or_keyword, context.author.id)
        if not song:
            return await context.respond(content='cannot fetch song.')

        embed = discord.Embed()
        embed.add_field(name='Added to queue 🎧', value=f"[{song.title}]({song.webpage_url}) - {song.duration}")
        embed.set_image(url=song.thumbnail_url)

        return await context.respond(embed=embed, view=view)
    except Exception as e:
        await context.voice_client.disconnect(force=True)
        if players.get(context.guild_id):
            del players[context.guild_id]
        return await context.respond(content=str(e))


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
    content += '8. Support playlist.\n'

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


try:
    bot.run(os.getenv('DISCORD_TOKEN'))
except Exception as e:
    print(str(e))
