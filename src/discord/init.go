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

	// Run until code is terminated
	fmt.Println("Bot running...")
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop

	_, err = session.ApplicationCommandCreate("960047470589657108", os.Getenv("TEST_GUILD_ID"), &discordgo.ApplicationCommand{
		Name:        "hey",
		Description: "Hey!",
	})
	if err != nil {
		fmt.Printf("Error creating command: %s", err)
		panic("Error creating command")
	}

}
