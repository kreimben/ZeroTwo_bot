const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Zerotwo Dance')
    ,
    run: async ({client, interaction}) => {
        interaction.editReply('https://tenor.com/9YMQ.gif')
    }
}