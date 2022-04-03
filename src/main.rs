mod server;
mod command;
mod play;

#[tokio::main]
async fn main() {
    let mut server = server::Server::new().await;
    server.client.start();
}