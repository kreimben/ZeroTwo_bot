package commands

import (
	"github.com/bwmarrin/discordgo"
	"log"
	"os"
)

const danceName = "dance"

var danceCommand = &discordgo.ApplicationCommand{
	Name:        danceName,
	Description: "Dance!",
}

func danceHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "https://tenor.com/bHumN.gif",
		},
	})
	if err != nil {
		log.Println(err)
		return
	}
}

func RegisterDance(session *discordgo.Session, guildId string) {
	log.Println("Registering dance command")
	// Register commands
	_, danceErr := session.ApplicationCommandCreate(os.Getenv("CLIENT_ID"), guildId, danceCommand)
	if danceErr != nil {
		panic("Error creating danceCommand")
	}

	session.AddHandler(
		func(s *discordgo.Session, i *discordgo.InteractionCreate) {
			if i.ApplicationCommandData().Name == danceName {
				danceHandler(s, i)
			}
		},
	)
}
