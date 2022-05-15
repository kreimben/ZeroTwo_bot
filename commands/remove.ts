import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove song that you want to do.')
        .addNumberOption(option =>
            option
                .setName('number')
                .setDescription('You can search song numbers on `/queue` command.')
                .setMinValue(1)
                .setRequired(true)
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

            let number = interaction.options.getNumber("number") - 1

            let tracks = JSON.stringify(playQueue.tracks)

            console.log(`tracks: ${tracks}`)
            console.log(`selected is: ${tracks[number ? 0 : number]}`)
            console.log(`index: ${number}`)

            let removed = playQueue.remove(number)

            embed
                .setTitle(`Removed!\n**${removed['title']}**`)
                .setThumbnail(removed['thumbnail'])

            await interaction.editReply({embeds: [embed]})
        } catch (e) {
            console.log(`error on remove: ${e}`)
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Remove Command.\nPlease Report to kreimben.`)
            process.exit(-1)
        }
    }
}