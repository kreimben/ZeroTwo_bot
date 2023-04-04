package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/kreimben/ZeroTwo_bot/src/db"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	"github.com/kreimben/ZeroTwo_bot/src/server"
	"os"
	"os/signal"
)

func main() {
	// Setting for dotenv
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	db.DbInit()
	discord.DiscordInit()
	server.BackendServerInit()

	// Run until code is terminated
	// Do not put any code after this
	fmt.Println("Server is running...")
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, os.Kill)
	<-stop
}
