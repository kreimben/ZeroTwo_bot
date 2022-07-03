"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { QueryType } = require("discord-player");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('play')
        .setDescription('Play the music from URL or youtube search!')
        .addSubcommand((subcommand) => subcommand
        .setName("url")
        .setDescription("Loads a single song from a url")
        .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true)))
        .addSubcommand((subcommand) => subcommand
        .setName("search")
        .setDescription("Searches for song based on provided keywords")
        .addStringOption((option) => option.setName("searchterms").setDescription("the search keywords").setRequired(true))),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let queue = yield client.player.getQueue(interaction.guild);
        // console.log(`queue: ${queue}`)
        if (!queue) { // Only when queue is no more exist.
            client.player = new discord_player_1.Player(client, {
                autoRegisterExtractor: true,
                connectionTimeout: 5 * 1000,
                ytdlOptions: {
                    quality: "highestaudio",
                    highWaterMark: 1 << 26,
                    liveBuffer: 1000 * 100 // Default = 20000 milliseconds. (20 seconds)
                }
            });
        }
        const playQueue = yield client.player.createQueue(interaction.guild, {
            leaveOnEnd: true,
            leaveOnEmpty: true
        });
        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command");
            }
            if (!playQueue.connection)
                yield playQueue.connect(interaction.member.voice.channel);
            let embed = new discord_js_1.MessageEmbed();
            if (interaction.options.getSubcommand() === "url") {
                let url = interaction.options.getString("url");
                const result = yield client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                });
                if (result.tracks.length === 0)
                    return interaction.editReply("No results");
                const song = result.tracks[0];
                yield playQueue.addTrack(song);
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}` });
            }
            else if (interaction.options.getSubcommand() === "search") {
                let url = interaction.options.getString("searchterms");
                const result = yield client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_SEARCH
                });
                if (result.tracks.length === 0)
                    return interaction.editReply("No results");
                const song = result.tracks[0];
                yield playQueue.addTrack(song);
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}` });
            }
            else {
                embed
                    .setTitle("That is not a right command!");
            }
            if (!playQueue.playing)
                yield playQueue.play();
            yield interaction.editReply({
                embeds: [embed]
            });
        }
        catch (e) {
            console.log(`error on play: ${e}`);
            playQueue.clear();
            playQueue.destroy();
            yield interaction.editReply(`Error Occurs in Play Command.\nPlease Report to kreimben.`);
            // process.exit(-1)
        }
    })
};
