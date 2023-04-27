import styled from "styled-components";
import {useEffect} from "react";
import {useCookies} from "react-cookie";

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
            <br/><br/>
            <div>
                What's new in ZeroTwo_bot 4.0?<br/><br/>
                <ol type="1">
                    <li>Discord OAuth2 Login.</li>
                    <li>Completely new designed webpage to control ZeroTwo_bot.</li>
                    <li>New shuffle feature.</li>
                    <li>Drag to change song's order.</li>
                    <li>Some convenient features for website.</li>
                </ol>
            </div><br/><br/>
            <div>
                제로투 4.0의 신기능!<br/><br/>
                <ol type="1">
                    <li>디스코드 OAuth2 로그인.</li>
                    <li>완전히 새로운 제로투 제어 사이트.</li>
                    <li>새로운 셔플 기능.</li>
                    <li>드래그로 순서 변경 지원.</li>
                    <li>웹페이지를 위한 몇몇 편리한 기능들.</li>
                </ol>
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