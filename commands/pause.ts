import {SlashCommandBuilder} from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the song'),
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guildId)

        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command")
            }

            if (playQueue) {
                playQueue.setPaused(true)
                await interaction.editReply("Music has been paused! Use `/continue` to resume the music")
            } else {
                await interaction.editReply("**Nothing to pause!**")
            }
        } catch (e) {
            console.log(`error on pause: ${e}`)
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Pause Command.\nPlease Report to kreimben.`)
            process.exit(-1)
        }
    }
}