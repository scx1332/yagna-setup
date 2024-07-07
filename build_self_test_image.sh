cd golem/ya-self-test-img/dummy
docker build -t ya-self-test-img .
../../binaries/gvmkit-build --output self-test.gvmi ya-self-test-img