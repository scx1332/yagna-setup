set -x
mkdir -p golem/downloaded
cd golem/downloaded
wget -qO- https://github.com/golemfactory/yagna/releases/download/pre-rel-v0.16.0-external-02/golem-provider-linux-pre-rel-v0.16.0-external-02.tar.gz | tar -xvz
wget -qO- https://github.com/golemfactory/yagna/releases/download/pre-rel-v0.16.0-external-02/golem-requestor-linux-pre-rel-v0.16.0-external-02.tar.gz | tar -xvz

mv golem-provider-linux-pre-rel-v0.16.0-external-02/* .
mv golem-requestor-linux-pre-rel-v0.16.0-external-02/* .
rm golem-provider-linux-pre-rel-v0.16.0-external-02 -r
rm golem-requestor-linux-pre-rel-v0.16.0-external-02 -r

wget -qO- https://github.com/golemfactory/ya-runtime-vm/releases/download/v0.3.0/ya-runtime-vm-linux-v0.3.0.tar.gz | tar -xvz
mv ya-runtime-vm-linux-v0.3.0/* plugins/
rm ya-runtime-vm-linux-v0.3.0 -r

wget -qO- https://github.com/golemfactory/ya-service-bus/releases/download/v0.7.2/ya-sb-router-linux-v0.7.2.tar.gz | tar -xvz
mv ya-sb-router-linux-v0.7.2/* .
rm ya-sb-router-linux-v0.7.2 -r

