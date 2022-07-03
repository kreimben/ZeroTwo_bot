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
        .setName('skip')
        .setDescription('Skip current song to deticated song.')
        .addNumberOption(option => option
        .setName("to")
        .setDescription("You can find number in `/queue` command.")
        .setRequired(true)
        .setMinValue(1)),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let playQueue = client.player.getQueue(interaction.guildId);
        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command");
            }
            if (!playQueue)
                return yield interaction.editReply(`Queue is empty.`);
            if (playQueue.tracks.length === 0)
                return yield interaction.editReply(`Nothing to remove forward songs!`);
            let embed = new discord_js_1.MessageEmbed();
            let number = interaction.options.getNumber("to") - 1;
            let tracks = JSON.stringify(playQueue.tracks);
            let skipped;
            if (number == 0) {
                skipped = playQueue.skip();
            }
            else {
                skipped = playQueue.skipTo(number);
            }
            embed
                .setTitle('Skipped!')
                .setDescription(`Now on playing: ${playQueue.tracks[0]['title']}`)
                .setThumbnail(playQueue.tracks[0]['thumbnail']);
            yield interaction.editReply({ embeds: [embed] });
        }
        catch (e) {
            console.log(`error on skip: ${e}`);
            playQueue.clear();
            playQueue.destroy();
            yield interaction.editReply(`Error Occurs in Skip Command.\nPlease Report to kreimben.`);
            // process.exit(-1)
        }
    })
};
