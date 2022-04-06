const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the song'),
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        let playQueue = client.player.getQueue(interaction.guildId)

        if (playQueue) {
            playQueue.setPaused(true)
            await interaction.editReply("Music has been paused! Use `/continue` to resume the music")
        } else {
            await interaction.editReply("**Nothing to pause!**")
        }
    }
}