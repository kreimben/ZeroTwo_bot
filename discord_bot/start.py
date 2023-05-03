import asyncio
import os
from threading import Thread

import discord

from discord_bot.Helper import contexts
from discord_bot.bot import bot


async def m():
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
        await context.respond('https://tenor.com/b0dImIdP0BN.gif')

    @bot.slash_command(name='hey', description='Respond with webpage. 제로투를 실행 시킬 수 있는 웹페이지를 보여줍니다.')
    async def hey(context: discord.ApplicationContext):
        contexts[f'{context.guild_id}-{context.me.id}'] = context
        await context.respond(
            os.getenv('FRONTEND_URL') +
            '/connect/?guild_id=' + str(context.guild_id) +
            '&user_id=' + str(context.me.id)
            , ephemeral=True)

    # @bot.slash_command(name='zerotwo',
    #                    description='Search keyword or Use URL. (To add more songs in queue, Just use this command)')
    # async def zerotwo(context: discord.ApplicationContext, url_or_keyword: str):
    #     # For logging.
    #     print('Command: play')
    #     print(f'who: {context.author.name}')
    #     print(f'message: {url_or_keyword}')
    #
    #     await context.defer()
    #
    #     if not context.author.voice:
    #         return await context.respond(content='You have to join VC first!')
    #     voice_channel = context.author.voice.channel
    #
    #     if not context.voice_client:
    #         await voice_channel.connect()
    #     else:
    #         await context.voice_client.move_to(channel=voice_channel)
    #
    #     # Play the song!
    #     try:
    #         player = players.get(context.guild_id)
    #         if not player and not hasattr(player, 'play_queue'):
    #             p(f'creating player in players!')
    #             player = Player(context)
    #             players[context.guild_id] = player
    #
    #         view = PlayerView(context, player)
    #
    #         # Fetch first song of added to queue.
    #         song = await players[context.guild_id].play(url_or_keyword, context.author.id)
    #         if not song:
    #             return await context.respond(content='cannot fetch song.')
    #
    #         embed = discord.Embed()
    #         embed.add_field(name='Added to queue 🎧', value=f"[{song.title}]({song.webpage_url}) - {song.duration}")
    #         embed.set_image(url=song.thumbnail_url)
    #
    #         return await context.respond(embed=embed, view=view)
    #     except Exception as e:
    #         await context.voice_client.disconnect(force=True)
    #         if players.get(context.guild_id):
    #             del players[context.guild_id]
    #         return await context.respond(content=str(e))

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
        await bot.start(os.getenv('DISCORD_TOKEN'))
    except Exception as e:
        print(str(e))


def run_bot():
    loop = asyncio.get_event_loop()
    loop.create_task(m())
    bot_thread = Thread(target=loop.run_forever)
    bot_thread.start()
