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
module.exports = {
    data: new SlashCommandBuilder()
        .setName('continue')
        .setDescription('Continue play the song'),
    run: ({ client, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let playQueue = client.player.getQueue(interaction.guildId);
        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You need to be in a VC to use this command");
            }
            if (playQueue) {
                playQueue.setPaused(false);
                let current_string = `**${playQueue.current}**`;
                yield interaction.editReply(`Continue play the song!\n${current_string}`);
            }
            else {
                yield interaction.editReply("No song to play continuously.");
            }
        }
        catch (e) {
            console.log(`error on continue: ${e}`);
            playQueue.clear();
            playQueue.destroy();
            yield interaction.editReply(`Error Occurs in Continue Command.\nPlease Report to kreimben.`);
            // process.exit(-1)
        }
    })
};
