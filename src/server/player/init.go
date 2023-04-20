package player

import (
	"errors"
	"github.com/bwmarrin/discordgo"
	ytdl "github.com/kkdai/youtube/v2"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	"gopkg.in/hraban/opus.v2"
	"log"
	"math/rand"
	"os"
	"sync"
)

// Activate
// run before AddSongToQueue()
func (p *Player) Activate(vc *discordgo.VoiceConnection) {
	// set mutex
	p.AudioMutex = &sync.RWMutex{}
	p.QueueMutex = &sync.RWMutex{}

	p.QueueMutex.Lock()
	defer p.QueueMutex.Unlock()
	p.IsRepeat = false
	p.MusicQueue = make([]*Song, 0)
	p.PlaySignal = make(chan bool)
	p.StopSignal = make(chan string)
	p.VoiceConnection = vc
	p.YoutubeClient = &ytdl.Client{Debug: os.Getenv("DEBUG") == "true"}

	var err error = nil

	opusEncoder, err = opus.NewEncoder(audioFrameRate, audioChannels, opus.AppAudio)
	if err != nil {
		log.Println("An error occurred with initializing the OpusEncoder, error: ", err)
	}

	err = opusEncoder.SetBitrate(audioBitrate)
	if err != nil {
		log.Println("An error occurred with setting the bitrate, error: ", err)
		return
	}

	go func() {
		for {
			select {
			case guildId := <-p.StopSignal:
				log.Println("Got StopSignal")
				Resign(guildId)
				log.Println("Resigned")
				return
			case <-p.PlaySignal:
				log.Println("Got PlaySignal")

				go p._play()
			}
		}
	}()
}

// AddSongToQueue
// Add a song to the MusicQueue.
// Use after Activate().
func (p *Player) AddSongToQueue(url string, applicant string) {
	log.Println("\nAddSongToQueue called")

	p.QueueMutex.Lock()
	log.Println("lock MusicQueue mutex")

	log.Println("before GetVideo in AddSongToQueue")
	base, err := p.YoutubeClient.GetVideo(url)
	if err != nil {
		log.Println("An error occurred with getting the video, error: ", err)
		return
	}

	log.Println("before append song to MusicQueue in AddSongToQueue")
	p.MusicQueue = append(p.MusicQueue, &Song{
		Base:      base,
		Applicant: applicant,
	})
	log.Println("MusicQueue:", p.MusicQueue)

	p.QueueMutex.Unlock()
	log.Println("unlock MusicQueue mutex in AddSongToQueue")

	p.PlaySignal <- true
	log.Println("PlaySignal sent")

	return
}

func (p *Player) ClearQueue() error {
	p.QueueMutex.Lock()
	defer p.QueueMutex.Unlock()
	p.MusicQueue = nil
	return nil
}

func (p *Player) Pause() bool {
	p.IsPaused = true
	return p.IsPaused
}

func (p *Player) Resume() bool {
	p.IsPaused = false
	return p.IsPaused
}

// Skip skipIndex is the number of songs to skip.
// Start from 1.
// If skipIndex is greater than the MusicQueue size, just go to the final song.
func (p *Player) Skip(skipIndex uint, err chan error) {
	if p.MusicQueue == nil || len(p.MusicQueue) == 0 {
		err <- errors.New("nothing in the MusicQueue")
		close(err)
		return
	} else if skipIndex > uint(len(p.MusicQueue)) {
		// just go to final song in current MusicQueue
		p.MusicQueue = p.MusicQueue[len(p.MusicQueue)-1:]
	} else {
		// index start from 1
		p.MusicQueue = p.MusicQueue[skipIndex:]
	}
	p.Break = true
	close(err)
}

// Repeat toggle repeat mode.
func (p *Player) Repeat() bool {
	p.IsRepeat = !p.IsRepeat
	return p.IsRepeat
}

// RemoveAt remove the song at index.
// index range 1 to MusicQueue size.
func (p *Player) RemoveAt(index uint) error {
	p.QueueMutex.Lock()
	defer p.QueueMutex.Unlock()
	if p.MusicQueue == nil {
		return errors.New("nothing in the MusicQueue")
	} else if index > uint(len(p.MusicQueue)) {
		// Just remove the last song in the MusicQueue.
		p.MusicQueue = p.MusicQueue[:len(p.MusicQueue)-1]
		return nil
	} else {
		// index start from 1
		p.MusicQueue = append(p.MusicQueue[:index-1], p.MusicQueue[index:]...)
		return nil
	}
}

// Queue get current MusicQueue.
func (p *Player) Queue() ([]*Song, error) {
	p.QueueMutex.Lock()
	defer p.QueueMutex.Unlock()
	if p.MusicQueue == nil {
		return nil, errors.New("nothing in the MusicQueue")
	} else {
		return p.MusicQueue, nil
	}
}

// NowPlaying get the song that is currently playing.
func (p *Player) NowPlaying() (*Song, error) {
	if p.MusicQueue == nil || len(p.MusicQueue) == 0 {
		return nil, errors.New("nothing in the MusicQueue")
	} else {
		return p.MusicQueue[0], nil
	}
}

// MakeShuffle shuffle the MusicQueue.
func (p *Player) MakeShuffle() error {
	// Just shuffle the MusicQueue.
	p.QueueMutex.Lock()
	defer p.QueueMutex.RUnlock()
	// https://stackoverflow.com/questions/12264789/shuffle-array-in-go
	for i := range p.MusicQueue {
		j := rand.Intn(i + 1)
		p.MusicQueue[i], p.MusicQueue[j] = p.MusicQueue[j], p.MusicQueue[i]
	}
	return nil
}

// Shuffle cannot start from 0 cuz index 0 is the song that is currently playing.
func (p *Player) Shuffle() {
	for i := 1; i < len(p.MusicQueue); i++ {
		j := rand.Intn(i + 1)
		if j != 0 {
			p.MusicQueue[i], p.MusicQueue[j] = p.MusicQueue[j], p.MusicQueue[i]
		}
	}
}

func Resign(guildID string) {
	err := Players[guildID].VoiceConnection.Disconnect()
	if err != nil {
		log.Println("An error occured with disconnecting the voice connection, error: ", err)
		return
	}

	// delete (set nil) in every variable in the struct.
	for _, key := range Players[guildID].CredentialKey {
		delete(discord.SessionCredentials, key)
	}
	Players[guildID].VoiceConnection = nil
	Players[guildID].AudioMutex = nil
	Players[guildID].QueueMutex = nil
	Players[guildID].PlaySignal = nil
	Players[guildID].StopSignal = nil
	Players[guildID].YoutubeClient = nil
	Players[guildID].MusicQueue = nil

	Players[guildID] = nil

	delete(Players, guildID)
}
