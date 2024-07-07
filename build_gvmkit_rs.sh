set -x
cd golem/gvmkit-build-rs
cargo build --release
cp target/release/gvmkit-build ../binaries/
