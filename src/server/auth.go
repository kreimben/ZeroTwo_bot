package server

import (
	"context"
	"encoding/json"
	"errors"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"google.golang.org/protobuf/types/known/emptypb"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
)

func (s *discordServer) mustEmbedUnimplementedDiscordServer() {
	return
}

func (s *discordServer) LoginWithDiscord(_ context.Context, in *gen.LoginWithDiscordRequest) (*gen.LoginWithDiscordResponse, error) {
	GRPCLogger.Println("LoginWithDiscord: " + in.String())
	discordUrl, _ := url.Parse("https://discord.com/api/v10/oauth2/token")

	// Ready for POST request (body but not json)
	values := url.Values{}
	values.Set("client_id", os.Getenv("CLIENT_ID"))
	values.Set("client_secret", os.Getenv("CLIENT_SECRET"))
	values.Set("grant_type", "authorization_code")
	values.Set("code", in.Code)
	values.Set("redirect_uri", os.Getenv("AUTH_CALLBACK_URL"))

	// Send POST request.
	res, err := http.Post(discordUrl.String(),
		"application/x-www-form-urlencoded",
		strings.NewReader(values.Encode()))
	if err != nil {
		return nil, err
	}

	return convertBodyToJSON(res.Body)
}

func (s *discordServer) GetOAuthUrl(context.Context, *emptypb.Empty) (*gen.GetOAuthUrlResponse, error) {
	GRPCLogger.Println("GetOAuthUrl")
	discordUrl := "https://discord.com/api/oauth2/authorize" +
		"?" +
		"response_type=code" +
		"&client_id=" + os.Getenv("CLIENT_ID") +
		"&redirect_uri=" + os.Getenv("AUTH_CALLBACK_URL") +
		"&response_type=code" +
		"&scope=identify%20guilds.join"

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

	return convertBodyToJSON(res.Body)
}

func (s *discordServer) GetMyInfo(_ context.Context, req *gen.GetMyInfoRequest) (*gen.GetMyInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetMyInfo not implemented")
}
