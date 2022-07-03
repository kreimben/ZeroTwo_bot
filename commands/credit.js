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
        .setName('credit')
        .setDescription('Who built this bot?'),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let embed = new discord_js_1.MessageEmbed();
        embed
            .setTitle(`[ZeroTwo_bot](https://github.com/kreimben/ZeroTwo_bot) on Discord!`)
            .setDescription(`**Created by Kreimben.**` + `\n` +
            `[Instagram](https://instagram.com/kreimben)` + `\n` +
            `[Github](https://github.com/kreimben)` + `\n` +
            `[PayPal](https://paypal.me/kreimben)` + `\n` +
            `[Website](https://kreimben.com)`);
        yield interaction.editReply({ embeds: [embed] });
    })
};
