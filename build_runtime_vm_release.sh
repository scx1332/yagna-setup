set -x
cd golem/ya-runtime-vm
cargo build --release
mkdir -p ../binaries/plugins/ya-runtime-vm/runtime
cp target/debug/ya-runtime-vm ../binaries/plugins/ya-runtime-vm/
cp runtime/conf/ya-runtime-vm.json ../binaries/plugins/
cp -r runtime/poc/runtime ../binaries/plugins/ya-runtime-vm/
cp ../ya-self-test-img/dummy/self-test.gvmi ../binaries/plugins/ya-runtime-vm/runtime/
cp runtime/init-container/initramfs.cpio.gz ../binaries/plugins/ya-runtime-vm/runtime/
cp runtime/init-container/vmlinuz-virt ../binaries/plugins/ya-runtime-vm/runtime/



