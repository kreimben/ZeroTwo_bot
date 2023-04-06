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

type Player struct {
	queueMutex      *sync.RWMutex
	audioMutex      *sync.RWMutex
	queue           []*Song
	isRepeat        bool
	playSignal      chan bool   // use when need to play next song.
	stopSignal      chan string // use when need to stop player. value is guild id.
	voiceConnection *discordgo.VoiceConnection
	youtubeClient   *ytdl.Client
}

type Song struct {
	Applicant string
	Base      *ytdl.Video
}

var Players = make(map[string]*Player)
