# Use debian based system (preferably ubuntu)

* Won't work on apple systems
* On Windows it can work with WSL2, but it is a lot of pain and this tutorial won't cover it

# Install build dependencies

```bash
sudo apt-get install build-essential
sudo apt-get install musl-tools
sudo apt-get install autoconf
```

## Clone the repositories

```bash
mkdir golem
cd golem

# prepare binaries directory
mkdir binaries

# clone ya-runtime-vm
git clone https://github.com/golemfactory/ya-runtime-vm.git
cd ya-runtime-vm
git submodule update --init --recursive
cd ..

# clone yajsapi
git clone https://github.com/golemfactory/yajsapi.git

# clone yapapi
git clone https://github.com/golemfactory/yapapi.git

# clone yaclient
git clone https://github.com/golemfactory/ya-service-bus.git

# clone yaservicebus
git clone https://github.com/golemfactory/ya-service-bus.git

# clone ya-relay
git clone https://github.com/golemfactory/ya-relay.git

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

# Build yagna binaries

```bash
cd golem/yagna
cargo build
cp target/debug/yagna ../binaries/
cp target/debug/exe-unit ../binaries/
cp target/debug/ya-provider ../binaries/
cp target/debug/gftp ../binaries/
```
