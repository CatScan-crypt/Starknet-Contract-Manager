use poem::{handler, listener::TcpListener, Route, Server};
use std::process::Command;

#[handler]
async fn build_contracts() -> String {
    let output = Command::new("scarb")
        .arg("build")
        .current_dir("..") // run in contract directory
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                String::from_utf8_lossy(&output.stdout).to_string()
            } else {
                format!("Build failed: {}", String::from_utf8_lossy(&output.stderr))
            }
        }
        Err(e) => format!("Failed to run build: {}", e),
    }
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let app = Route::new().at("/build", poem::get(build_contracts));
    Server::new(TcpListener::bind("0.0.0.0:3000")).run(app).await
}
