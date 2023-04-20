package player

import (
	"github.com/bwmarrin/discordgo"
	ytdl "github.com/kkdai/youtube/v2"
	"sync"
)

// Player One player per guild.
type Player struct {
	QueueMutex      *sync.RWMutex
	AudioMutex      *sync.RWMutex
	MusicQueue      []*Song
	IsRepeat        bool
	PlaySignal      chan bool   // use when need to play next song.
	StopSignal      chan string // use when need to stop player. value is guild id.
	VoiceConnection *discordgo.VoiceConnection
	YoutubeClient   *ytdl.Client
	CredentialKey   []string // ["{guild_id}-{user_id}"]
	IsPaused        bool
	IsPlaying       bool   // indicates only if the player is playing now.
	Break           bool   // just for skipping.
	CurrentTime     uint32 // current playing time of the song in `milliseconds`.
}

type Song struct {
	Applicant string
	Base      *ytdl.Video
}

var Players = make(map[string]*Player)
