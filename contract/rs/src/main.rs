use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio::process::Command;
use std::env;
use std::path::{Path, PathBuf};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/", get(root))
        .route("/complex", get(complex))
        .route("/build-cairo", get(build_cairo));

    let port: u16 = env::var("PORT")
        .unwrap_or_else(|_| "3000".to_string())
        .parse()
        .expect("failed to convert to number");

    let ipv6 = SocketAddr::from(([0, 0, 0, 0, 0, 0, 0, 0], port));
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
    // Get absolute path to the scarb binary
    let scarb_path = match env::current_dir()
        .map(|cwd| cwd.join("app/scarb/bin/scarb"))
    {
        Ok(path) => path,
        Err(e) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(serde_json::json!({
                    "error": format!("Failed to get current dir: {}", e)
                })),
            );
        }
    };

    // Set working directory for the build command
    let contract_dir = Path::new("./contract"); // or adjust to correct relative dir

    let output = Command::new(scarb_path)
        .arg("build")
        .current_dir(contract_dir)
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
            })),
        ),
    }
}
