import {ValidateUserIdResponse} from "@/gen/auth";
import {transport} from "./init";
import {DiscordClient} from "@/gen/auth.client";

export const ValidateUserId = async (guildId: string, userId: string) => {
    const client = new DiscordClient(transport);
    return client.validateUserId({guildId: guildId, userId: userId});
}