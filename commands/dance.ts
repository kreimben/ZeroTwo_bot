import {SlashCommandBuilder} from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Zerotwo Dance')
    ,
    run: async ({client, interaction}) => {
        interaction.editReply('https://tenor.com/9YMQ.gif')
    }
}