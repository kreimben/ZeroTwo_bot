package discord

import (
	"fmt"
	"github.com/bwmarrin/discordgo"
	"log"
	"os"
)

var (
	DiscordSession *discordgo.Session
	err            error
	// SessionCredentials
	// map["{guild_id}-{user_id}"]discordSession.
	// need to be cleared when the bot is disconnected from the voice channel.
	SessionCredentials = make(map[string]*discordgo.Session)
)

func DiscordInit() {
	DiscordSession, err = discordgo.New("Bot " + os.Getenv("DISCORD_TOKEN"))
	if err != nil {
		fmt.Printf("Error creating Discord session: %s", err)
		panic("Error creating Discord session")
	}

	// set all intents.
	DiscordSession.Identify.Intents = discordgo.MakeIntent(discordgo.IntentsAll)

	//discord.AddHandler(messageCreate)
	DiscordSession.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
		log.Printf("Logged in as: %v#%v\n", r.User.Username, r.User.Discriminator)
	})

	// Open a websocket connection to Discord and begin listening.
	err = DiscordSession.Open()
	if err != nil {
		fmt.Printf("Error creating Discord session: %s", err)
		panic("Error opening Discord session")
	}

	// Check debug mode.
	guildId := ""
	if os.Getenv("DEBUG") == "true" {
		guildId := os.Getenv("TEST_GUILD_ID")
		log.Println("Guild ID: " + guildId)
		log.Println("Debug mode: " + os.Getenv("DEBUG"))
	}

	// Register commands
	RegisterHey(DiscordSession, guildId)
	//commands.RegisterDance(DiscordSession, guildId)
	//commands.RegisterVersion(DiscordSession, guildId)
	//commands.RegisterTest(DiscordSession, guildId) // Just test for playing music
}
