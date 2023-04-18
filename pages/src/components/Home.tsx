import styled from "styled-components";
import {GetMyInfo} from "../api/GetMyInfo";
import {GetMyInfoResponse} from "../gen/auth_pb";
import {useEffect} from "react";
import { useCookies } from "react-cookie";

const Home = () => {
    const [cookies, _, removeCookie] = useCookies(['discord_access_token', 'redirect_to']);

    useEffect(() => {
         if (cookies.redirect_to && cookies.discord_access_token) {
            if (confirm("들어왔던 링크로 이동하시겠습니까? Do you want to redirect to initial link?")) {
                const redirect_to = cookies.redirect_to;
                console.log(`redirecting to ${redirect_to}...`)
                removeCookie('redirect_to', {path: '/'});
                window.open(redirect_to, "_self");
            }
        }
    }, []);

    return (
        <InfoContent>
            <div>
                Welcome to ZeroTwo_bot 4.0!<br/><br/>
                To listen music, Please command to zerotwo bot `/hey`.<br/>
                음악을 들으시려면 제로투 봇에게 `/hey` 를 입력해주세요.
            </div>
        </InfoContent>
    )
}

const InfoContent = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 1.2rem;
`;

export default Home;