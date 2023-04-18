import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {ValidateGuildId} from "../api/ValidateGuildId";
import {ValidateUserId} from "../api/ValidateUserId";
import {ValidateGuildIdResponse, ValidateUserIdResponse} from "../gen/auth_pb";
import {SearchView} from "./SearchView";
import {CurrentConnectedGuildInfo} from "./CurrentConnectedGuildInfo";
import styled from "styled-components";
import {WhereAmIBackground} from "../api/WhereAmI";
import {CurrentConnectedChannelInfo} from "./CurrentConnectedChannelInfo";
import {CurrentChannelContext} from "../vars/contexts";
import {MemberInfo} from "../gen/voice_channel_pb";
import {useCookies} from "react-cookie";

class CurrentConnectedChannelInfoProps {
    channelName: string;
    bitrate: number;
    members: Array<Member>;
}

class Member {
    userId: string;
    userName: string;
    avatar: string; // actually avatar url.
}

export const Connect = () => {
    const [validGuild, setValidGuild] = useState<boolean | null>(null);
    const [validUser, setValidUser] = useState<boolean | null>(null);

    const [guildId, setGuildId] = useState<string>("");
    const [userId, setUserId] = useState<string>("");

    const [params, setParams] = useSearchParams();

    const [currentGuildInfo, setCurrentGuildInfo] = useState<null | ValidateGuildIdResponse>(null);

    const [currentChannelInfo, setCurrentChannelInfo] = useState<null | CurrentConnectedChannelInfoProps | string>(null);

    const [cookies, setCookie, removeCookie] = useCookies(['discord_access_token', 'redirect_to']);

    const is_valid_guild = (guildId: string) => {
        ValidateGuildId(guildId, (msg) => {
            setCurrentGuildInfo(msg);
            setValidGuild(true)
        }, (err) => {
            console.error(`invalid guild: ${err}`);
            // setValidGuild(false);
        });
    }

    const is_valid_user_in_guild = (guild_id: string, user_id: string) => {
        ValidateUserId(guild_id, user_id, (msg: ValidateUserIdResponse) => {
            // console.log(`valid user in guild: ${msg}`);
            setValidUser(true);
        }, (err) => {
            console.error(`invalid user in guild: ${err}`);
            // setValidUser(false);
        });
    }

    useEffect(() => {
        // console.log(`guild id: ${guildId} ${params.get("guild_id")}`)
        if (params.get("guild_id") !== "") is_valid_guild(params.get("guild_id"));
    }, [validGuild]);

    useEffect(() => {
        // console.log(`user id: ${userId} ${params.get("user_id")}`)
        if (params.get("guild_id") !== "" && params.get("user_id") !== "") is_valid_user_in_guild(params.get("guild_id"), params.get("user_id"));
    }, [validUser]);


    /**
     * For initializing `WhereAmI` background service.
     */
    useEffect(() => {
        if (!cookies.discord_access_token) {
            setCookie("redirect_to", window.location.href, {path: "/"});
            alert("Login required. 로그인 먼저 해주세요.");
            window.location.href = '/';
        } else if (params.get("guild_id") !== "" && params.get("user_id") !== "") {
            WhereAmIBackground.getInstance().enrollService(
                params.get("user_id"),
                params.get("guild_id"),
                (res) => {
                    setCurrentChannelInfo({
                        channelName: res.getChannel().getChannelName(),
                        bitrate: res.getChannel().getBitrate(),
                        members: res.getChannel().getMembersList().map((member: MemberInfo) => {
                            return {
                                userId: member.getUserId(),
                                userName: member.getUserName(),
                                avatar: member.getUserAvatar()
                            }
                        }),
                    })
                }, (err) => {
                    setCurrentChannelInfo(err);
                }
            );
        }
    }, [])

    return (
        <CurrentChannelContext.Provider value={currentChannelInfo}>
            <ConnectWrapper>
                <CurrentConnectedChannelInfoWrapper>
                    <CurrentConnectedChannelInfo/>
                </CurrentConnectedChannelInfoWrapper>
                {
                    currentGuildInfo !== null ?
                        <CurrentConnectedGuildInfoWrapper>
                            <CurrentConnectedGuildInfo guildName={currentGuildInfo.getGuildInfo().getGuildName()}
                                                       guildIcon={currentGuildInfo.getGuildInfo().getIcon()}/>
                        </CurrentConnectedGuildInfoWrapper> :
                        <h1>Please wait...</h1>
                }
                {
                    validGuild === true && validUser === true ?
                        <SearchView guildId={params.get("guild_id")} userId={params.get("user_id")}/> :
                        <h1>Please wait...</h1>
                }
            </ConnectWrapper>
        </CurrentChannelContext.Provider>
    )
}

const CurrentConnectedChannelInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const CurrentConnectedGuildInfoWrapper = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
`;

const ConnectWrapper = styled.div`
`;

export {CurrentConnectedChannelInfoProps, Member}