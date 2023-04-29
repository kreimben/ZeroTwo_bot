package server

import (
	"github.com/bwmarrin/discordgo"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

func (vs *voiceChannelServer) WhereAmI(req *gen.WhereAmIRequest, server gen.VoiceChannelService_WhereAmIServer) error {
	if req.GetGuildId() == "" || req.GetUserId() == "" {
		return status.Errorf(codes.InvalidArgument, "Missing guild id or user id")
	}

	guild, err := discord.DiscordSession.State.Guild(req.GetGuildId())
	if err != nil {
		return status.Errorf(codes.Internal, "Error while getting guild info: %v", err)
	}

	for {
		res, err := getChannelInfo(req.GetUserId(), guild)
		if err != nil {
			return err
		}
		err = server.Send(res)
		if err != nil {
			return err
		}
		time.Sleep(1 * time.Second)
	}
}

func getChannelInfo(userId string, guild *discordgo.Guild) (*gen.WhereAmIResponse, error) {
	for _, vs := range guild.VoiceStates {
		if vs.UserID == userId {
			channel, err := discord.DiscordSession.Channel(vs.ChannelID)
			if err != nil {
				return nil, status.Errorf(codes.Internal, "Error while getting channel info: %v", err)
			}

			members := make([]*gen.MemberInfo, 0)
			for _, vs := range guild.VoiceStates {
				user, err := discord.DiscordSession.User(vs.UserID)
				if err != nil {
					return nil, err
				}
				members = append(members, &gen.MemberInfo{
					UserId:     user.ID,
					UserName:   user.Username,
					UserAvatar: user.AvatarURL("128"),
				})
			}

			channelInfo := &gen.ChannelInfo{
				ChannelId:   channel.ID,
				ChannelName: channel.Name,
				Bitrate:     uint64(channel.Bitrate),
				Members:     members,
			}

			return &gen.WhereAmIResponse{
				Response: &gen.WhereAmIResponse_Channel{
					Channel: channelInfo,
				},
			}, nil
		}
	}
	return &gen.WhereAmIResponse{
		Response: &gen.WhereAmIResponse_ErrorMessage{
			ErrorMessage: "User not found in any voice channel",
		},
	}, nil
}
