use actix_web::{get, App, HttpServer, Responder};
use std::env;

#[get("/")]
async fn hello() -> impl Responder {
    "Hello, world!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = env::var("PORT").ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);
    HttpServer::new(|| App::new().service(hello))
        .bind(("0.0.0.0", port))?
        .run()
        .await
}
