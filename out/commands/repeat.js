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
        .setName('repeat')
        .setDescription('Set repeat in current playlist.')
        .addBooleanOption((option) => option.setName('on').setDescription('on or off repeat').setRequired(true)),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const playQueue = yield client.player.createQueue(interaction.guild);
        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command");
            }
            if (!playQueue.connection)
                yield playQueue.connect(interaction.member.voice.channel);
            let subcommand = interaction.options.getBoolean('on');
            let status = (subcommand === true) ? 2 : 0;
            playQueue.setRepeatMode(status);
            let embed = new MessageEmbed();
            embed
                .setTitle('Repeat 🔁 is')
                .setDescription(`**${playQueue.repeatMode === 2 ? 'On' : 'Off'}**`);
            yield interaction.editReply({
                embeds: [embed]
            });
        }
        catch (e) {
            console.log(`error on repeat: ${e}`);
            playQueue.clear();
            playQueue.destroy();
            yield interaction.editReply(`Error Occurs in Repeat Command.\nPlease Report to kreimben.`);
            // process.exit(-1)
        }
    })
};
