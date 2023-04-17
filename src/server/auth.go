package server

import (
	"context"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"net/http"
	"net/url"
	"os"
	"strings"
)

func (s *discordServer) LoginWithDiscord(_ context.Context, req *gen.LoginWithDiscordRequest) (*gen.LoginWithDiscordResponse, error) {
	GRPCLogger.Println("LoginWithDiscord: " + req.String())
	discordUrl, _ := url.Parse("https://discord.com/api/v10/oauth2/token")

	// Ready for POST request (body but not json)
	values := url.Values{}
	values.Set("client_id", os.Getenv("CLIENT_ID"))
	values.Set("client_secret", os.Getenv("CLIENT_SECRET"))
	values.Set("grant_type", "authorization_code")
	values.Set("code", req.Code)
	values.Set("redirect_uri", req.RedirectUri)

	// Send POST request.
	res, err := http.Post(discordUrl.String(),
		"application/x-www-form-urlencoded",
		strings.NewReader(values.Encode()))
	if err != nil {
		return nil, err
	}

	return getAccessTokenOrError(res.Body)
}

func (s *discordServer) GetOAuthUrl(_ context.Context, req *gen.GetOAuthUrlRequest) (*gen.GetOAuthUrlResponse, error) {
	GRPCLogger.Println("GetOAuthUrl")
	discordUrl := "https://discord.com/api/oauth2/authorize" +
		"?" +
		"response_type=code" +
		"&client_id=" + os.Getenv("CLIENT_ID") +
		"&redirect_uri=" + req.RedirectUri +
		"&response_type=code" +
		"&scope=identify%20guilds"

	return &gen.GetOAuthUrlResponse{
		Url: discordUrl,
	}, nil
}
func (s *discordServer) RefreshAccessToken(_ context.Context, req *gen.RefreshAccessTokenRequest) (*gen.LoginWithDiscordResponse, error) {
	/*
		Couldn't finish this function because Discord API is something weird.
	*/

	GRPCLogger.Println("RefreshAccessToken: " + req.String())
	discordUrl, _ := url.Parse("https://discord.com/api/v10/oauth2/token")

	// as same as LoginWithDiscord
	values := url.Values{}
	values.Set("client_id", os.Getenv("CLIENT_ID"))
	values.Set("client_secret", os.Getenv("CLIENT_SECRET"))
	values.Set("grant_type", "refresh_token")
	values.Set("refresh_token", req.RefreshToken)

	// Send POST request.
	res, err := http.Post(discordUrl.String(),
		"application/x-www-form-urlencoded",
		strings.NewReader(values.Encode()))
	if err != nil {
		return nil, err
	}

	return getAccessTokenOrError(res.Body)
}

func (s *discordServer) GetMyInfo(_ context.Context, req *gen.GetMyInfoRequest) (*gen.GetMyInfoResponse, error) {
	GRPCLogger.Println("GetMyInfo: access token: " + req.String())
	discordUrl, _ := url.Parse("https://discord.com/api/v10/users/@me")

	// Send GET request.
	// Get with header (bearer token)
	client := &http.Client{}
	r, err := http.NewRequest("GET", discordUrl.String(), nil)
	if err != nil {
		return nil, err
	}
	r.Header.Set("Authorization", "Bearer "+req.AccessToken)

	do, err := client.Do(r)
	if err != nil {
		return nil, err
	}

	return getUserInfoOrError(do.Body)
}

func (s *discordServer) ValidateGuildId(_ context.Context, req *gen.ValidateGuildIdRequest) (*gen.ValidateGuildIdResponse, error) {
	// validate guild id.
	GRPCLogger.Println("ValidateGuildId: " + req.String())
	guild, err := discord.DiscordSession.Guild(req.GuildId)
	if err != nil {
		return nil, err
	} else {
		return &gen.ValidateGuildIdResponse{
			GuildInfo: &gen.DiscordGuild{
				GuildId:   guild.ID,
				GuildName: guild.Name,
				Icon:      guild.Icon,
			},
		}, nil
	}
}
func (s *discordServer) ValidateUserId(_ context.Context, req *gen.ValidateUserIdRequest) (*gen.ValidateUserIdResponse, error) {
	// validate user is in guild.
	GRPCLogger.Println("ValidateUserId: " + req.String())
	GRPCLogger.Println("guild id: " + req.GuildId)
	_, err := discord.DiscordSession.GuildMember(req.GuildId, req.UserId)
	if err != nil {
		return nil, err
	} else {
		return &gen.ValidateUserIdResponse{
			IsValid: true,
		}, nil
	}
}
