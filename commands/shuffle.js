const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Set shuffle in current playlist.'),
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        let playQueue = client.player.getQueue(interaction.guild)
        if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

        let isShuffled = playQueue.shuffle()

        let embed = new MessageEmbed()

        embed
            .setTitle('Shuffle 🔀 is')
            .setDescription(`**${isShuffled}**`)

        await interaction.editReply({ embeds: [embed] })
    }
}