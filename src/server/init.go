package server

import (
	"flag"
	"fmt"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"google.golang.org/grpc"
	"log"
	"net"
	"os"
)

var GRPCLogger = log.New(os.Stdout, "[gRPC] ", log.LstdFlags)
var (
	grpcPort *int
)

func init() {
	grpcPort = flag.Int("grpcPort", 5011, "The server grpcPort")
}

func BackendServerInit() {
	go gRPCServer()
}
func gRPCServer() {
	// gRPC Server start
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *grpcPort))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	GRPCLogger.Println("gRPC Server is running on grpcPort:", fmt.Sprintf("%d", *grpcPort))
	server := grpc.NewServer()
	gen.RegisterDiscordServer(server, &discordServer{})
	gen.RegisterPlayServiceServer(server, &playerServer{})
	gen.RegisterVoiceChannelServiceServer(server, &voiceChannelServer{})
	gen.RegisterQueueServiceServer(server, &queueServer{})
	if err := server.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
