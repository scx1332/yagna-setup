set -x
cd golem/gvmkit-build-rs
mkdir -p ../binaries
cargo build --release
cp target/release/gvmkit-build ../binaries/
