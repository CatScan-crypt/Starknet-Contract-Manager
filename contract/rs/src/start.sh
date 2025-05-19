#!/bin/bash
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
export PATH="/root/.local/bin:$PATH"
cargo run --release
