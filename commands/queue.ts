import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Let me know what will be playing?"),
    run: async ({client, interaction}) => {
        let playQueue = await client.player.getQueue(interaction.guild)

        try {
            if (!playQueue) return interaction.editReply('Queue is empty.')

            const queueString = playQueue.tracks
                .map((song, i) => {
                    return `**${i + 1}.** [${song.title}](${song.url}) -- <@${song.requestedBy.id}> \`[${song.duration}]\``
                })
                .join("\n")

            const currentSong = playQueue.current

            const {current} = playQueue.getPlayerTimestamp()

            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`**Currently Playing**\n` +
                            (currentSong ? `\`[${current}/${currentSong.duration}]\` [${currentSong.title}](${currentSong.url}) -- <@${currentSong.requestedBy.id}>` : "None") +

                            `\n\n` +
                            `**Queue**\n` +
                            `${queueString}`
                        )
                        .setThumbnail(currentSong.thumbnail)
                ]
            })
        } catch (e) {
            console.log(`error on queue: ${e}`)

            playQueue.clear()
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Queue Command.\nPlease Report to kreimben.`)
            // process.exit(-1)
        }
    }
}