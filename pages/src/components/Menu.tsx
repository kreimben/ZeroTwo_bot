import {useCookies} from "react-cookie";
import styled from "styled-components";
import {UserInfo} from "./UserInfo";
import Login from "./Login";

const MenuElement = (props) => {
    return (
        <MenuElementWrapper>
            <a href={props.href} target={props.target}>{props.text}</a>
        </MenuElementWrapper>
    )
}


export const Menu = () => {
    const [cookies, _, removeCookie] = useCookies(['discord_access_token']);

    const logout = () => {
        removeCookie('discord_access_token', {path: "/",});
    }

    return (
        <MenuWrapper>
            <ZeroTwoImage src="/images/zerotwo.png"/>
            <MenuElement text='Home' href="/"/>
            <MenuElement text="Kreimben.com" href="https://kreimben.com" target="_blank"/>
            <MenuRightWrapper>
                {
                    cookies.discord_access_token ?
                        <>
                            <div className="text-white mr-4" onClick={logout}>Logout</div>
                            <UserInfo/>
                        </> :
                        <Login/>
                }
            </MenuRightWrapper>
        </MenuWrapper>
    )
}

const ZeroTwoImage = styled.img`
  height: 48px;
  width: 48px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  height: 64px;
  overflow: hidden;
`;

const MenuElementWrapper = styled.div`
  color: white;
  margin-right: 16px;
`;

const MenuRightWrapper = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
`;