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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName("queue")
        .setDescription("Let me know what will be playing?"),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let playQueue = yield client.player.getQueue(interaction.guild);
        try {
            if (!playQueue)
                return interaction.editReply('Queue is empty.');
            const queueString = playQueue.tracks
                .map((song, i) => {
                return `**${i + 1}.** [${song.title}](${song.url}) -- <@${song.requestedBy.id}> \`[${song.duration}]\``;
            })
                .join("\n");
            const currentSong = playQueue.current;
            const { current } = playQueue.getPlayerTimestamp();
            yield interaction.editReply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription(`**Currently Playing**\n` +
                        (currentSong ? `\`[${current}/${currentSong.duration}]\` [${currentSong.title}](${currentSong.url}) -- <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n` +
                        `**Queue**\n` +
                        `${queueString}`)
                        .setThumbnail(currentSong.thumbnail)
                ]
            });
        }
        catch (e) {
            console.log(`error on queue: ${e}`);
            playQueue.clear();
            playQueue.destroy();
            yield interaction.editReply(`Error Occurs in Queue Command.\nPlease Report to kreimben.`);
            // process.exit(-1)
        }
    })
};
