const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove song that you want to do.')
        .addSubcommand((subcommand) => {
            subcommand
                .setName('number')
                .setDescription('list number')
                .addStringOption((option) => {
                    option
                        .setName('number')
                        .setDescription('You can search song numbers on /queue command.')
                        .setRequired(true)
                })
        })
    ,
    run: async ({client, interaction}) => {
        let playQueue = client.player.getQueue(interaction.guilds)
        if (!playQueue.connection) await playQueue.connect(client.member.voice.channel)

        let number = interaction.options.getString("number")
        playQueue.remove(number)
    }
}