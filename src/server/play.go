package server

import (
	"context"
	"github.com/golang/protobuf/ptypes/duration"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"github.com/kreimben/ZeroTwo_bot/src/server/player"
	"github.com/kreimben/youtube-info-extractor/video"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"log"
)

func (p *playerServer) Search(_ context.Context, req *gen.SearchRequest) (*gen.SearchResponse, error) {
	videoCh := make(chan *video.Video)

	if req.GetKeyword() != "" {
		go video.SearchOneVideoKeyword(req.GetKeyword(), videoCh)
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
	} else if req.GetUrl() != "" {
		go video.SearchOneVideoUrl(req.GetUrl(), videoCh)
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

	go player.Players[state.GuildID].AddSongToQueue(req.GetPlayUrl(), req.GetUserId())
	return &gen.PlayResponse{Message: "Added to play queue."}, nil
}
