const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove song that you want to do.')
        .addNumberOption(option =>
            option
                .setName('number')
                .setDescription('You can search song numbers on `/queue` command.')
                .setMinValue(0)
                .setRequired(true)
        )
    ,
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        let playQueue = client.player.getQueue(interaction.guildId)
        if (!playQueue) return await interaction.editReply(`Queue is empty.`)
        if (playQueue.tracks.length === 0) return await interaction.editReply(`Nothing to remove forward songs!`)

        let embed = new MessageEmbed();

        let number = interaction.options.getNumber("number") - 1

        let tracks = JSON.stringify(playQueue.tracks)

        console.log(`tracks: ${tracks}`)
        console.log(`selected is: ${tracks[number ? 0 : number]}`)
        console.log(`index: ${number}`)

        let removed = playQueue.remove(number)

        embed
            .setTitle(`Removed!\n**${removed['title']}**`)
            .setThumbnail(removed['thumbnail'])

        await interaction.editReply({ embeds: [embed] })
    }
}