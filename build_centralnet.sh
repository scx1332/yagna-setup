cd golem/ya-service-bus
cargo build --release -p ya-sb-router --features "bin"
cp target/release/ya-sb-router ../binaries/
