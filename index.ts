import {Queue} from "discord-player";

const {REST} = require('@discordjs/rest')
const {Client} = require('discord.js')
const Discord = require('discord.js')
const {Routes, GatewayIntentBits} = require('discord-api-types/v10')
const {Player} = require('discord-player')
const fs = require('fs')

/*
 * Only apply for just test.
 */
require('dotenv').config();

(async () => {

    const intents = [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]

    const client = new Client({
        intents: intents
    })

    client.slashcommands = new Discord.Collection()
    /// Option: https://discord-player.js.org/docs/main/master/typedef/PlayerOptions
    client.player = new Player(client, {
        autoRegisterExtractor: true,
        connectionTimeout: 5 * 1000, // milliseconds.
        ytdlOptions: {
            quality: "highestaudio",
            highWaterMark: 1 << 26, // Default 512KB (1 << 25).
            liveBuffer: 1000 * 100 // Default = 20000 milliseconds. (20 seconds)
        }
    })

    try {
        client.player.on('error', (queue: Queue, error: Error) => {
            console.error(`error: ${JSON.stringify(error)}`)
            queue.play(queue.nowPlaying(), {})

            // queue.destroy()
            // process.exit(-1)
        })
    } catch (e) {
        console.error(`cat on error: ${e}`)
    }


    try {
        client.player.on('connectionError', (queue: Queue, error: Error) => {
            console.error(`connectionError: ${JSON.stringify(error)}`)

            queue.clear()
            queue.destroy()
            // process.exit(-1)
        })
    } catch (e) {
        console.error(`cat on connectionError: ${e}`)
    }

    let commands = []

    const slashFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'))
    for (const file of slashFiles) {
        const slashcmd = require(`./commands/${file}`)
        client.slashcommands.set(slashcmd.data.name, slashcmd)
        commands.push(slashcmd.data.toJSON())
    }

    client.on('interactionCreate', async (interaction) => {
        try {
            if (!interaction.isCommand()) return;

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply(`Command not found.`)

            await interaction.deferReply()
            await slashcmd.run({client, interaction})
        } catch (e) {
            console.log(`client.on interactionCreate Error Occurs: ${e}`)
            await interaction.editReply(`Error Occurs: ${e}`)
            process.exit(-1)
        }
    })

    client.once('ready', () => {
        console.log(`Ready!: ${client.user.tag}`)
    })

    await client.login(process.env.DISCORD_TOKEN)

    const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN)

    let if_dev = process.env.DEV == 'true' ? true : false
    console.log(`DEV: ${if_dev}`)

    try {
        if (if_dev) {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                {body: commands}
            )
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                {body: commands}
            )
        }
        console.log(`Started refreshing application (/) commands.`)
    } catch (error) {
        console.error(error)
        process.exit(-1)
    }

    setInterval(() => {
        let usage = process.memoryUsage();
        let now = new Date();

        console.log(`${now}`)

        for (const [key, value] of Object.entries(usage)) {
            console.log(`Memory usage by ${key}, ${value / 1000000}MB `)
        }

        console.log(`========================================================`)
    }, 20 * 1000);
})();
