import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";
import {useEffect, useState} from "react";
import {GetOAuthUrl} from "../api/GetOAuthUrl";

const Login = () => {
    const [oauthUrl, setOauthUrl] = useState<string>("");

    useEffect(() => {
        const loc = window.location.toString();
        // cut after main domain
        const url = loc.substring(0, loc.indexOf('/', 8));
        GetOAuthUrl(url + '/discord/callback',(msg) => {
            setOauthUrl(msg.getUrl().toString());
        })
    }, []);

    return (
        <div>
            <button onClick={() => window.open(oauthUrl, "_blank")}>Login with Discord!</button>
        </div>
    )
}

export default Login;