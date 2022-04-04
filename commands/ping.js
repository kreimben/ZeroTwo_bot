const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping Pong 무한 repeat.'),
    run: async ({ client, interaction }) => {
        await interaction.deferReply()

        let embed = new MessageEmbed()

        embed
            .setDescription("Pong 🏓")
            .setFields([`${client.ws.ping} ms.`, '', false])
            .setTimestamp(new Date.now())
    }
}