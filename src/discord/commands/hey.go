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
	Description: "Say hey! (to get a webpage or play songs traditionally.)",
}

func heyHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	// Check if the user is in a voice channel
	voiceState, err := s.State.VoiceState(i.GuildID, i.Member.User.ID) // user's voice state
	if err != nil {
		log.Println(err)
		return
	}
	if voiceState.ChannelID == "" {
		err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Content: "You need to be in a voice channel to use this command!",
			},
		})
		if err != nil {
			log.Println(err)
			return
		}
		return
	}

	// If voice client is not in a channel, join the user's channel
	if s.VoiceConnections == nil || s.VoiceConnections[i.GuildID] == nil {
		// Join the channel
		_, err := s.ChannelVoiceJoin(i.GuildID, voiceState.ChannelID, false, false)
		if err != nil {
			log.Println(err)
			if err != nil {
				log.Println(err)
				return
			}
			return
		}
	} else {
		// move to the user's channel
		join, err := s.ChannelVoiceJoin(voiceState.GuildID, voiceState.ChannelID, false, false)
		if err != nil {
			log.Println(err)
			if err != nil {
				log.Println(err)
				return
			}
			return
		}
		err = join.Speaking(true)
		if err != nil {
			log.Println(err)
			return
		}
	}

	// before sending the response, record to db
	db.DatabaseSession.Create(&models.CommandHistory{
		GuildID: i.GuildID,
		UserID:  i.Member.User.ID,
		Command: heyName,
	})

	// webpage for control zerotwo bot
	// send session info to website for playing music.
	err = s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "https://zerotwo-bot.herokuapp.com/",
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
