package server

import (
	"context"
	"github.com/kreimben/ZeroTwo_bot/src/discord"
	gen "github.com/kreimben/ZeroTwo_bot/src/gen"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (vs *voiceChannelServer) WhereAmI(_ context.Context, req *gen.WhereAmIRequest) (*gen.WhereAmIResponse, error) {
	guild, err := discord.DiscordSession.State.Guild(req.GetGuildId())
	if err != nil {
		//log.Println("Error while getting guild info: ", err)
		return nil, status.Errorf(codes.Internal, "Error while getting guild info: %v", err)
	}

	for _, vs := range guild.VoiceStates {
		if vs.UserID == req.GetUserId() {
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
				Channel: channelInfo,
			}, nil
		}
	}
	return nil, status.Errorf(codes.NotFound, "User not found in any voice channel")
}
