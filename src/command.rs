use std::sync::Arc;
use serenity::framework::standard::{
    buckets::{LimitedFor, RevertBucket},
    CommandResult,
    DispatchError,
    macros::{
        command,
        group,
    }};
use serenity::client::{bridge::gateway::{ShardId, ShardManager}, Client, Context};
use tokio::sync::Mutex;
use serenity::model::channel::{Message, ReactionType};
use serenity::model::guild::Target::Channel;
use serenity::model::id::UserId;
use serenity::prelude::TypeMapKey;
use serenity::utils::MessageBuilder;

#[group]
#[commands(ping, help, play, p, dance)]
struct General;

pub struct ShardManagerContainer;

impl TypeMapKey for ShardManagerContainer {
    type Value = Arc<Mutex<ShardManager>>;
}

#[command]
async fn ping(ctx: &Context, msg: &Message) -> CommandResult {
    let data = ctx.data.read().await;
    let shard_mgr = match data.get::<ShardManagerContainer>() {
        Some(v) => v,
        None => {
            msg.reply(ctx, "There was a problem getting the shard manager").await?;
            return Ok(());
        }
    };

    let manager = shard_mgr.lock().await;
    let runners = manager.runners.lock().await;

    let runner = match runners.get(&ShardId(ctx.shard_id)) {
        Some(runner) => runner,
        None => {
            msg.reply(ctx, "No shard found").await?;
            return Ok(());
        }
    };

    let ms = format!("{:?}", runner.latency);
    println!("{}", &ms);

    // msg.reply(ctx, &ms).await?;

    let msg = msg.channel_id.send_message(&ctx.http, |m| {
        m.embed(|e| {
            e.title("Pong!")
                .field(ms, "", false)
                // .footer(|f| f.text("Aksidion Kreimben."))
        }) // embed
    }).await;

    if let Err(why) = msg { println!("Error sending message: {:?}", why); }

    Ok(())
}

#[command]
async fn help(ctx: &Context, msg: &Message) -> CommandResult {
    msg.reply_mention(ctx, "I want to help you too.").await?;

    Ok(())
}

#[command]
async fn play(ctx: &Context, msg: &Message) -> CommandResult {
    crate::play::play_inner(ctx, msg).await?;

    Ok(())
}

#[command]
async fn p(ctx: &Context, msg: &Message) -> CommandResult {
    crate::play::play_inner(ctx, msg).await?;

    Ok(())
}

#[command]
async fn dance(ctx: &Context, msg: &Message) -> CommandResult {
    // msg.reply_mention(ctx, "https://tenor.com/9YMQ.gif").await?;

    let msg = msg.channel_id.send_message(&ctx.http, |m| {
        m.content("Z").embed(|e| {
            e.title("ZeroTwo Dance~")
                .field("https://tenor.com/9YMQ.gif", "", false)
        })
    }).await;

    if let Err(why) = msg { println!("Error sending message: {:?}", why); }

    Ok(())
}