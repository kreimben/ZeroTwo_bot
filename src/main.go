package main

import (
	"flag"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/kreimben/ZeroTwo_bot/src/db"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	"github.com/kreimben/ZeroTwo_bot/src/server"
	"log"
	"os"
	"os/signal"
)

var (
	runDb      *bool
	runDiscord *bool
	runServer  *bool
)

func main() {
	// check program args
	runDb = flag.Bool("db", true, "Run database")
	runDiscord = flag.Bool("discord", true, "Run discord bot")
	runServer = flag.Bool("server", true, "Run backend server")

	// Setting for dotenv
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	flag.Parse()

	if *runDb {
		db.DbInit()
	}
	if *runDiscord {
		discord.DiscordInit()
	}
	if *runServer {
		server.BackendServerInit()
	}

	// Run until code is terminated
	// Do not put any code after this
	fmt.Println("main() is running...")
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, os.Kill)
	<-stop
}
