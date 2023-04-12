import Auth from "./Auth";
import {useEffect, useState} from "react";
import {ValidateGuildId} from "../api/ValidateGuildId";
import {ValidateUserId} from "../api/ValidateUserId";
import {ValidateUserIdResponse} from "../gen/auth_pb";

export const Connect = () => {
    const [validGuild, setValidGuild] = useState<boolean | null>(null);
    const [validUser, setValidUser] = useState<boolean | null>(null);

    const is_valid_guild = (guildId: string) => {
        ValidateGuildId(guildId, (msg) => {
            // console.log(`valid guild: ${msg}`);
            setValidGuild(msg.getIsValid())
        }, (err) => {
            // console.log(`invalid guild: ${err}`);
            setValidGuild(false);
        });
    }

    const is_valid_user_in_guild = (guild_id: string, user_id: string) => {
        ValidateUserId(guild_id, user_id, (msg: ValidateUserIdResponse) => {
            // console.log(`valid user in guild: ${msg}`);
            setValidUser(msg.getIsValid());
        }, (err) => {
            // console.log(`invalid user in guild: ${err}`);
            setValidUser(false);
        });
    }

    useEffect(() => {
        // get the url params if not redirect to home
        const params = new URLSearchParams(window.location.search);
        if (!(params.has("guild_id") && params.has("user_id"))) {
            window.location.href = "/";
        } else {
            const guild_id = params.get("guild_id");
            const user_id = params.get("user_id");
            is_valid_guild(guild_id);
            is_valid_user_in_guild(guild_id, user_id);
        }
    }, []);

    useEffect(() => {
        if (validGuild === true && validUser === true) {
            // console.log('valid!');
        } else if (validGuild === false || validUser === false) {
            // console.log('invalid!');
            // redirect to home.
            window.location.href = "/";
        }
    }, [validGuild, validUser]);

    return (
        <div>
            <Auth/>
            <h1>Connect</h1>
            <p>Connect to ZeroTwo_bot 4.0</p>
        </div>
    )
}