
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio::process::Command;
use std::env;
use std::path::Path;

#[tokio::main]
async fn main() {

    tracing_subscriber::fmt::init();


    let app = Router::new()

        .route("/", get(root))

        .route("/complex", get(complex))
        .route("/build-cairo", get(build_cairo));
        .route("/path", get(walk_dirs));

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

// Handler to run `scarb build` in the contract directory
async fn build_cairo() -> impl IntoResponse {
    // Path to the Cairo contract directory (relative to this file)
    let contract_dir = std::path::Path::new("./");
    let output = Command::new("./app/scarb/bin/scarb")
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
            }))
        ),
    }
}

async fn walk_dirs() -> impl IntoResponse {
    let mut result = String::new();

    let steps = ["rs", "scarb", "bin"];

    let mut current = Path::new(".");

    for step in steps {
        current = current.join(step);
        if env::set_current_dir(&current).is_ok() {
            if let Ok(cwd) = env::current_dir() {
                result.push_str(&format!("cd {}\n", step));
                result.push_str(&format!("pwd -> {}\n\n", cwd.display()));
            }
        } else {
            result.push_str(&format!("❌ Failed to cd into {}\n\n", current.display()));
            break;
        }
    }

    (StatusCode::OK, result)
}
