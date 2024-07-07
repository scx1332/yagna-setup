set -x
mkdir -p ../binaries
cd golem/gvmkit-build-rs
cargo build --release
cp target/release/gvmkit-build ../binaries/
