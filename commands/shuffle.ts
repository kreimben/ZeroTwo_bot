import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Set shuffle in current playlist.'),
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guild)

        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command")
            }
            if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

            let isShuffled = playQueue.shuffle()

            let embed = new MessageEmbed()

            embed
                .setTitle('Shuffle 🔀 is')
                .setDescription(`**${isShuffled}**`)

            await interaction.editReply({embeds: [embed]})
        } catch (e) {
            console.log(`error on shuffle: ${e}`)

            playQueue.clear()
            playQueue.destroy()
            await interaction.editReply(`Error Occurs in Shuffle Command.\nPlease Report to kreimben.`)
            // process.exit(-1)
        }
    }
}