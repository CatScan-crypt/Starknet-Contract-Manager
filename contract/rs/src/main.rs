
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

        .route("/complex", get(complex))
        .route("/build-cairo", get(build_cairo));
        .route("/path", get(build_cairo));

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

async fn complex() -> impl IntoResponse {

    (
        StatusCode::OK,
        Json(serde_json::json!({
            "message": "Hello, World!"
        })),
    )
}

async fn build_cairo() -> impl IntoResponse {
    let root_dir = std::path::Path::new("./app/scarb");

    // Step 1: cd into ./app/scarb and run pwd
    let pwd1 = Command::new("pwd")
        .current_dir(root_dir)
        .output()
        .await;

    // Step 2: cd into ./app/scarb/bin and run pwd
    let bin_dir = root_dir.join("bin");
    let pwd2 = Command::new("pwd")
        .current_dir(&bin_dir)
        .output()
        .await;

    match (pwd1, pwd2) {
        (Ok(out1), Ok(out2)) => {
            let stdout1 = String::from_utf8_lossy(&out1.stdout);
            let stdout2 = String::from_utf8_lossy(&out2.stdout);
            (
                StatusCode::OK,
                Json(serde_json::json!({
                    "scarb_pwd": stdout1.trim(),
                    "bin_pwd": stdout2.trim()
                }))
            )
        }
        _ => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(serde_json::json!({
                "error": "Failed to get directory paths"
            }))
        ),
    }
}
