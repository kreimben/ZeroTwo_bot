import {useEffect, useState} from "react";
import {RunLoginWithDiscord} from "../api/LoginWithDiscord";
import {useCookies} from "react-cookie";

export const DiscordCallback = () => {
    const [code, setCode] = useState<string>("");
    const [success, setSuccess] = useState<boolean | null>(null);
    const [_, setCookie, removeCookie] = useCookies(['discord_access_token']);

    useEffect(() => {
        // get code from url query
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            setCode(code);
        } else {
            console.error("No code found in url query!");
        }
    }, []);

    useEffect(() => {
        // send code to backend
        if (code) {
            const loc = window.location.toString();
            const redirect_uri = loc.substring(0, loc.indexOf("?"));
            RunLoginWithDiscord(code, redirect_uri, (msg) => {
                if (msg.hasError()) {
                    setSuccess(false);
                    removeCookie("discord_access_token", {path: "/",});
                } else if (msg.hasAccessToken()) {
                    setSuccess(true);
                    const d = new Date();
                    setCookie(
                        "discord_access_token",
                        msg.getAccessToken().getAccessToken(),
                        {
                            path: "/",
                            maxAge: msg.getAccessToken().getExpiresIn(),
                        }
                    );
                }
            })
        }
    }, [code]);


    return (
        <div>
            <h1>Discord Callback</h1>
            {
                success === null ? <p>loading...</p> :
                    success ? <p>login success!</p> : <p>login failed!</p>
            }
        </div>
    )
}