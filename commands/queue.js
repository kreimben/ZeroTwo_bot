const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Let me know what will be playing?"),
    run: async ({ client, interaction }) => {
        let embed = new MessageEmbed()

        let playQueue = await client.player.getQueue(interaction.guild)
        if (!playQueue.connection) await playQueue.connect(client.member.voice.channel)

        embed.setFields(
            ['Now playing', `${playQueue.nowPlaying()}`, false],
            ['', `${playQueue.getPlayerTimestamp()}`, false],
            /*['', `${playQueue.createProgressBar({
                
            })}`, false],*/
            ['Queue', `${playQueue.tracks}`]
        )
            .setTimestamp(Date.now())
    }
}