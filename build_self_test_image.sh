#!/bin/bash
set -e
cd golem/ya-self-test-img/dummy
mkdir -p ../../binaries/plugins/ya-runtime-vm/runtime
docker build -t ya-self-test-img .
../../binaries/gvmkit-build --output self-test.gvmi ya-self-test-img
cp self-test.gvmi ../../binaries/plugins/ya-runtime-vm/runtime/
