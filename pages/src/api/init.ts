import {DiscordClient} from "../gen/AuthServiceClientPb";
import {discord} from "../gen/auth";



export default class DiscordStub {
    stub: DiscordClient;

    constructor() {
        console.log(`[API] Creating Discord stub...`)
        this.stub = new DiscordClient('http://localhost:5011');
        // this.stub = new discord.DiscordClient('http://localhost:5011', null);
        console.log(`[API] Discord stub created: ${this.stub}`)
    }

    // Singleton
    private static instance: DiscordStub = new DiscordStub();

    public static getInstance(): DiscordStub {
        if (!DiscordStub.instance) {
            DiscordStub.instance = new DiscordStub();
        }
        return DiscordStub.instance;
    }
}