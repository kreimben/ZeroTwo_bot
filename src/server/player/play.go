package player

import (
	"errors"
	"github.com/bwmarrin/discordgo"
	ytdl "github.com/kkdai/youtube/v2"
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
	p.audioMutex = &sync.RWMutex{}
	p.queueMutex = &sync.RWMutex{}

	p.queueMutex.Lock()
	defer p.queueMutex.Unlock()
	p.isRepeat = false
	p.queue = make([]*Song, 0)
	p.playSignal = make(chan bool)
	p.stopSignal = make(chan string)
	p.voiceConnection = vc
	p.youtubeClient = &ytdl.Client{Debug: os.Getenv("DEBUG") == "true"}

	var err error = nil

	opusEncoder, err = opus.NewEncoder(audioFrameRate, audioChannels, opus.AppAudio)
	if err != nil {
		log.Println("An error occured with initializing the OpusEncoder, error: ", err)
	}

	err = opusEncoder.SetBitrate(audioBitrate)
	if err != nil {
		log.Println("An error occured with setting the bitrate, error: ", err)
		return
	}

	go func() {
		for {
			select {
			case guildId := <-p.stopSignal:
				log.Println("Got stopSignal")
				Resign(guildId)
				log.Println("Resigned")
				return
			case <-p.playSignal:
				log.Println("Got playSignal")

				p.audioMutex.Lock()
				log.Println("lock audioMutex")

				// skip to 1st song in queue
				p.queueMutex.Lock()
				log.Println("lock queueMutex in main loop")

				go p.Play()

				p.queueMutex.Unlock()
				log.Println("unlock queueMutex in main loop")
			}
		}
	}()
}

// AddSongToQueue
// Add a song to the queue.
// Use after Activate().
func (p *Player) AddSongToQueue(url string, applicant string) {
	log.Println("\nAddSongToQueue called")

	p.queueMutex.Lock()
	log.Println("lock queue mutex")

	log.Println("before GetVideo in AddSongToQueue")
	base, err := p.youtubeClient.GetVideo(url)
	if err != nil {
		log.Println("An error occurred with getting the video, error: ", err)
		return
	}

	log.Println("before append song to queue in AddSongToQueue")
	p.queue = append(p.queue, &Song{
		Base:      base,
		Applicant: applicant,
	})
	log.Println("queue:", p.queue)

	p.queueMutex.Unlock()
	log.Println("unlock queue mutex in AddSongToQueue")

	p.playSignal <- true
	log.Println("playSignal sent")

	return
}

func (p *Player) ClearQueue() error {
	p.queueMutex.Lock()
	defer p.queueMutex.Unlock()
	p.queue = nil
	return nil
}

func (p *Player) Pause() error {
	p.audioMutex.Lock()
	return nil
}

func (p *Player) Resume() error {
	p.audioMutex.Unlock()
	return nil
}

// Skip skipIndex is the number of songs to skip.
// Start from 1.
// If skipIndex is greater than the queue size, just go to the final song.
func (p *Player) Skip(skipIndex uint) error {
	p.queueMutex.Lock()
	defer p.queueMutex.Unlock()
	if p.queue == nil || len(p.queue) == 0 {
		return errors.New("nothing in the queue")
	} else if skipIndex > uint(len(p.queue)) {
		// just go to final song in current queue
		p.queue = p.queue[len(p.queue)-1:]
		return nil
	} else {
		// index start from 1
		p.queue = p.queue[skipIndex:]
		return nil
	}
}

// Repeat toggle repeat mode.
func (p *Player) Repeat() bool {
	p.isRepeat = !p.isRepeat
	return p.isRepeat
}

// RemoveAt remove the song at index.
// index range 1 to queue size.
func (p *Player) RemoveAt(index uint) error {
	p.queueMutex.Lock()
	defer p.queueMutex.Unlock()
	if p.queue == nil {
		return errors.New("nothing in the queue")
	} else if index > uint(len(p.queue)) {
		// Just remove the last song in the queue.
		p.queue = p.queue[:len(p.queue)-1]
		return nil
	} else {
		// index start from 1
		p.queue = append(p.queue[:index-1], p.queue[index:]...)
		return nil
	}
}

// Queue get current queue.
func (p *Player) Queue() ([]*Song, error) {
	p.queueMutex.Lock()
	defer p.queueMutex.Unlock()
	if p.queue == nil {
		return nil, errors.New("nothing in the queue")
	} else {
		return p.queue, nil
	}
}

// NowPlaying get the song that is currently playing.
func (p *Player) NowPlaying() (*Song, error) {
	if p.queue == nil || len(p.queue) == 0 {
		return nil, errors.New("nothing in the queue")
	} else {
		return p.queue[0], nil
	}
}

// MakeShuffle shuffle the queue.
func (p *Player) MakeShuffle() error {
	// Just shuffle the queue.
	p.queueMutex.Lock()
	defer p.queueMutex.RUnlock()
	// https://stackoverflow.com/questions/12264789/shuffle-array-in-go
	for i := range p.queue {
		j := rand.Intn(i + 1)
		p.queue[i], p.queue[j] = p.queue[j], p.queue[i]
	}
	return nil
}

func Resign(guildID string) {
	err := Players[guildID].voiceConnection.Disconnect()
	if err != nil {
		log.Println("An error occured with disconnecting the voice connection, error: ", err)
		return
	}

	// delete (set nil) in every variable in the struct.
	Players[guildID].voiceConnection = nil
	Players[guildID].audioMutex = nil
	Players[guildID].queueMutex = nil
	Players[guildID].playSignal = nil
	Players[guildID].stopSignal = nil
	Players[guildID].youtubeClient = nil
	Players[guildID].queue = nil
	Players[guildID].isRepeat = false

	Players[guildID] = nil

	delete(Players, guildID)
}
