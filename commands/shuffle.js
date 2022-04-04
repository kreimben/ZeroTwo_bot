const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Set shuffle in current playlist.'),
    run: async ({client, interaction}) => {

        let playQueue = client.player.getQueue(interaction.guilds)
        if (!playQueue.connection) await playQueue.connect(client.member.voice.channel)

        // if (!playQueue) return interaction.editReply('You have to play now something.\nQueue is empty.')

        let isShuffled = playQueue.shuffle()

        let embed = new MessageEmbed()

        embed
            .setTitle('Shuffle is')
            .setDescription(`${isShuffled}`)
    }
}