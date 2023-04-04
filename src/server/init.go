package server

import (
	"flag"
	"fmt"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"google.golang.org/grpc"
	"log"
	"net"
	"net/http"
	"os"
)

var GRPCLogger = log.New(os.Stdout, "[gRPC] ", log.LstdFlags)
var (
	grpcPort *int
	httpPort *int
)

func init() {
	grpcPort = flag.Int("grpcPort", 5011, "The server grpcPort")
	httpPort = flag.Int("httpPort", 5010, "The server httpPort")
	flag.Parse()
}

func BackendServerInit() {
	go httpServer()
	go gRPCServer()
}

func httpServer() {
	http.HandleFunc("/discord/callback", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Callback")
		code := r.URL.Query().Get("code")
		log.Println("Discord OAuth2 Code:", code)
		_, err := w.Write([]byte("{\"code\": \"" + code + "\"}"))
		if err != nil {
			log.Println("Error:", err)
		}
	})
	err := http.ListenAndServe(fmt.Sprintf(":%d", *httpPort), nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
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
	if err := server.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
