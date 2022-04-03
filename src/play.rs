
/*
 * 1. 명령어를 입력한 사용자가 음성채널에 있는지 확인.
 * 2. **p / **play 다음에 온 url 또는 검색어가 유효한지 확인.
 * 3. 유효하다면 사용자가 들어가있는 음성채널에 입장.
 * 4. Play the music.
 */

use serenity::client::{Client, Context};
use serenity::framework::standard::CommandResult;
use serenity::model::channel::Message;

pub async fn play_inner(context: &Context, msg: &Message) -> CommandResult {
    msg.reply_mention(context, format!("Hey!")).await?;

    Ok(())
}