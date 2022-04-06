const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping Pong 무한 repeat.')
    ,
    run: async ({ client, interaction }) => {
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
            console.error(error)
        }
    }
}