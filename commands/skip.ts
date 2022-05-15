import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song to deticated song.')
        .addNumberOption(option =>
            option
                .setName("to")
                .setDescription("You can find number in `/queue` command.")
                .setRequired(true)
                .setMinValue(1)
        )
    ,
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guildId)

        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command")
            }
            if (!playQueue) return await interaction.editReply(`Queue is empty.`)
            if (playQueue.tracks.length === 0) return await interaction.editReply(`Nothing to remove forward songs!`)

            let embed = new MessageEmbed();

            let number = interaction.options.getNumber("to") - 1

            let tracks = JSON.stringify(playQueue.tracks)

            console.log(`tracks: ${tracks}`)
            console.log(`selected is: ${tracks[number]}`)
            console.log(`index: ${number}`)
            console.log(`to: ${number}`)

            let skipped

            if (number == 0) {

                skipped = playQueue.skip()
            } else {

                skipped = playQueue.skipTo(number)
            }

            embed
                .setTitle('Skipped!')
                .setDescription(`Now on playing: ${playQueue.tracks[0]['title']}`)
                .setThumbnail(playQueue.tracks[0]['thumbnail'])

            await interaction.editReply({embeds: [embed]})
        } catch (e) {
            console.log(`error on skip: ${e}`)
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Skip Command.\nPlease Report to kreimben.`)
            process.exit(-1)
        }
    }
}