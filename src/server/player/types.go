package player

import (
	"github.com/bwmarrin/discordgo"
	ytdl "github.com/kkdai/youtube/v2"
	"sync"
)

type Playable interface {
	AddSongToQueue(song *Song) error
	ClearQueue() error
	Skip(skipIndex uint) error
	Queue() ([]*Song, error)
	NowPlaying() (*Song, error)
	MakeShuffle() error
	RemoveAt(index uint) error
	Pause() error
	Resume() error
	Resign()
}

// Player
// One player per guild.
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
}

type Song struct {
	Applicant string
	Base      *ytdl.Video
}

var Players = make(map[string]*Player)
