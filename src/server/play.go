package server

import (
	"context"
	"github.com/golang/protobuf/ptypes/duration"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"github.com/kreimben/ZeroTwo_bot/src/server/player"
	ytex "github.com/kreimben/youtube-info-extractor"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"log"
)

func (p *playerServer) Search(_ context.Context, req *gen.SearchRequest) (*gen.SearchResponse, error) {
	if req.GetAmount() <= 0 || req.GetAmount() > 10 {
		return nil, status.Errorf(codes.InvalidArgument, "You can only search 1 to 10 videos")
	}

	videoCh := make(chan *ytex.Video)

	if req.GetKeyword() != "" {
		go ytex.SearchVideoKeyword(req.GetKeyword(), int(req.GetAmount()), videoCh)
		var arr []*gen.VideoInfo
		for i := 0; i < int(req.GetAmount()); i++ {
			if v, ok := <-videoCh; ok {
				arr = append(arr, &gen.VideoInfo{
					Title:        v.Title,
					Url:          string("https://youtube.com/watch?v=" + v.Id),
					ThumbnailUrl: v.ThumbnailUrl,
					Duration:     &duration.Duration{Seconds: int64(v.Duration)},
				})
			} else { // that means not ok.
				return nil, status.Errorf(codes.NotFound, "no video found")
			}
		}
		return &gen.SearchResponse{VideoInfo: arr}, nil
	} else if req.GetUrl() != "" {
		go ytex.SearchOneVideoUrl(req.GetUrl(), videoCh)
		if v, ok := <-videoCh; ok {
			var arr []*gen.VideoInfo
			arr = append(arr, &gen.VideoInfo{
				Title:        v.Title,
				Url:          string("https://youtube.com/watch?v=" + v.Id),
				ThumbnailUrl: v.ThumbnailUrl,
				Duration:     &duration.Duration{Seconds: int64(v.Duration)},
			})
			return &gen.SearchResponse{VideoInfo: arr}, nil
		} else { // that means not ok.
			return nil, status.Errorf(codes.NotFound, "no video found")
		}
	}

	return nil, status.Errorf(codes.InvalidArgument, "no keyword or url")
}

func (p *playerServer) Play(_ context.Context, req *gen.PlayRequest) (*gen.PlayResponse, error) {
	// Before start command, check parameters.
	if req.GetGuildId() == "" || req.GetUserId() == "" || req.GetPlayUrl() == "" {
		return nil, status.Errorf(codes.InvalidArgument, "Please check the parameters.")
	}

	// first, check if discordgo session is in the map.
	// if not in the map, return error.
	if _, ok := discord.SessionCredentials[string(req.GetGuildId()+"-"+req.GetUserId())]; !ok {
		return nil, status.Errorf(codes.Unavailable, "Please hit the command `/hey` first.")
	}

	// Second, check user is in the voice channel.
	session := discord.SessionCredentials[string(req.GetGuildId()+"-"+req.GetUserId())]
	state, err := session.State.VoiceState(req.GetGuildId(), req.GetUserId())
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "Please join the voice channel first.")
	}

	// Third, join the voice channel.
	join, err := session.ChannelVoiceJoin(state.GuildID, state.ChannelID, false, false)
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "I can't join the voice channel in some unknown reason.")
	}

	// Fourth, play the music.
	if _, ok := player.Players[state.GuildID]; !ok {
		log.Println("player is gonna to be set")
		player.Players[state.GuildID] = &player.Player{
			CredentialKey: []string{string(state.GuildID + "-" + state.UserID)},
			IsPaused:      false,
			IsPlaying:     false,
			Break:         false,
			CurrentTime:   0,
		}
		player.Players[state.GuildID].Activate(join)
		log.Println("Player activated")
	} else {
		player.Players[state.GuildID].CredentialKey = append(player.Players[state.GuildID].CredentialKey, string(state.GuildID+"-"+state.UserID))
	}

	// to get username with user id.
	user, err := session.User(req.GetUserId())
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "I can't get user name.")
	}

	go player.Players[state.GuildID].AddSongToQueue(req.GetPlayUrl(), user.Username)
	return &gen.PlayResponse{Message: "Added to play queue."}, nil
}

func (p *playerServer) Pause(_ context.Context, req *gen.PauseRequest) (*gen.PauseResponse, error) {
	// just assume guild id and user id is valid.
	playerObj, ok := player.Players[req.GetGuildId()]
	if !ok {
		return nil, status.Errorf(codes.Unavailable, "Player is not initialized.")
	}
	return &gen.PauseResponse{IsRepeat: playerObj.Pause()}, nil
}
func (p *playerServer) Resume(_ context.Context, req *gen.ResumeRequest) (*gen.ResumeResponse, error) {
	// just assume guild id and user id is valid.
	playerObj, ok := player.Players[req.GetGuildId()]
	if !ok {
		return nil, status.Errorf(codes.Unavailable, "Player is not initialized.")
	}
	return &gen.ResumeResponse{IsRepeat: playerObj.Resume()}, nil
}

func (p *playerServer) Stop(_ context.Context, req *gen.StopRequest) (*gen.StopResponse, error) {
	// get a session from guild id and user id.
	// if not exist, return error.
	session, ok := discord.SessionCredentials[string(req.GetGuildId()+"-"+req.GetUserId())]
	if !ok {
		return nil, status.Errorf(codes.Unavailable, "Session is not initialized.")
	}

	// get a voice state from guild id and user id.
	// if not exist, return error.
	state, err := session.State.VoiceState(req.GetGuildId(), req.GetUserId())
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "Voice state is not initialized.")
	}

	// leave the voice channel.
	if err := session.ChannelVoiceJoinManual(state.GuildID, "", false, false); err != nil {
		return nil, status.Errorf(codes.Internal, "I can't leave the voice channel in some unknown reason.")
	}

	// get player object.
	playerObj, ok := player.Players[req.GetGuildId()]
	if !ok {
		return nil, status.Errorf(codes.Unavailable, "Player is not initialized.")
	}
	playerObj.QueueEvent <- "Stop"

	// finally resign.
	err = player.Resign(req.GetGuildId())
	if err != nil {
		return nil, err
	}
	return &gen.StopResponse{}, nil
}
