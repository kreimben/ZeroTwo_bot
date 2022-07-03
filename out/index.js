"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const { REST } = require('@discordjs/rest');
const { Client } = require('discord.js');
const Discord = require('discord.js');
const { Routes, GatewayIntentBits } = require('discord-api-types/v10');
const { Player } = require('discord-player');
(() => {
    /*
     * Implement Logger.
     */
    // const fs = require('fs');
    const util = require('util');
    const log_file = fs.createWriteStream(__dirname + '/log.txt', { flags: 'w' });
    const log_stdout = process.stdout;
    console.log = function (d) {
        log_file.write(util.format(d) + '\n');
        log_stdout.write(util.format(d) + '\n');
    };
    console.log(`Success to logging in file.`);
})();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const intents = [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ];
    const client = new Client({
        intents: intents
    });
    client.slashcommands = new Discord.Collection();
    /// Option: https://discord-player.js.org/docs/main/master/typedef/PlayerOptions
    client.player = new Player(client, {
        autoRegisterExtractor: true,
        connectionTimeout: 5 * 1000,
        ytdlOptions: {
            quality: "highestaudio",
            highWaterMark: 1 << 26,
            liveBuffer: 1000 * 100 // Default = 20000 milliseconds. (20 seconds)
        }
    });
    try {
        client.player.on('error', (queue, error) => {
            console.error(`error: ${JSON.stringify(error)}`);
            queue.play(queue.nowPlaying(), {});
            // queue.destroy()
            // process.exit(-1)
        });
    }
    catch (e) {
        console.error(`cat on error: ${e}`);
    }
    try {
        client.player.on('connectionError', (queue, error) => {
            console.error(`connectionError: ${JSON.stringify(error)}`);
            queue.clear();
            queue.destroy();
            // process.exit(-1)
        });
    }
    catch (e) {
        console.error(`cat on connectionError: ${e}`);
    }
    let commands = [];
    const slashFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));
    for (const file of slashFiles) {
        const slashcmd = require(`./commands/${file}`);
        client.slashcommands.set(slashcmd.data.name, slashcmd);
        commands.push(slashcmd.data.toJSON());
    }
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!interaction.isCommand())
                return;
            const slashcmd = client.slashcommands.get(interaction.commandName);
            if (!slashcmd)
                interaction.reply(`Command not found.`);
            yield interaction.deferReply();
            yield slashcmd.run({ client, interaction });
        }
        catch (e) {
            console.log(`client.on interactionCreate Error Occurs: ${e}`);
            yield interaction.editReply(`Error Occurs: ${e}`);
            process.exit(-1);
        }
    }));
    client.once('ready', () => {
        console.log(`Ready!: ${client.user.tag}`);
    });
    yield client.login(process.env.DISCORD_TOKEN);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    let if_dev = process.env.DEV == 'true' ? true : false;
    console.log(`DEV: ${if_dev}`);
    try {
        if (if_dev) {
            yield rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        }
        else {
            yield rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        }
        console.log(`Started refreshing application (/) commands.`);
    }
    catch (error) {
        console.error(error);
        process.exit(-1);
    }
    setInterval(() => {
        let usage = process.memoryUsage();
        let now = new Date();
        console.log(`${now}`);
        for (const [key, value] of Object.entries(usage)) {
            console.log(`Memory usage by ${key}, ${value / 1000000}MB `);
        }
        console.log(`========================================================`);
    }, 20 * 1000);
}))();
