const {SlashCommandBuilder} = require("@discordjs/builders");

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
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        let playQueue = client.player.getQueue(interaction.guildId)

        if (!playQueue) await interaction.editReply('You have to play anything!\nQueue is empty.')

        let volume = interaction.options.getNumber('volume')
        playQueue.setVolume(volume)

        await interaction.editReply(`Set volume to ${volume}`)
    }
}