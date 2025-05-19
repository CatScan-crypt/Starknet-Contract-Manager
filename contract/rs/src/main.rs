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


async fn build_cairo() -> impl IntoResponse {
    // Change working directory to project root before running scarb
    let output = Command::new("./app/scarb/bin/scarb")
        .arg("build")
        .current_dir("/root")
        .output()
        .await;

    match output {
        Ok(output) => {
            let stdout = String::from_utf8_lossy(&output.stdout);
            let stderr = String::from_utf8_lossy(&output.stderr);
            let status = output.status.code().unwrap_or(-1);
            // Get current dir and list files for debugging
            let pwd = std::env::current_dir().map(|p| p.display().to_string()).unwrap_or_else(|_| "<failed to get pwd>".to_string());
            let files = std::fs::read_dir("/root/hackathon/Starknet-Contract-Manager/contract")
                .map(|entries| {
                    entries.filter_map(|e| e.ok().map(|e| e.file_name().to_string_lossy().to_string())).collect::<Vec<_>>().join(", ")
                })
                .unwrap_or_else(|_| "<failed to list files>".to_string());
            (
                StatusCode::OK,
                Json(serde_json::json!({
                    "status": status,
                    "stdout": stdout,
                    "stderr": stderr,
                    "pwd": pwd,
                    "files": files
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
