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
var port *int

func init() {
	port = flag.Int("port", 50051, "The server port")
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
		_, err := w.Write([]byte("Success!\ncode: " + code))
		if err != nil {
			log.Println("Error:", err)
		}
	})
	err := http.ListenAndServe(":50050", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
	log.Println("Callback Server is running...")
}

func gRPCServer() {
	// gRPC Server start
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	GRPCLogger.Println("gRPC Server is running on port:", fmt.Sprintf("%d", *port))
	server := grpc.NewServer()
	gen.RegisterDiscordServer(server, &discordServer{})
	if err := server.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
