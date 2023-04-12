import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";
import {useEffect, useState} from "react";
import {GetOAuthUrl} from "../api/GetOAuthUrl";

const Login = () => {
    const [oauthUrl, setOauthUrl] = useState<string>("");

    useEffect(() => {
        GetOAuthUrl(window.location.toString() + 'discord/callback',(msg: ProtobufMessage) => {
            setOauthUrl((msg.toObject()["url"]).toString());
        })
    }, []);

    return (
        <div>
            <button onClick={() => window.open(oauthUrl, "_blank")}>Login with Discord!</button>
        </div>
    )
}

export default Login;