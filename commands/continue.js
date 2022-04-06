const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('continue')
        .setDescription('Continue play the song'),
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        let playQueue = client.player.getQueue(interaction.guildId)

        if (playQueue) {
            playQueue.setPaused(false)
            let current_string = `**${playQueue.current}**`
            await interaction.editReply(`Continue play the song!\n${current_string}`)
        } else {
            await interaction.editReply("No song to play continuously.")
        }
    }
}