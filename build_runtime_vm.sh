set -x
cd golem/ya-runtime-vm
cargo build
mkdir ../binaries/runt
mkdir ../binaries/runt/ya-runtime-vm
cp target/debug/ya-runtime-vm ../binaries/runt/ya-runtime-vm/
cp -r runtime/poc/runtime ../binaries/runt/ya-runtime-vm/
cp runtime/image/self-test.gvmi ../binaries/ya-runtime-vm/runtime/
cp runtime/init-container/initramfs.cpio.gz ../binaries/ya-runtime-vm/runtime/
cp runtime/init-container/vmlinuz-virt ../binaries/ya-runtime-vm/runtime/



