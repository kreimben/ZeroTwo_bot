import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {ValidateGuildId} from "@/api/ValidateGuildId";
import {ValidateUserId} from "@/api/ValidateUserId";
import {ValidateGuildIdResponse} from "@/gen/auth";
import {SearchView} from "./SearchView";
import {CurrentConnectedGuildInfo} from "./CurrentConnectedGuildInfo";
import styled from "styled-components";
import {WhereAmIBackground} from "@/api/WhereAmI";
import {CurrentConnectedChannelInfo} from "./CurrentConnectedChannelInfo";
import {CurrentChannelContext} from "@/vars/contexts";
import {MemberInfo} from "@/gen/voice_channel";
import {useCookies} from "react-cookie";
import {Queue} from "./Queue";

class CurrentConnectedChannelInfoProps {
    channelName: string;
    bitrate: number;
    members: Array<Member>;

    constructor(channelName: string, bitrate: number, members: Array<Member>) {
        this.channelName = channelName;
        this.bitrate = bitrate;
        this.members = members;
    }
}

class Member {
    userId: string;
    userName: string;
    avatar: string; // actually avatar url.
    constructor(userId: string, userName: string, avatar: string) {
        this.userId = userId;
        this.userName = userName;
        this.avatar = avatar;
    }
}

export const Connect = () => {
    const [validGuild, setValidGuild] = useState<boolean | null>(null);
    const [validUser, setValidUser] = useState<boolean | null>(null);

    const [params, _] = useSearchParams();

    const [currentGuildInfo, setCurrentGuildInfo] = useState<null | ValidateGuildIdResponse>(null);

    const [currentChannelInfo, setCurrentChannelInfo] = useState<null | CurrentConnectedChannelInfoProps | string>(null);

    const [cookies, setCookie] = useCookies(['discord_access_token', 'redirect_to']);

    const [showQueue, setShowQueue] = useState<boolean>(false);

    const is_valid_guild = (guildId: string) => {
        ValidateGuildId(guildId).then(res => {
            if (res.status.code === 'OK') {
                setCurrentGuildInfo(res.response);
                setValidGuild(true);
            } else {
                console.error(`invalid guild: ${res.status.code}`);
            }
        })
    }

    const is_valid_user_in_guild = (guild_id: string, user_id: string) => {
        ValidateUserId(guild_id, user_id).then(res => {
            if (res.status.code === 'OK') {
                setValidUser(true);
            } else {
                console.error(`invalid user in guild: ${res.status.code}`);
                // setValidUser(false);
            }
        })
    }

    useEffect(() => {
        // console.log(`guild id: ${guildId} ${params.get("guild_id")}`)
        if (params.get("guild_id") !== "") is_valid_guild(String(params.get("guild_id")));
    }, [validGuild]);

    useEffect(() => {
        if (params.get("guild_id") !== "" && params.get("user_id") !== "") {
            is_valid_user_in_guild(
                String(params.get("guild_id")),
                String(params.get("user_id"))
            );
        }
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
            WhereAmIBackground.enrollService(
                String(params.get("user_id")),
                String(params.get("guild_id"))
            ).then(_ => {
            }).catch(err => {
                // may be already enrolled.
                console.error(`WhereAmIBackground: ${err}`);
            })
            setInterval(() => {
                const background = WhereAmIBackground.getLastSavedBackground();
                if (background && background.response.oneofKind === "channel") {
                    const channel = background.response.channel;
                    setCurrentChannelInfo({
                        channelName: channel.channelName,
                        bitrate: Number(channel.bitrate),
                        members: channel.members?.map((member: MemberInfo) => {
                            return {
                                userId: member.userId,
                                userName: member.userName,
                                avatar: member.userAvatar,
                            }
                        }),
                    })
                }
            }, 1000);
        }
    }, [])

    const getButtonLabel = () => {
        if (showQueue) {
            return "Hide Queue"
        } else {
            return "Show Queue"
        }
    }

    return (
        <CurrentChannelContext.Provider value={currentChannelInfo}>
            <ConnectWrapper>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                        onClick={() => {
                            setShowQueue(!showQueue)
                        }}>{getButtonLabel()}</button>
                {
                    showQueue ?
                        <QueueWrapper>
                            <Queue guildId={String(params.get("guild_id"))}
                                   userId={String(params.get("user_id"))}/>
                        </QueueWrapper>
                        :
                        <ConnectInfoWrapper>
                            <CurrentConnectedChannelInfoWrapper>
                                <CurrentConnectedChannelInfo/>
                            </CurrentConnectedChannelInfoWrapper>
                            {
                                currentGuildInfo !== null ?
                                    <CurrentConnectedGuildInfoWrapper>
                                        <CurrentConnectedGuildInfo
                                            guildName={String(currentGuildInfo.guildInfo!.guildName)}
                                            guildIcon={String(currentGuildInfo.guildInfo!.icon)}/>
                                    </CurrentConnectedGuildInfoWrapper> :
                                    <h1>Please wait...</h1>
                            }
                            {
                                validGuild === true && validUser === true ?
                                    <SearchView guildId={String(params.get("guild_id"))}
                                                userId={String(params.get("user_id"))}/> :
                                    <h1>Please wait...</h1>
                            }
                        </ConnectInfoWrapper>
                }
            </ConnectWrapper>
        </CurrentChannelContext.Provider>
    )
}

const ConnectWrapper = styled.div`
  text-align: center;
`;

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

const ConnectInfoWrapper = styled.div`
`;

const QueueWrapper = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
`;

export {CurrentConnectedChannelInfoProps, Member}