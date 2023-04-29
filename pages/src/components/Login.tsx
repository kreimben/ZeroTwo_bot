import {useEffect, useState} from "react";
import styled from "styled-components";
import {GetOAuthUrl} from "../api/GetOAuthUrl";

const Login = () => {
    const [oauthUrl, setOauthUrl] = useState<string>("");

    useEffect(() => {
        const loc = window.location.toString();
        // cut after main domain
        const url = loc.substring(0, loc.indexOf('/', 8));
        GetOAuthUrl(url + '/discord/callback').then(r => {
            setOauthUrl(r.response.url);
        })
    }, []);

    return (
        <LoginWrapper>
            <button onClick={() => window.open(oauthUrl, "_parent")}>Login with Discord!</button>
        </LoginWrapper>
    )
}

const LoginWrapper = styled.div`
  color: white;
  margin-right: 16px;
`;

export default Login;