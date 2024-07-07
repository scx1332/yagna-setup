cd golem/yagna
cargo build --all --release
mkdir -p ../binaries/plugins
cp target/release/yagna ../binaries/
cp target/release/exe-unit ../binaries/plugins/
cp target/release/ya-provider ../binaries/
cp target/release/gftp ../binaries/
cp target/debug/golemsp ../binaries/