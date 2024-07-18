cd golem/yagna
cargo build --all --target x86_64-unknown-linux-musl --features "static-openssl"
mkdir -p ../binaries/plugins
cp target/x86_64-unknown-linux-musl/debug/yagna ../binaries/
cp target/x86_64-unknown-linux-musl/debug/exe-unit ../binaries/plugins/
cp target/x86_64-unknown-linux-musl/debug/ya-provider ../binaries/
cp target/x86_64-unknown-linux-musl/debug/gftp ../binaries/
cp target/x86_64-unknown-linux-musl/debug/golemsp ../binaries/