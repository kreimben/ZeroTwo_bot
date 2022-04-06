const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song to deticated song.')
    ,
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        const playQueue = await client.player.createQueue(interaction.guild)
        if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed()

        if (playQueue.tracks.length !== 0) {

            playQueue.skip()

            embed
                .setTitle('Skipped!')
                .setDescription(`Now on playing: ${playQueue.tracks[0]['title']}`)
                .setThumbnail(playQueue.tracks[0]['thumbnail'])

            await interaction.editReply({embeds: [embed]})
        } else {

        }
    }
}