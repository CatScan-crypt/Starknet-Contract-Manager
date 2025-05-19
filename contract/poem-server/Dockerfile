# syntax=docker/dockerfile:1
FROM rust:1.77 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bullseye-slim
WORKDIR /app
COPY --from=builder /app/target/release/poem-server /app/poem-server
# Install curl and unzip for Scarb
RUN apt-get update && apt-get install -y curl unzip && rm -rf /var/lib/apt/lists/*
# Install Scarb
RUN curl -L https://github.com/software-mansion/scarb/releases/latest/download/scarb-x86_64-unknown-linux-gnu.zip -o scarb.zip \
    && unzip scarb.zip \
    && mv scarb /usr/local/bin/ \
    && rm scarb.zip
# Copy contract sources for build
COPY ../ /app/contract/
ENV RUST_LOG=info
EXPOSE 3000
CMD ["/app/poem-server"]
