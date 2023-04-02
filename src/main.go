package main

import (
	"github.com/joho/godotenv"
	"github.com/kreimben/ZeroTwo_bot/src/db"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
)

func main() {
	// Setting for dotenv
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	db.DbInit()
	discord.DiscordInit()
}
