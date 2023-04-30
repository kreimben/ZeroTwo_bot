from datetime import timedelta

import discord.ui
from discord import Interaction
from discord.ui import Item

from discord_bot.Helper import Player, players, MyAudio, Song


class PlayerView(discord.ui.View):

    def __init__(self, context, player: Player):
        super().__init__(timeout=None, disable_on_timeout=True)
        self.add_item(
            PauseResumeButton(emoji='⏯️', style=discord.ButtonStyle.primary, context=context, player=player))
        self.add_item(RepeatButton(emoji='🔂', style=discord.ButtonStyle.primary, context=context, player=player))
        self.add_item(QueueButton(emoji='🛤️', style=discord.ButtonStyle.primary, context=context, player=player))
        self.add_item(SkipButton(emoji='⏭️', style=discord.ButtonStyle.primary, context=context, player=player))
        self.add_item(RemoveButton(emoji='❌', style=discord.ButtonStyle.primary, context=context, player=player))
        self.add_item(
            StopButton(emoji='🛑', style=discord.ButtonStyle.red, context=context, player=player, stop=self.disable)
        )

    async def on_error(
            self, error: Exception, item: Item, interaction: Interaction
    ) -> None:
        print('on_error on PlayView')
        print(f'{error}')
        print(f'{item}')
        interaction.response.send_message(f'Error Occurred! {error}')

    def disable(self):
        self.disable_all_items()
        self.stop()


class PauseResumeButton(discord.ui.Button):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        super().__init__(**kwargs)

    async def callback(self, interaction: Interaction):
        if self.player.is_paused:
            # Make player resume
            self.player.resumed(self.context)
            await interaction.response.send_message(f"<@!{interaction.user.id}> resumed.")
        else:
            # Make player pause
            self.player.paused(self.context)
            await interaction.response.send_message(f'<@!{interaction.user.id}> paused.')


class StopButton(discord.ui.Button):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        self.stop = kwargs.pop('stop')

        super().__init__(**kwargs)

    async def callback(self, interaction: Interaction):
        await self.context.voice_client.disconnect(force=True)
        del players[self.context.guild_id]
        await interaction.response.send_message('Okay, Bye.')
        self.stop()


class RepeatButton(discord.ui.Button):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        self.is_repeating = False

        super().__init__(**kwargs)

    async def callback(self, interaction: Interaction):
        self.is_repeating = await self.player.repeat_this_song()
        if self.is_repeating:
            await interaction.response.send_message(f'<@!{interaction.user.id}> Repeat: Turn On')
        else:
            await interaction.response.send_message(f'<@!{interaction.user.id}> Repeat: Turned Off')


class QueueButton(discord.ui.Button):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        super().__init__(**kwargs)

    async def callback(self, interaction: Interaction):
        try:
            current_song, play_queue = await players[self.context.guild_id].get_queue()
            is_playing = hasattr(self.context.voice_client, 'is_playing')

            if not current_song and is_playing:
                return await self.context.respond('cannot fetch current song.')
            elif not current_song and not is_playing:
                return await self.context.respond(
                    'not playing now! But if you see this message, something is going to wrong!')

            source: MyAudio = self.context.voice_client.source
            if hasattr(source, 'played'):
                played = timedelta(seconds=source.played // 1000)
            else:
                return await self.context.respond('Player is having deadlock. Please report to kreimben.')

            embed = discord.Embed(title='Queue', description='')
            v = f"[{current_song.title}]({current_song.webpage_url}) <@{current_song.applicant}> "
            v += f"{played}/{current_song.duration}"
            if players[self.context.guild_id].is_repeating:
                v += f' ***(repeating)***'
            embed.add_field(name='Now Playing 🎧', value=v)

            if not play_queue:
                embed.add_field(name='Queue', value='empty!')
            else:
                contents = []
                content = ''
                for i in range(min(len(play_queue), 6)):
                    contents.append(f"{i + 1}. **[{play_queue[i].title}]({play_queue[i].webpage_url}) ")
                    contents.append(f"<@{play_queue[i].applicant}>** {play_queue[i].duration}\n")

                for i in range(len(contents)):
                    if i + 1 < len(contents) and len(content) + len(contents[i + 1]) >= 1000:
                        break
                    else:
                        content += contents[i]

                content += f'total: `{len(play_queue)} songs.`'
                embed.add_field(name='Queue', value=content)
        except Exception as e:
            return interaction.response.send_message(f'{e}')

        await interaction.response.send_message(embed=embed, ephemeral=True)


class SkipButton(discord.ui.Button):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        super().__init__(**kwargs)

    async def callback(self, interaction: Interaction):
        modal = SkipModal(title='Skip', context=self.context, player=self.player)
        await interaction.response.send_modal(modal)


class SkipModal(discord.ui.Modal):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        super().__init__(**kwargs)
        self.add_item(discord.ui.InputText(label='skip index', placeholder='Please input ONLY number', value='1'))

    async def callback(self, interaction: Interaction):
        skip_index = int(self.children[0].value) - 1
        max_length = await self.player.get_queue_len()
        if max_length > 0:
            if skip_index >= max_length:
                skip_index = max_length - 1
            self.player.skip(skip_index)
            song: Song = await self.player.get_current_playing_song()

            embed = discord.Embed()
            embed.title = 'Skipped to'
            embed.add_field(name='Next Playing 🎵', value=f'[{song.title}]({song.webpage_url}) by <@{song.applicant}> ')
            embed.set_thumbnail(url=song.thumbnail_url)

            await interaction.response.send_message(embed=embed)
        else:
            await interaction.response.send_message('There are no songs to be skipped!', ephemeral=True)


class RemoveButton(discord.ui.Button):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        super().__init__(**kwargs)

    async def callback(self, interaction: Interaction):
        modal = RemoveModal(title='Remove with index', context=self.context, player=self.player)
        await interaction.response.send_modal(modal)


class RemoveModal(discord.ui.Modal):
    def __init__(self, **kwargs):
        self.context = kwargs.pop('context')
        self.player = kwargs.pop('player')
        super().__init__(**kwargs)
        self.add_item(discord.ui.InputText(label='Remove Index', placeholder='Please input ONLY number', value='1'))

    async def callback(self, interaction: Interaction):
        remove_index = int(self.children[0].value) - 1
        max_length = await self.player.get_queue_len()
        if remove_index >= max_length:
            remove_index = max_length - 1
        removed_song: Song = self.player.remove(remove_index)

        if removed_song:
            await interaction.response.send_message(
                f'[{removed_song.title}]({removed_song.webpage_url}) by <@{removed_song.applicant}> removed!'
            )
        else:
            await interaction.response.send_message('There are no songs to be removed!', ephemeral=True)
