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
        .setName('ping')
        .setDescription('Ping Pong 무한 repeat.'),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const msg = yield interaction.followUp({ content: "Pong!", fetchReply: true });
            const embed = new discord_js_1.MessageEmbed();
            embed
                .setTitle('Pong 🏓')
                .setDescription(`Bot Latency: \`${msg.createdTimestamp - interaction.createdTimestamp}ms\`\nWebsocket Latency: \`${client.ws.ping}ms\``)
                .setTimestamp(Date.now());
            yield interaction.editReply({
                embeds: [embed]
            });
        }
        catch (error) {
            console.log(`error on ping: ${error}`);
            yield interaction.editReply(`Error Occurs in Ping Command.\nPlease Report to kreimben.`);
            process.exit(-1);
        }
    })
};
