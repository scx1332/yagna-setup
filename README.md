# Use debian based system (preferably ubuntu)

* Won't work on apple systems
* On Windows it can work with WSL2, but it is a lot of pain and this tutorial won't cover it
* Payments are disabled, so no payment testing for now

# Install build dependencies (especially for ya-runtime-vm)

```bash
sudo apt-get install build-essential
sudo apt-get install musl-tools
sudo apt-get install autoconf
sudo apt-get install libtool
sudo apt-get install gperf
```

add your user to kvm group, otherwise you won't be able to run ya-runtime-vm without root privileges
```bash
sudo adduser $USER kvm
```
note!: you need to reboot to apply the changes (probably logout and login is enough, but didn't test it)

## Clone the repositories

```bash
mkdir golem
cd golem

# clone ya-runtime-vm
git lfs install
git clone https://github.com/golemfactory/ya-runtime-vm.git
(cd ya-runtime-vm && git submodule update --init --recursive)

# clone self test image
git clone https://github.com/golemfactory/ya-self-test-img.git

# clone yapapi
git clone https://github.com/golemfactory/yapapi.git

# clone ya-service-bus
git clone https://github.com/golemfactory/ya-service-bus.git

# clone ya-relay
git clone https://github.com/golemfactory/ya-relay.git

# clone ya-runtime-rs
git clone https://github.com/golemfactory/gvmkit-build-rs.git

# clone yagna
git clone https://github.com/golemfactory/yagna.git
```

# First step run router locally, this will let you run services locally

Run it in screen or separate terminal
```bash
cd golem/ya-sb-router
cargo build --release -p ya-sb-router --features "bin"
./target/release/ya-sb-router -l tcp://0.0.0.0:5555
```

# Build ya-runtime-vm

```bash
cd golem/ya-runtime-vm
cargo build
cp target/debug/ya-runtime-vm ../binaries/
```

# Build yagna binaries

```bash
cd golem/yagna
cargo build
cp target/debug/yagna ../binaries/
cp target/debug/exe-unit ../binaries/
cp target/debug/ya-provider ../binaries/
cp target/debug/gftp ../binaries/
```


