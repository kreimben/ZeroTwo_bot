const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require("discord.js");
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play the music from URL or youtube search!')
        .addSubcommand((subcommand) =>
            subcommand
                .setName("url")
                .setDescription("Loads a single song from a url")
                .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("search")
                .setDescription("Searches for sogn based on provided keywords")
                .addStringOption((option) =>
                    option.setName("searchterms").setDescription("the search keywords").setRequired(true)
                )
        ),
    run: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command")
        }

        const playQueue = await client.player.createQueue(interaction.guild)
        if (!playQueue.connection) await playQueue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed()

        if (interaction.options.getSubcommand() === "url") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const song = result.tracks[0]
            await playQueue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Duration: ${song.duration}`})

        } else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const song = result.tracks[0]
            await playQueue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Duration: ${song.duration}`})
        } else {
            embed
                .setTitle("That is not a right command!")
        }
        if (!playQueue.playing) await playQueue.play()
        await interaction.editReply({
            embeds: [embed]
        })
    }
}