const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Set repeat in current playlist.')
        .addBooleanOption((option) =>
            option.setName('on').setDescription('on or off repeat').setRequired(true)
        )
    ,
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }
        const playQueue = await client.player.createQueue(interaction.guild)
        if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

        let subcommand = interaction.options.getBoolean('on')
        let status = (subcommand === true) ? 2 : 0
        playQueue.setRepeatMode(status)

        let embed = new MessageEmbed()

        embed
            .setTitle('Repeat 🔁 is')
            .setDescription(`**${playQueue.repeatMode === 2 ? 'On' : 'Off'}**`)

        await interaction.editReply({
            embeds: [embed]
        })
    }
}