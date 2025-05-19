
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio::process::Command;
use std::env;
use std::fs;
use std::path::PathBuf;

#[tokio::main]
async fn main() {

    tracing_subscriber::fmt::init();


    let app = Router::new()

        .route("/", get(root));
        .route("/complex", get(complex));
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

async fn root() -> impl IntoResponse {
    let cwd = env::current_dir().unwrap();
    let target_path = cwd.join("target");

    match fs::read_dir(&target_path) {
        Ok(entries) => {
            let mut files = Vec::new();
            for entry in entries.flatten() {
                let file_name = entry.file_name().into_string().unwrap_or_default();
                files.push(file_name);
            }
            let file_list = files.join(", ");
            format!("Contents of target folder at {}:\n{}", target_path.display(), file_list)
        }
        Err(e) => format!("Could not read target folder at {}: {}", target_path.display(), e),
    }
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

    let output = Command::new("./scarb/bin/scarb")
        .arg("build")
        .output()
        .await;

    match output {
        Ok(output) => {
            let stdout = String::from_utf8_lossy(&output.stdout);
            let stderr = String::from_utf8_lossy(&output.stderr);
            let status = output.status.code().unwrap_or(-1);
            (
                StatusCode::OK,
                Json(serde_json::json!({
                    "status": status,
                    "stdout": stdout,
                    "stderr": stderr
                }))
            )
        }
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(serde_json::json!({
                "error": format!("Failed to run scarb: {}", e)
            }))
        ),
    }
}

