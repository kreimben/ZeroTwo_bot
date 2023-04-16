import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {ValidateGuildId} from "../api/ValidateGuildId";
import {ValidateUserId} from "../api/ValidateUserId";
import {ValidateUserIdResponse} from "../gen/auth_pb";
import {SearchView} from "./SearchView";

export const Connect = () => {
    const [validGuild, setValidGuild] = useState<boolean | null>(null);
    const [validUser, setValidUser] = useState<boolean | null>(null);

    const [guildId, setGuildId] = useState<string>("");
    const [userId, setUserId] = useState<string>("");

    const [params, setParams] = useSearchParams();

    const is_valid_guild = (guildId: string) => {
        ValidateGuildId(guildId, (msg) => {
            // console.log(`valid guild: ${msg}`);
            setValidGuild(true)
        }, (err) => {
            console.error(`invalid guild: ${err}`);
            // setValidGuild(false);
        });
    }

    const is_valid_user_in_guild = (guild_id: string, user_id: string) => {
        ValidateUserId(guild_id, user_id, (msg: ValidateUserIdResponse) => {
            // console.log(`valid user in guild: ${msg}`);
            setValidUser(true);
        }, (err) => {
            console.error(`invalid user in guild: ${err}`);
            // setValidUser(false);
        });
    }

    useEffect(() => {
        // console.log(`before set guild_id: ${params.get("guild_id")} user_id: ${params.get("user_id")}`)
        setGuildId(params.get("guild_id"));
        setUserId(params.get("user_id"));
    }, []);

    useEffect(() => {
        // console.log(`guild id: ${guildId} ${params.get("guild_id")}`)
        if (params.get("guild_id") !== "") is_valid_guild(params.get("guild_id"));
    }, [validGuild]);

    useEffect(() => {
        // console.log(`user id: ${userId} ${params.get("user_id")}`)
        if (params.get("guild_id") !== "" && params.get("user_id") !== "") is_valid_user_in_guild(params.get("guild_id"), params.get("user_id"));
    }, [validUser]);

    return (
        <div>
            {
                validGuild === true && validUser === true ?
                    <SearchView guildId={guildId} userId={userId}/> :
                    <h1>Please wait...</h1>
            }
        </div>
    )
}