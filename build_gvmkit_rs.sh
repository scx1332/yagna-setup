#!/bin/bash
set -e
set -x
cd golem/gvmkit-build-rs
mkdir -p ../binaries
cargo build --release --target x86_64-unknown-linux-musl
cp target/x86_64-unknown-linux-musl/release/gvmkit-build ../binaries/
