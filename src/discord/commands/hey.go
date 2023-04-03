package commands

import (
	"github.com/bwmarrin/discordgo"
	"log"
	"os"
)

const heyName = "hey"

var heyCommand = &discordgo.ApplicationCommand{
	Name:        heyName,
	Description: "Say hey! (to get a webpage or play songs traditionally.)",
}

func heyHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "Hey!",
		},
	})
	if err != nil {
		log.Println(err)
		return
	}
}

func RegisterHey(session *discordgo.Session, guildId string) {
	log.Println("Registering hey command")
	// Register commands
	_, heyErr := session.ApplicationCommandCreate(os.Getenv("CLIENT_ID"), guildId, heyCommand)
	if heyErr != nil {
		panic("Error creating heyCommand")
	}

	session.AddHandler(
		func(s *discordgo.Session, i *discordgo.InteractionCreate) {
			if i.ApplicationCommandData().Name == heyName {
				heyHandler(s, i)
			}
		},
	)
}
