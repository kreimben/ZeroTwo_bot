package discord

import (
	"fmt"
	"github.com/bwmarrin/discordgo"
	"log"
	"os"
	"os/signal"
)

func DiscordInit() {
	session, err := discordgo.New("Bot " + os.Getenv("DISCORD_TOKEN"))
	if err != nil {
		fmt.Printf("Error creating Discord session: %s", err)
		panic("Error creating Discord session")
	}

	//discord.AddHandler(messageCreate)
	session.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
		log.Printf("Logged in as: %v#%v", s.State.User.Username, s.State.User.Discriminator)
	})

	// Open a websocket connection to Discord and begin listening.
	err = session.Open()
	defer session.Close()
	if err != nil {
		fmt.Printf("Error creating Discord session: %s", err)
		panic("Error opening Discord session")
	}

	// Check debug mode.
	var guildId string
	if os.Getenv("DEBUG") == "true" {
		guildId = os.Getenv("TEST_GUILD_ID")
		log.Println("Guild ID: " + guildId)
		log.Println("Debug mode: " + os.Getenv("DEBUG"))
	} else {
		guildId = ""
	}

	// Register commands
	commands.RegisterHey(DiscordSession, guildId)
	commands.RegisterDance(DiscordSession, guildId)
	commands.RegisterVersion(DiscordSession, guildId)

	// Run until code is terminated
	fmt.Println("Bot running...")
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop
}
