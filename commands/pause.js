const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the song'),
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guilds)
        if (!playQueue.connection) await playQueue.connect(client.member.voice.channel)

        if (!playQueue) await interaction.editReply('You have to play anything!\nQueue is empty.')

        playQueue.setPaused(true)
    }
}