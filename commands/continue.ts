import {SlashCommandBuilder} from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('continue')
        .setDescription('Continue play the song'),
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guildId)

        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command")
            }

            if (playQueue) {
                playQueue.setPaused(false)
                let current_string = `**${playQueue.current}**`
                await interaction.editReply(`Continue play the song!\n${current_string}`)
            } else {
                await interaction.editReply("No song to play continuously.")
            }
        } catch (e) {
            console.log(`error on continue: ${e}`)

            playQueue.clear()
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Continue Command.\nPlease Report to kreimben.`)
            // process.exit(-1)
        }
    }
}