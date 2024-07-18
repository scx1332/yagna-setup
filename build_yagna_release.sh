#!/bin/bash
set -e
cd golem/yagna
cargo build --all --release --target x86_64-unknown-linux-musl --features "static-openssl"
mkdir -p ../binaries/plugins
cp target/x86_64-unknown-linux-musl/release/yagna ../binaries/
cp target/x86_64-unknown-linux-musl/release/exe-unit ../binaries/plugins/
cp target/x86_64-unknown-linux-musl/release/ya-provider ../binaries/
cp target/x86_64-unknown-linux-musl/release/gftp ../binaries/
cp target/x86_64-unknown-linux-musl/release/golemsp ../binaries/