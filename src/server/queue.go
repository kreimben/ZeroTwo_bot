package server

import (
	"context"
	"errors"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"github.com/kreimben/ZeroTwo_bot/src/server/player"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"log"
)

func getSongs(songs []*player.Song) []*gen.Song {
	genSongs := make([]*gen.Song, 0)
	for index, song := range songs {
		genSongs = append(genSongs, &gen.Song{
			Applicant:    song.Applicant,
			Title:        song.Base.Title,
			Url:          "https://youtube.com/watch?v=" + song.Base.ID,
			Duration:     uint32(song.Base.Duration.Seconds()),
			ThumbnailUrl: song.Base.Thumbnails[0].URL,
			Position:     uint32(index),
		})
	}

	return genSongs
}

func getQueueFromPosition(queue []*player.Song, order []uint32) ([]*player.Song, error) {
	used := make([]bool, len(order))

	for i := range order {
		if used[i] {
			return nil, errors.New("invalid order")
		} else {
			used[i] = true
		}
	}

	res := make([]*player.Song, len(queue))
	for i := range queue {
		res[i] = queue[order[i]]
	}
	return res, nil
}

func (q *queueServer) CurrentQueue(_ context.Context, req *gen.CurrentQueueRequest) (*gen.CurrentQueueResponse, error) {
	p, ok := player.Players[req.GuildId]
	if !ok {
		return nil, status.Errorf(codes.NotFound, "You have to check guild id.")
	}

	songs := getSongs(p.MusicQueue)

	return &gen.CurrentQueueResponse{
		Songs:       songs[1:],
		CurrentSong: songs[0],
		Length:      uint32(len(songs)),
	}, nil
}

func (q *queueServer) RemoveSong(_ context.Context, req *gen.RemoveSongRequest) (*gen.RemoveSongResponse, error) {
	p, ok := player.Players[req.GuildId]
	if !ok {
		return nil, status.Errorf(codes.NotFound, "You have to check guild id.")
	}

	if req.GetSongIndex() >= uint32(len(p.MusicQueue)) || req.GetSongIndex() == 0 {
		return nil, status.Errorf(codes.OutOfRange, "You have to check index.")
	}
	p.MusicQueue = append(p.MusicQueue[:req.GetSongIndex()], p.MusicQueue[req.GetSongIndex()+1:]...)

	return &gen.RemoveSongResponse{
		Success: true, // just for assurance.
	}, nil
}

func (q *queueServer) SkipSong(_ context.Context, req *gen.SkipSongRequest) (*gen.SkipSongResponse, error) {
	log.Println("SkipSong called")
	p, ok := player.Players[req.GuildId]
	if !ok {
		return nil, status.Errorf(codes.NotFound, "You have to check guild id.")
	}
	if len(p.MusicQueue)-1 < int(req.GetSongIndex()) || req.GetSongIndex() == 0 {
		return nil, status.Errorf(codes.OutOfRange, "You have to check index.")
	}

	err := make(chan error)
	go p.Skip(uint(req.GetSongIndex()), err)
	if err, ok := <-err; ok {
		return nil, status.Errorf(codes.Internal, "An error occurred with skipping song, error: %v", err)
	} else {
		return &gen.SkipSongResponse{
			Success: true, // just for assurance.
		}, nil
	}
}

func (q *queueServer) RepeatSong(_ context.Context, req *gen.RepeatSongRequest) (*gen.RepeatSongResponse, error) {
	p, ok := player.Players[req.GetGuildId()]
	if !ok {
		return nil, status.Errorf(codes.NotFound, "You have to check guild id.")
	}
	p.IsRepeat = !p.IsRepeat
	return &gen.RepeatSongResponse{Result: p.IsRepeat}, nil
}

func (q *queueServer) ShuffleQueue(_ context.Context, req *gen.ShuffleQueueRequest) (*gen.ShuffleQueueResponse, error) {
	p, ok := player.Players[req.GetGuildId()]
	if !ok {
		return nil, status.Errorf(codes.NotFound, "You have to check guild id.")
	}
	p.Shuffle()
	return &gen.ShuffleQueueResponse{Songs: getSongs(p.MusicQueue)[1:]}, nil
}

func (q *queueServer) ChangeSongPosition(_ context.Context, req *gen.ChangeSongPositionRequest) (*gen.ChangeSongPositionResponse, error) {
	p, ok := player.Players[req.GetGuildId()]
	if !ok {
		return nil, status.Errorf(codes.NotFound, "You have to check guild id.")
	}
	queue, err := getQueueFromPosition(p.MusicQueue, req.GetSongPositions())
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "You have to check song positions.")
	} else {
		p.MusicQueue = queue
		return &gen.ChangeSongPositionResponse{Songs: getSongs(p.MusicQueue)}, nil
	}
}
