import useCookies from "react-cookie/cjs/useCookies";
import {useEffect, useState} from "react";
import {GetMyInfo} from "../api/GetMyInfo";
import {GetMyInfoResponse} from "../gen/auth_pb";

const UserInfo = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['discord_access_token']);

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
        <div>
            <h1>Logged in</h1>
            <div>user name: {userName}#{discriminator}</div>
            <img src={`https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`} alt="avatar"/>
        </div>
    )
}

export default UserInfo;