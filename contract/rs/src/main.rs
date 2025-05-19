use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio::process::Command;
use std::env;


#[tokio::main]
async fn main() {

    tracing_subscriber::fmt::init();


    let app = Router::new()

        .route("/", get(root))
        .route("/build-cairo", get(build_cairo));


    let port: u16 = std::env::var("PORT")
        .unwrap_or("3000".into())
        .parse()
        .expect("failed to convert to number");

    let ipv6 = SocketAddr::from(([0,0,0,0,0,0,0,0], port));
    let ipv6_listener = TcpListener::bind(&ipv6).await.unwrap();

    tracing::info!("Listening on IPv6 at {}!", ipv6);

    axum::serve(ipv6_listener, app)
    .await
    .unwrap();
}

async fn root() -> String {
    let cwd = env::current_dir().unwrap();
    format!("Current working directory: {}", cwd.display())
}


use axum::response::IntoResponse;
use std::process::Command;
use std::env;

async fn build_cairo() -> impl IntoResponse {
    // Print the current working directory
    match env::current_dir() {
        Ok(path) => println!("Current working dir: {}", path.display()),
        Err(e) => println!("Failed to get current dir: {}", e),
    }

    let output = Command::new("./app/scarb/bin/scarb")
        .arg("build")
        .output()
        .expect("Failed to execute scarb");

    format!("Scarb output: {}", String::from_utf8_lossy(&output.stdout))
}