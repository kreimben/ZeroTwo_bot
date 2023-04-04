package commands

import (
	"github.com/bwmarrin/discordgo"
	"github.com/kreimben/ZeroTwo_bot/src/db"
	"github.com/kreimben/ZeroTwo_bot/src/db/models"
	"log"
	"os"
)

const heyName = "hey"

var heyCommand = &discordgo.ApplicationCommand{
	Name:        heyName,
	Description: "Responds with a link to the website for controlling the bot / 봇을 제어할 수 있는 웹사이트를 제공합니다.",
}

func heyHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	// Check if the user is in a voice channel
	voiceState, err := s.State.VoiceState(i.GuildID, i.Member.User.ID) // user's voice state
	if err != nil {
		err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "You need to be in a voice channel to use this command!",
				Flags:   discordgo.MessageFlagsEphemeral,
			},
		})
		if err != nil {
			log.Println("Error sending response: " + err.Error())
			return
		}
		return
	}

	// If voice client is not in a channel, join the user's channel
	if s.VoiceConnections == nil || s.VoiceConnections[i.GuildID] == nil {
		// Join the channel
		_, err := s.ChannelVoiceJoin(i.GuildID, voiceState.ChannelID, false, false)
		if err != nil {
			log.Println("Error joining voice channel: " + err.Error())
			if err != nil {
				log.Println("Error joining voice channel: " + err.Error())
				return
			}
			return
		}
	} else {
		// move to the user's channel
		join, err := s.ChannelVoiceJoin(voiceState.GuildID, voiceState.ChannelID, false, false)
		if err != nil {
			log.Println("Error joining voice channel: " + err.Error())
			if err != nil {
				log.Println("Error joining voice channel: " + err.Error())
				return
			}
			return
		}
		err = join.Speaking(true)
		if err != nil {
			log.Println("Error speaking: " + err.Error())
			return
		}
	}

	// before sending the response, record to db
	db.DatabaseSession.Create(&models.CommandHistory{
		GuildID:  i.GuildID,
		UserID:   i.Member.User.ID,
		UserName: i.Member.User.Username,
		Command:  heyName,
	})

	// webpage for control zerotwo bot
	// send session info to website for playing music.
	err = s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "https://kreimben.com/",
			Flags:   discordgo.MessageFlagsEphemeral,
		},
	})
	if err != nil {
		log.Println("Error sending response: " + err.Error())
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
