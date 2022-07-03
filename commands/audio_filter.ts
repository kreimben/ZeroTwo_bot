import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed} from "discord.js";
import {QueueFilters} from "discord-player";

const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

const {QueryType} = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('audiofilter')
        .setDescription(`It's too boring to just listen without any filter.`)
        .addSubcommand(subcommand =>
            subcommand
                .setName(`show`)
                .setDescription(`Show what is enabled.`)
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(`off`)
                .setDescription(`Turn off the filter`)
        )
        .addSubcommandGroup(group =>
            group
                .setName(`enable`)
                .setDescription(`Filter`)
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`bassboost_low`)
                        .setDescription(`bassboost_low`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`bassboost`)
                        .setDescription(`bassboost`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`bassboost_high`)
                        .setDescription(`bassboost_high`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`vaporwave`)
                        .setDescription(`vaporwave`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`nightcore`)
                        .setDescription(`nightcore`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`phaser`)
                        .setDescription(`phaser`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`tremolo`)
                        .setDescription(`tremolo`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`vibrato`)
                        .setDescription(`vibrato`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`reverse`)
                        .setDescription(`reverse`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`treble`)
                        .setDescription(`treble`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`normalizer`)
                        .setDescription(`normalizer`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`normalizer2`)
                        .setDescription(`normalizer2`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`surrounding`)
                        .setDescription(`surrounding`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`pulsator`)
                        .setDescription(`pulsator`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`subboost`)
                        .setDescription(`subboost`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`karaoke`)
                        .setDescription(`karaoke`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`flanger`)
                        .setDescription(`flanger`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`gate`)
                        .setDescription(`gate`)
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`chorus`)
                        .setDescription(`chorus`)
                )
        )
    ,
    run: async ({client, interaction}) => {
        let queue = await client.player.getQueue(interaction.guild)

        if (!queue) await interaction.editReply('You need to be in a VC to use this command')

        let embed = new MessageEmbed()

        embed
            .setTitle(`**Audio Filter**`)

        let filters = [`bassboost_low`, `bassboost`, `bassboost_high`, `8D`,
            `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`,
            `reverse`, `treble`, `normalizer`, `normalizer2`, `surrounding`,
            `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`,
            `haas`, `mcompand`, `mono`, `mstlr`, `mstrr`,
            `compressor`, `expander`, `softlimiter`, `chorus`, `chorus2d`,
            `chorus3d`, `fadein`, `dim`, `earrape`];
        console.log(`filters: ${filters}`);

        let maps = {};

        if (interaction.options.getSubcommand() === `off`) {
            filters.forEach((value, _n, _a) => {
                maps[`${value}`] = false;
            })

            await queue.setFilters(maps)

            embed.setDescription(`All of audio filter has been disabled!`)
        } else if (filters.includes(interaction.options.getSubcommand())) {
            let command = interaction.options.getSubcommand() as keyof QueueFilters

            filters.forEach((value, _n, _a) => {
                if (command === value) {
                    maps[`${command}`] = true
                }
            })

            await queue.setFilters(maps)

            embed.setDescription(`\`${interaction.options.getSubcommand()}\` Filter Enabled!`)
        } else if (interaction.options.getSubcommand() === `show`) {
            let enabled = queue.getFiltersEnabled();

            embed.setDescription(`Currently enabled filter: \`${enabled}\``)
        } else {
            await interaction.editReply(`Wrong command!`)
        }

        console.log(`maps: ${JSON.stringify(maps)}`)
        console.log(`command: ${interaction.options.getSubcommand()}`)
        await interaction.editReply({embeds: [embed]})
    }
}