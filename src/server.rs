use serenity::async_trait;
use serenity::client::{Client, Context, EventHandler};
use serenity::model::{channel::{Message, Reaction}, gateway::Ready};
use serenity::framework::standard::{StandardFramework, CommandResult, macros::{
    command,
    group,
    hook,
}, DispatchError};
use std::env;
use std::sync::Arc;
use dotenv::dotenv;
use serenity::framework::standard::buckets::LimitedFor;
use serenity::utils::MessageBuilder;
use crate::command::ShardManagerContainer;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
    // async fn message(&self, ctx: Context, msg: Message) {
    async fn ready(&self, ctx: Context, ready: Ready) {
        println!("Ready to begin! Serving in this channels.");
    }
}

pub struct Server {
    pub client: Client,
}

impl Server {
    pub async fn new() -> Self {
        let framework = StandardFramework::new()
            .configure(|c| {
                c.prefix("**")
                    .allow_dm(false)
                    .with_whitespace(false)
                    .case_insensitivity(false);
                c
            })
        .group(&crate::command::GENERAL_GROUP);

        // Get DISCORD_TOKEN from dotenv
        dotenv().ok();

        // Login with a bot token from the environment
        let token = env::var("DISCORD_TOKEN").expect("token");
        let mut client = Client::builder(token)
            .event_handler(Handler)
            .framework(framework)
            .await
            .expect("Error creating client");

        {
            let mut data = client.data.write().await;
            data.insert::<ShardManagerContainer>(Arc::clone(&client.shard_manager));
        }

        // start listening for events by starting a single shard
        if let Err(why) = client.start().await {
            println!("An error occurred while running the client: {:?}", why);
        }

        Self {
            client,
        }
    }
}