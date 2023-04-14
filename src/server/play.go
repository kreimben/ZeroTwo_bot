package server

import (
	"context"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (p *playerServer) Search(_ context.Context, req *gen.SearchRequest) (*gen.SearchResponse, error) {
	//results, err := ytSearch.Q(req.GetKeyword()).MaxResults(int64(req.GetAmount())).Do()
	//if err != nil {
	//	GRPCLogger.Println("Error making search API call: %v", err)
	//	return nil, err
	//}
	//
	arr := make([]*gen.VideoInfo, 0)
	//for _, item := range results.Items {
	//	log.Println(item.Snippet.Title)
	//
	//	// to get a duration of videos.
	//	videoCall := ytService.Videos.List([]string{"contentDetails"}).Id(item.Id.VideoId)
	//	videoResponse, err := videoCall.Do()
	//	if err != nil {
	//		log.Fatalf("Error making video API call: %v", err)
	//	}
	//
	//	arr = append(arr, &gen.VideoInfo{
	//		Title:        item.Snippet.Title,
	//		Url:          string("https://youtube.com/watch&v=" + item.Id.VideoId),
	//		ThumbnailUrl: item.Snippet.Thumbnails.High.Url,
	//		Duration:     &duration.Duration{Seconds: int64(parseDuration(videoResponse.Items[0].ContentDetails.Duration))},
	//	})
	//}

	return &gen.SearchResponse{VideoInfo: arr}, nil
}

func (p *playerServer) Play(_ context.Context, req *gen.PlayRequest) (*gen.PlayResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Play not implemented")
}
