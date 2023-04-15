package commands

import (
	"fmt"
	"github.com/bwmarrin/discordgo"
	"github.com/kreimben/ZeroTwo_bot/src/server/player"
	"log"
	"os"
)

const testName = "test"

var testCommand = &discordgo.ApplicationCommand{
	Name:        testName,
	Description: "Test command",
	Options: []*discordgo.ApplicationCommandOption{
		{
			Type:        discordgo.ApplicationCommandOptionString,
			Name:        "url",
			Description: "only url",
			Required:    true,
		},
	},
}

func checkUserIsInVoiceChannel(s *discordgo.Session, i *discordgo.InteractionCreate) (voiceState *discordgo.VoiceState, err error) {
	voiceState, err = s.State.VoiceState(i.GuildID, i.Member.User.ID) // user's voice state
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
		}
	}
	return
}

func joinVoiceChannel(s *discordgo.Session, i *discordgo.InteractionCreate, voiceState *discordgo.VoiceState) (join *discordgo.VoiceConnection, err error) {
	//var join *discordgo.VoiceConnection
	if s.VoiceConnections == nil || s.VoiceConnections[i.GuildID] == nil {
		// Join the channel
		join, err = s.ChannelVoiceJoin(i.GuildID, voiceState.ChannelID, false, false)
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
		join, err = s.ChannelVoiceJoin(voiceState.GuildID, voiceState.ChannelID, false, false)
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
	return
}

func testHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	log.Println("test command called")

	// Check if the user is in a voice channel
	voiceState, err := checkUserIsInVoiceChannel(s, i)
	if err != nil {
		log.Println("Error checking user is in voice channel: " + err.Error())
		return
	}

	// If voice client is not in a channel, join the user's channel
	join, err := joinVoiceChannel(s, i, voiceState)

	// Ready for playing music
	// make Player in Players
	if _, ok := player.Players[i.GuildID]; !ok {
		log.Println("player is gonna to be set")
		player.Players[i.GuildID] = &player.Player{}
		player.Players[i.GuildID].Activate(join)
		log.Println("Player activated")
	}

	var url = (i.ApplicationCommandData().Options[0].Value).(string) // get user input url.
	log.Println("url: ", url)
	go player.Players[i.GuildID].AddSongToQueue(url, i.Member.User.ID)

	err = s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: fmt.Sprintf("Added [song](%s) to queue.", url),
		},
	})
	if err != nil {
		log.Println("Error sending response: " + err.Error())
		return
	}
}

func RegisterTest(session *discordgo.Session, guildId string) {
	log.Println("Registering test command")
	// Register commands
	_, testErr := session.ApplicationCommandCreate(os.Getenv("CLIENT_ID"), guildId, testCommand)
	if testErr != nil {
		log.Fatalln("Error creating testCommand: ", testErr)
	}

	session.AddHandler(
		func(s *discordgo.Session, i *discordgo.InteractionCreate) {
			if i.ApplicationCommandData().Name == testName {
				testHandler(s, i)
				log.Println("test command end!\n\n")
				return
			}
		},
	)
}
