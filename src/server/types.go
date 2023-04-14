package server

import gen "github.com/kreimben/ZeroTwo_bot/src/gen"

type discordServer struct {
	gen.UnimplementedDiscordServer
}

type DiscordAccessTokenResponseWrapper struct {
	gen.DiscordAccessTokenResponse
}

type discordAccessToken struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int    `json:"expires_in"`
	Scope        string `json:"scope"`
}

type discordError struct {
	Error            string `json:"error"`
	ErrorDescription string `json:"error_description"`
}

type discordUserInfo struct {
	Id            string `json:"id"`
	Username      string `json:"username"`
	Avatar        string `json:"avatar"`
	Discriminator string `json:"discriminator"`
}

type playerServer struct {
	gen.UnimplementedPlayerServer
}
