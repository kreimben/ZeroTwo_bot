import {useEffect, useState} from "react";
import {RunLoginWithDiscord} from "@/api/LoginWithDiscord";
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
            }).then((msg) => {
                if (msg.response.response.oneofKind === "error") {
                    setSuccess(false);
                    removeCookie("discord_access_token", {path: "/",});
                } else if (msg.response.response.oneofKind === "accessToken") {
                    setSuccess(true);
                    setCookie(
                        "discord_access_token",
                        msg.response.response.accessToken.accessToken,
                        {
                            path: "/",
                            expires: new Date(Date.now() + 3600 * 1000 * 2),
                            secure: true,
                            sameSite: "strict",
                        }
                    );
                    // redirect to home page
                    window.location.href = "/";
                }
            });
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