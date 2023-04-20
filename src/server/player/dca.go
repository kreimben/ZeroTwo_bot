package player

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"gopkg.in/hraban/opus.v2"
	"io"
	"log"
	"os/exec"
	"time"
)

var (
	// AudioChannels sets the ops encoder channel value.
	// Must be set to 1 for mono, 2 for stereo
	audioChannels = 2

	// AudioFrameRate sets the opus encoder Frame Rate value.
	// Must be one of 8000, 12000, 16000, 24000, or 48000.
	// Discord only uses 48000 currently.
	audioFrameRate = 48000

	// AudioBitrate sets the opus encoder bitrate (quality) value.
	// Must be within 500 to 512000 bits per second are meaningful.
	// Discord only uses 8000 to 128000 and default is 64000.
	audioBitrate = 96000

	// AudioFrameSize sets the opus encoder frame size value.
	// The Frame Size is the length or amount of milliseconds each Opus frame
	// will be.
	// Must be one of 960 (20ms), 1920 (40ms), or 2880 (60ms)
	audioFrameSize = 960

	// maxBytes is a calculated value of the largest possible size that an
	// opus frame could be.
	originalMaxBytes = audioFrameSize * audioChannels

	// opusEncoder holds an instance of a gopus Encoder
	opusEncoder *opus.Encoder
)

// _play reads from the converted opus file, then sends it to the voice connection
// get only id of video. not search keyword or anything else.
func (p *Player) _play() {
	if p.IsPlaying {
		return
	} else {
		p.IsPlaying = true
	}

	for p.MusicQueue != nil && len(p.MusicQueue) > 0 {
		videoId := p.MusicQueue[0].Base.ID
		decoder := bytes.NewBuffer(nil)

		// Create the FFmpeg command
		ytCmd := exec.Command(
			"yt-dlp",
			"-f", "bestaudio",
			"-x",
			"--audio-format", "opus",
			"--default-search", "auto",
			fmt.Sprintf("https://www.youtube.com/watch?v=%s", videoId),
			"-o", "-",
		)
		ffmpegCmd := exec.Command(
			"ffmpeg",
			"-hide_banner",
			//"-loglevel", "debug",
			"-i", "pipe:0",
			"-f", "s16le",
			"-acodec", "pcm_s16le",
			"-ar", fmt.Sprintf("%d", audioFrameRate),
			"-ac", "2",
			"-b:a", "96k",
			"-reconnect", "1",
			"-reconnect_streamed", "1",
			"-reconnect_at_eof", "1",
			"-reconnect_streamed", "1",
			"-reconnect_delay_max", "5",
			"pipe:1",
		)

		ytOutput, err := ytCmd.StdoutPipe()
		if err != nil {
			log.Println("Error creating stdout pipe for yt-dlp command:", err)
			return
		}
		defer ytOutput.Close()

		ffmpegCmd.Stdin = ytOutput
		ffmpegCmd.Stdout = decoder

		err = ffmpegCmd.Start()
		if err != nil {
			log.Println("Error starting ffmpeg command:", err)
			return
		}

		err = ytCmd.Run()
		if err != nil {
			log.Println("Error running yt-dlp command:", err)
			return
		}

		err = ffmpegCmd.Wait()
		if err != nil {
			log.Println("Error waiting for ffmpeg command:", err)
			return
		}

		time.Sleep(time.Second)

		defer func(ff *exec.Cmd) {
			for ff.Process == nil {
				err := ff.Process.Kill()
				if err != nil {
					log.Println("Error killing ffmpeg process: ", err)
					return
				}
			}
		}(ffmpegCmd)

		for p.VoiceConnection != nil {
			for p.IsPaused {
				continue
			}
			if p.Break {
				p.Break = false
				break
			}
			buf := make([]int16, originalMaxBytes)

			err := binary.Read(decoder, binary.LittleEndian, &buf)
			if err == io.EOF || err == io.ErrUnexpectedEOF {
				p.afterEOF(err)
				break
			} else if err != nil {
				log.Println("Error reading from buffer:", err)
				break
			}

			o := make([]byte, originalMaxBytes)

			num, err := opusEncoder.Encode(buf, o)
			if err == nil && num > 0 {
				p.CurrentTime += 20
				p.VoiceConnection.OpusSend <- o[:num]
			} else {
				break
			}
		}
	}
}

func (p *Player) afterEOF(err error) {
	// Okay! There's nothing left, time to quit.
	log.Println("song is end: ", err)

	// if not repeat mode, remove song from MusicQueue
	if len(p.MusicQueue) > 0 && !p.IsRepeat {
		p.MusicQueue = p.MusicQueue[1:]
		p.CurrentTime = 0
		log.Println("Removed played song from MusicQueue")
	}

	// print MusicQueue
	log.Println("MusicQueue in after EOF: ", p.MusicQueue)

	if len(p.MusicQueue) == 0 {
		p.StopSignal <- p.VoiceConnection.GuildID
		log.Println("Sent stop signal")
	}
}
