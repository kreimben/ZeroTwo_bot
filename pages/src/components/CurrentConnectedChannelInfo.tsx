import {useContext} from "react";
import styled from "styled-components";
import {CurrentChannelContext} from "../vars/contexts";
import {CurrentConnectedChannelInfoProps} from "./Connect";

export const CurrentConnectedChannelInfo = () => {
    const context: CurrentConnectedChannelInfoProps = useContext(CurrentChannelContext);

    const changeUnits = (bitrate: number) => {
        if (bitrate < 1000) {
            return `${bitrate} bps`;
        } else if (bitrate < 1000000) {
            return `${(bitrate / 1000).toFixed(2)} kbps`;
        } else {
            return `${(bitrate / 1000000).toFixed(2)} mbps`;
        }
    }

    return (
        <CurrentConnectedChannelInfoWrapper>
            {
                context !== null && typeof context != "string" ?
                    <div>
                        <ChannelName>{context.channelName}</ChannelName>
                        <p>{changeUnits(context.bitrate)}</p>
                        <p className="font-bold">Whom are with in / 같은 채널에 있는 멤버들:</p>
                        {
                            context.members.map((member, index) => {
                                return (
                                    <div className="mx-12 px-2 inline-block" key={index}>
                                        <MemberName>{member.userName}</MemberName>
                                        <MemberImage src={member.avatar} alt={member.userName}/>
                                    </div>
                                )
                            })
                        }
                    </div> :
                    <div>
                        <h1>들어간 보이스 채널이 확인되지 않습니다.</h1>
                        <h1>Not connected to a channel</h1>
                    </div>
            }
        </CurrentConnectedChannelInfoWrapper>
    )
}
const MemberName = styled.div`
  font-size: 0.6em;
  font-weight: bold;
`;

const MemberImage = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%;
`;

const ChannelName = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const CurrentConnectedChannelInfoWrapper = styled.div`
  height: 186px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 400px;

  /* From https://css.glass */
  background: rgba(192, 191, 49, 0.55);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.2px);
  -webkit-backdrop-filter: blur(6.2px);
  border: 1px solid rgba(192, 191, 49, 0.3);
`;