const {REST} = require('@discordjs/rest')
const {Client} = require('discord.js')
const Discord = require('discord.js')
const {Routes, GatewayIntentBits} = require('discord-api-types/v10')
const {Player} = require('discord-player')
const fs = require('fs')
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
    client.player = new Player(client, {
        ytdlOptions: {
            quality: "highestaudio",
            highWaterMark: 1 << 25
        }
    })

    let commands = []

    const slashFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    for (const file of slashFiles) {
        const slashcmd = require(`./commands/${file}`)
        client.slashcommands.set(slashcmd.data.name, slashcmd)
        commands.push(slashcmd.data.toJSON())
    }

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) interaction.reply(`Command not found.`)

        await interaction.deferReply()
        await slashcmd.run({client, interaction})
    })

    client.once('ready', () => {
        console.log(`Ready!: ${client.user.tag}`)
    })

    await client.login(process.env.DISCORD_TOKEN)

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

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
    }
})();