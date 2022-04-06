const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Let me know what will be playing?"),
    run: async ({client, interaction}) => {
        let playQueue = await client.player.getQueue(interaction.guild)
        if (!playQueue) return interaction.editReply('Queue is empty.')

        const queueString = playQueue.tracks
            .map((song, i) => {
                return `**${i + 1}.** ${song.title} -- <@${song.requestedBy.id}> \`[${song.duration}]\``
            })
            .join("\n")

        const currentSong = playQueue.current

        const {current} = playQueue.getPlayerTimestamp()

        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`**Currently Playing**\n` +
                        (currentSong ? `\`[${current}/${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n` +
                        `**Queue**\n` +
                        `${queueString}`
                    )
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}