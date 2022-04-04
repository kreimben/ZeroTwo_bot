const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set volume')
        .addIntegerOption((option) => {
            option.setName('volume').setRequired(true)
        })
    ,
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guilds)
        if (!playQueue.connection) await playQueue.connect(client.member.voice.channel)

        if (!playQueue) await interaction.editReply('You have to play anything!\nQueue is empty.')

        let volume = interaction.options.getSubcommand('volume')
        playQueue.setVolume(volume)
    }
}