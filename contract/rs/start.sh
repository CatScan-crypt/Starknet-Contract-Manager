#!/bin/bash
set -e
echo "Starting the contract/rs container..."
# Install asdf
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.0
. "$HOME/.asdf/asdf.sh"

# Install Node.js
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git || true
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
asdf install nodejs latest
asdf global nodejs latest

# Install Scarb
asdf plugin add scarb https://github.com/sdroege/asdf-scarb.git || true
asdf install scarb latest
asdf global scarb latest

# Install Node app dependencies
npm install
