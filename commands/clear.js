const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear all of songs in play playQueue.'),
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }

        const playQueue = client.player.getQueue(interaction.guildId)
        if (!playQueue) return interaction.editReply('ZeroTwo_bot is not playing anything.')

        playQueue.destroy()
        await interaction.editReply('Bye!')
    }
}