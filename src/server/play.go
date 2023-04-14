package server

import (
	"context"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (p *playerServer) Search(_ context.Context, req *gen.SearchRequest) (*gen.SearchResponse, error) {
	//arr := make([]*gen.VideoInfo, len(results.Items))
	//for _, item := range results.Items {
	//	arr = append(arr, &gen.VideoInfo{
	//		Title:        item.Title,
	//		Url:          string("https://youtube.com/watch&v=" + item.ID),
	//		ThumbnailUrl: item.Thumbnail,
	//		Duration:     &duration.Duration{Seconds: int64(item.LengthSeconds)},
	//	})
	//}

	return &gen.SearchResponse{VideoInfo: arr}, nil
}

func (p *playerServer) Play(_ context.Context, req *gen.PlayRequest) (*gen.PlayResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Play not implemented")
}
