import {ValidateGuildIdResponse} from "@/gen/auth";
import {transport} from "./init";
import {DiscordClient} from "@/gen/auth.client";

export const ValidateGuildId = async (guildId: string) => {
    const client = new DiscordClient(transport);
    return client.validateGuildId({guildId: guildId});
}