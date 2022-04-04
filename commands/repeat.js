const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Set repeat in current playlist.')
        .addBooleanOption((option) => {
            option.setName('on').setRequired(true)
        })
    ,
    run: async ({client, interaction}) => {
        const playQueue = await client.player.createQueue(interaction.guild)
        if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

        // if (!playQueue) return interaction.editReply('You have to play now something.\nQueue is empty.')

        let subcommand = interaction.options.getBoolean('on')
        let status = (subcommand === true) ? 2 : 0
        playQueue.setRepeatMode({ status })

        let embed = new MessageEmbed()

        embed
            .setTitle('Repeat is')
            .setDescription(`${playQueue.repeatMode}`)
    }
}