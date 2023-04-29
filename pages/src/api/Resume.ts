import {ResumeResponse} from "@/gen/play";
import {transport} from "./init";
import {PlayServiceClient} from "@/gen/play.client";

export const Resume = async (guildId: string) => {
    const client = new PlayServiceClient(transport);
    return client.resume({guildId: guildId, userId: ""});
}