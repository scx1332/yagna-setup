cd golem/yagna
cargo build --all
mkdir -p ../binaries/plugins
cp target/debug/yagna ../binaries/
cp target/debug/exe-unit ../binaries/plugins/
cp target/debug/ya-provider ../binaries/
cp target/debug/gftp ../binaries/
cp target/debug/golemsp ../binaries/