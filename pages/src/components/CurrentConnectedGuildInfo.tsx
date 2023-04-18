import styled from "styled-components";

export const CurrentConnectedGuildInfo = ({guildName, guildIcon}) => {
    return (
        <CurrentConnectedGuildInfoWrapper>
            <GuildName>{guildName}</GuildName>
            <GuildImage src={guildIcon} alt={guildName}/>
        </CurrentConnectedGuildInfoWrapper>
    )
}

const GuildName = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const GuildImage = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%;
  margin-left: 16px;
`;

const CurrentConnectedGuildInfoWrapper = styled.div`
  margin-top: 16px;
  background-color: red;
  height: 96px;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* From https://css.glass */
  background: rgba(216, 170, 53, 0.28);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border: 1px solid rgba(216, 170, 53, 0.3);
`;