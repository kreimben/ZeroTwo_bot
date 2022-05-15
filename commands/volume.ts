import {SlashCommandBuilder} from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set volume')
        .addNumberOption((option) =>
            option
                .setName('volume')
                .setDescription('You can set the volume')
                .setMinValue(0).setMaxValue(100).setRequired(true)
        )
    ,
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guildId)

        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command")
            }
            if (!playQueue) await interaction.editReply('You have to play anything!\nQueue is empty.')

            let volume = interaction.options.getNumber('volume')
            playQueue.setVolume(volume)

            await interaction.editReply(`Set volume to ${volume}`)
        } catch (e) {
            console.log(`error on volume: ${e}`)
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Volume Command.\nPlease Report to kreimben.`)
            process.exit(-1)
        }
    }
}