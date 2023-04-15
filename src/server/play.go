package server

import (
	"context"
	"github.com/golang/protobuf/ptypes/duration"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"github.com/kreimben/youtube-info-extractor/video"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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
	return nil, status.Errorf(codes.Unimplemented, "method Play not implemented")
}
