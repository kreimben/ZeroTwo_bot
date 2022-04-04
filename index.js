const {REST} = require('@discordjs/rest')
const {Client, Intents} = require('discord.js')
const Discord = require('discord.js')
const {Routes} = require('discord-api-types/v10')
const {Player} = require('discord-player')
const fs = require('fs')
require('dotenv').config();

(async () => {

    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS
        ]
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

    commands.forEach((v, i, a) => {
        console.log(`command: ${JSON.stringify(v)}`)
    })

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

    try {
        console.log(`Started refreshing application (/) commands.`)

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        )
    } catch (error) {
        console.error(error)
    }

    client.once('ready', () => {
        console.log(`Ready!: ${client.user.tag}`)
    })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) interaction.reply(`Command not found.`)

        await interaction.deferReply()
        await slashcmd.run({client, interaction})
    })

    await client.login(process.env.DISCORD_TOKEN)
})();