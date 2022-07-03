var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove song that you want to do.')
        .addNumberOption(option => option
        .setName('number')
        .setDescription('You can search song numbers on `/queue` command.')
        .setMinValue(1)
        .setRequired(true)),
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
            let embed = new MessageEmbed();
            let number = interaction.options.getNumber("number") - 1;
            let tracks = JSON.stringify(playQueue.tracks);
            console.log(`tracks: ${tracks}`);
            console.log(`selected is: ${tracks[number ? 0 : number]}`);
            console.log(`index: ${number}`);
            let removed = playQueue.remove(number);
            embed
                .setTitle(`Removed!\n**${removed['title']}**`)
                .setThumbnail(removed['thumbnail']);
            yield interaction.editReply({ embeds: [embed] });
        }
        catch (e) {
            console.log(`error on remove: ${e}`);
            playQueue.clear();
            playQueue.destroy();
            yield interaction.editReply(`Error Occurs in Remove Command.\nPlease Report to kreimben.`);
            // process.exit(-1)
        }
    })
};
