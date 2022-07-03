import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping Pong 무한 repeat.')
    ,
    run: async ({client, interaction}) => {
        try {
            const msg = await interaction.followUp({content: "Pong!", fetchReply: true})
            const embed = new MessageEmbed();

            embed
                .setTitle('Pong 🏓')
                .setDescription(`Bot Latency: \`${msg.createdTimestamp - interaction.createdTimestamp}ms\`\nWebsocket Latency: \`${client.ws.ping}ms\``)
                .setTimestamp(Date.now())

            await interaction.editReply({
                embeds: [embed]
            })
        } catch (error) {
            console.log(`error on ping: ${error}`)

            await interaction.editReply(`Error Occurs in Ping Command.\nPlease Report to kreimben.`)
            process.exit(-1)
        }
    }
}