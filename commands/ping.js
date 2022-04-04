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
            .setField(`${Date.now() - interaction.message.createdTimestamp} ms.`)
            .setTimestamp(new Date.now())
    }
}