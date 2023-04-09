import DiscordStub from "../api/init";
import {useEffect, useState} from "react";
import {google} from "../gen/google/protobuf/empty";

const Login = () => {
    const [oauthUrl, setOauthUrl] = useState<string>("");

    const onclick = () => {
        DiscordStub.getInstance().stub.getOAuthUrl(new google.protobuf.Empty(),null, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                setOauthUrl(res.getUrl());
            }
        });
        // DiscordStub.getInstance().stub.GetOAuthUrl(new google.protobuf.Empty(),null, (err, res) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         setOauthUrl(res.url);
        //     }
        // })
    }

    useEffect(() => {
        console.log(`oauthUrl: ${oauthUrl}`);
    }, [oauthUrl]);

    return (
        <div>
            <button onClick={onclick}>Login with Discord!</button>
        </div>
    )
}

export default Login;