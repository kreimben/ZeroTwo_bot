import {SlashCommandBuilder} from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the bot and leave the channel.'),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command")
            }
            if (!queue) return await interaction.editReply("There are no songs in the queue.")

            queue.destroy()
            await interaction.editReply('Bye!')
        } catch (e) {
            console.log(`error on stop: ${e}`)
            queue.destroy()
            await interaction.editReply(`Error Occurs in Stop Command.\nPlease Report to kreimben.`)
            process.exit(-1)
        }
    }
}