const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the bot and leave the channel.'),
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue.")

        queue.destroy()
        await interaction.editReply('Bye!')
    }
}