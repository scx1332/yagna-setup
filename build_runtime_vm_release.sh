set -x
cd golem/ya-runtime-vm
mkdir -p ../binaries/plugins/ya-runtime-vm/runtime
(cd runtime/init-container && make)
cp runtime/conf/ya-runtime-vm.json ../binaries/plugins/
cp -r runtime/poc/runtime ../binaries/plugins/ya-runtime-vm/
cp runtime/init-container/initramfs.cpio.gz ../binaries/plugins/ya-runtime-vm/runtime/
cp runtime/init-container/vmlinuz-virt ../binaries/plugins/ya-runtime-vm/runtime/
cargo build --target x86_64-unknown-linux-musl --release
cp target/x86_64-unknown-linux-musl/release/ya-runtime-vm ../binaries/plugins/ya-runtime-vm/


