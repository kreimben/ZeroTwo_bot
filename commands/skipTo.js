const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`skip to`)
        .setDescription(`Skip current song to deticated song.`)
        .addStringOption((option) => {
            option
                .setName('number')
                .setDescription('You can search song numbers on \`/queue\` command.')
                .setRequired(false)
        })
    ,
    run: async ({client, interaction}) => {

        const playQueue = await client.player.createQueue(interaction.guild)
        if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed()

        if (interaction.options.getSubcommand() === "number") {
            let number = interaction.options.getString("number")
            playQueue.skipTo(number)
        } else {
            playQueue.skip()
        }
    }
}