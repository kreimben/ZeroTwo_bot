import useCookies from "react-cookie/cjs/useCookies";
import {useEffect, useState} from "react";
import {GetMyInfo} from "../api/GetMyInfo";
import {GetMyInfoResponse} from "../gen/auth_pb";
import styled from "styled-components";

const UserInfo = () => {
    const [cookies, _] = useCookies(['discord_access_token']);

    // create useState variable for userName, userId, avatar, discriminator
    const [userName, setUserName] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [discriminator, setDiscriminator] = useState<string>("");

    // get user info using the access token
    useEffect(() => {
        if (!cookies.discord_access_token) {
            console.error("no access token");
            return;
        }
        GetMyInfo(cookies.discord_access_token, (res: GetMyInfoResponse) => {
            const info = res.getMyInfo();
            setUserName(info.getUserName());
            setUserId(info.getUserId()); // need for getting avatar image.
            setAvatar(info.getAvatar());
            setDiscriminator(info.getDiscriminator());
        })
    }, []);

    return (
        <UserInfoWrapper>
            <UserInfoName>{userName}#{discriminator}</UserInfoName>
            <UserInfoImage src={`https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`}
                           alt="avatar"/>
        </UserInfoWrapper>
    )
}

const UserInfoWrapper = styled.div`
  color: white;
  display: inline-flex;
  align-items: center;
`;

const UserInfoName = styled.p`
  margin-right: 16px;
`;

const UserInfoImage = styled.img`
  height: 48px;
  width: 48px;
  margin-right: 16px;
  border-radius: 50%;
`;

export {UserInfo};