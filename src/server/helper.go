package server

import (
	"encoding/json"
	"errors"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"io"
	"strings"
)

func getAccessTokenOrError(body io.ReadCloser) (*gen.LoginWithDiscordResponse, error) {
	// Convert response to JSON.
	rawJSON, _ := io.ReadAll(body)
	var (
		token discordAccessToken
		e     discordError
	)
	if strings.Contains(string(rawJSON), "access_token") {
		if err := json.Unmarshal(rawJSON, &token); err != nil {
			GRPCLogger.Println("Couldn't parse JSON: " + err.Error())
			return nil, err
		}
		return &gen.LoginWithDiscordResponse{
			Response: &gen.LoginWithDiscordResponse_AccessToken{
				AccessToken: &gen.DiscordAccessTokenResponse{
					AccessToken:  token.AccessToken,
					ExpiresIn:    int64(token.ExpiresIn),
					RefreshToken: token.RefreshToken,
					Scope:        token.Scope,
					TokenType:    token.TokenType,
				}},
		}, nil
	} else if strings.Contains(string(rawJSON), "error") {
		if err := json.Unmarshal(rawJSON, &e); err != nil {
			GRPCLogger.Println("Couldn't parse JSON: " + err.Error())
			return nil, err
		}
		return &gen.LoginWithDiscordResponse{
			Response: &gen.LoginWithDiscordResponse_Error{
				Error: &gen.DiscordErrorResponse{
					Error:            e.Error,
					ErrorDescription: e.ErrorDescription,
				}},
		}, nil
	}
	return nil, errors.New("Unknown error: " + string(rawJSON))
}
func getUserInfoOrError(body io.ReadCloser) (*gen.GetMyInfoResponse, error) {
	// Convert response to JSON.
	rawJSON, _ := io.ReadAll(body)
	var (
		userInfo discordUserInfo
		e        discordError
	)
	if strings.Contains(string(rawJSON), "user") {
		if err := json.Unmarshal(rawJSON, &userInfo); err != nil {
			GRPCLogger.Println("Couldn't parse JSON: " + err.Error())
			return nil, err
		}

		return &gen.GetMyInfoResponse{
			Response: &gen.GetMyInfoResponse_MyInfo{
				MyInfo: &gen.UserInfo{
					UserId:        userInfo.Id,
					UserName:      userInfo.Username,
					Avatar:        userInfo.Avatar,
					Discriminator: userInfo.Discriminator,
				},
			},
		}, nil
	} else if strings.Contains(string(rawJSON), "error") {
		if err := json.Unmarshal(rawJSON, &e); err != nil {
			GRPCLogger.Println("Couldn't parse JSON: " + err.Error())
			return nil, err
		}
		return &gen.GetMyInfoResponse{
			Response: &gen.GetMyInfoResponse_Error{
				Error: &gen.DiscordErrorResponse{
					Error:            e.Error,
					ErrorDescription: e.ErrorDescription,
				},
			},
		}, nil
	}
	return nil, errors.New("Unknown error: " + string(rawJSON))
}
