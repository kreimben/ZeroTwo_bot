import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credit')
        .setDescription('Who built this bot?')
    ,
    run: async ({client, interaction}) => {
        let embed = new MessageEmbed()

        embed
            .setTitle(`[ZeroTwo_bot](https://github.com/kreimben/ZeroTwo_bot) on Discord!`)
            .setDescription(
                `**Created by Kreimben.**` + `\n` +
                `[Instagram](https://instagram.com/kreimben)` + `\n` +
                `[Github](https://github.com/kreimben)` + `\n` +
                `[PayPal](https://paypal.me/kreimben)` + `\n` +
                `[Website](https://kreimben.com)`
            )

        await interaction.editReply({embeds: [embed]})
    }
}