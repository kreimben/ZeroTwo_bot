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
        .setName('shuffle')
        .setDescription('Set shuffle in current playlist.'),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let playQueue = client.player.getQueue(interaction.guild);
        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command");
            }
            if (!playQueue.connection)
                yield playQueue.connect(interaction.member.voice.channel);
            let isShuffled = playQueue.shuffle();
            let embed = new discord_js_1.MessageEmbed();
            embed
                .setTitle('Shuffle 🔀 is')
                .setDescription(`**${isShuffled}**`);
            yield interaction.editReply({ embeds: [embed] });
        }
        catch (e) {
            console.log(`error on shuffle: ${e}`);
            playQueue.clear();
            playQueue.destroy();
            yield interaction.editReply(`Error Occurs in Shuffle Command.\nPlease Report to kreimben.`);
            // process.exit(-1)
        }
    })
};
