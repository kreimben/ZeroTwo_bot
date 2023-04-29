import {transport} from "./init";
import {PlayServiceClient} from "@/gen/play.client";

export const Search = async (keyword: string | null, url: string | null, amount: number) => {
    const client = new PlayServiceClient(transport);
    if (keyword !== null) {
        return client.search({
                searchType: {oneofKind: "keyword", keyword: String(keyword)},
                amount: Number(amount)
            }
        );
    } else if (url !== null) {
        return client.search({
                searchType: {oneofKind: "url", url: String(url)},
                amount: Number(amount)
            }
        );
    }
}