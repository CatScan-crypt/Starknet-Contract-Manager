use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio::process::Command;
use std::env;
use tokio::fs;
use serde_json::json;


#[tokio::main]
async fn main() {

    tracing_subscriber::fmt::init();


    let app = Router::new()

        .route("/", get(root))
        .route("/build-cairo", get(build_cairo))
        .route("/list-target-files", get(list_target_files));


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

async fn list_target_files() -> impl IntoResponse {
    let dir_path = "./app/target";
    match fs::read_dir(dir_path).await {
        Ok(mut entries) => {
            let mut files = Vec::new();
            while let Ok(Some(entry)) = entries.next_entry().await {
                if let Ok(file_name) = entry.file_name().into_string() {
                    files.push(file_name);
                }
            }
            (
                StatusCode::OK,
                Json(json!({ "files": files }))
            )
        }
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": format!("Failed to read directory: {}", e) }))
        ),
    }
}
