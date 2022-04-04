const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('after10sec')
        .setDescription('Skip 10 secs.'),
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guilds)
        if (!playQueue.connection) await playQueue.connect(client.member.voice.channel)

        let {end} = playQueue.getPlayerTimestamp()

        console.log(`end time: ${end}`)

        let current = playQueue.streamTime()
        playQueue.streamTime(current + 10)
    }
}