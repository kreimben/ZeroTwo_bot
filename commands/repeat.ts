import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Set repeat in current playlist.')
        .addBooleanOption((option) =>
            option.setName('on').setDescription('on or off repeat').setRequired(true)
        )
    ,
    run: async ({client, interaction}) => {
        const playQueue = await client.player.createQueue(interaction.guild)

        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command")
            }
            if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

            let subcommand = interaction.options.getBoolean('on')
            let status = (subcommand === true) ? 2 : 0
            playQueue.setRepeatMode(status)

            let embed = new MessageEmbed()

            embed
                .setTitle('Repeat 🔁 is')
                .setDescription(`**${playQueue.repeatMode === 2 ? 'On' : 'Off'}**`)

            await interaction.editReply({
                embeds: [embed]
            })
        } catch (e) {
            console.log(`error on repeat: ${e}`)
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Repeat Command.\nPlease Report to kreimben.`)
            process.exit(-1)
        }
    }
}