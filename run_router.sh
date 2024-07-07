cd golem/ya-sb-router
cargo build --release -p ya-sb-router --features "bin"
./target/release/ya-sb-router -l tcp://0.0.0.0:5555