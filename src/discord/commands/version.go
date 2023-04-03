package commands

import (
	"github.com/bwmarrin/discordgo"
	"log"
	"os"
)

const versionName = "version"

var versionCommand = &discordgo.ApplicationCommand{
	Name:        versionName,
	Description: "Get the bot version.",
}

func versionHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "Welcome to ZeroTwo bot!",
			Embeds: []*discordgo.MessageEmbed{
				{
					Title:       "",
					Description: "",
					Fields: []*discordgo.MessageEmbedField{
						{
							Name: "Features",
							Value: `1. Completely rewritten in Go.
                                    2. New website base commands.
                                    3. Remove ping, force_quit commands.`,
							Inline: false,
						},
					},
				},
			},
		},
	})
	if err != nil {
		log.Println(err)
		return
	}
}

func RegisterVersion(session *discordgo.Session, guildId string) {
	log.Println("Registering version command")
	// Register commands
	_, versionErr := session.ApplicationCommandCreate(os.Getenv("CLIENT_ID"), guildId, versionCommand)
	if versionErr != nil {
		panic("Error creating versionCommand")
	}

	session.AddHandler(
		func(s *discordgo.Session, i *discordgo.InteractionCreate) {
			if i.ApplicationCommandData().Name == versionName {
				versionHandler(s, i)
			}
		},
	)
}
