set -x
mkdir -p golem/downloaded
cd golem/downloaded
wget -qO- https://github.com/golemfactory/yagna/releases/download/pre-rel-v0.16.0-consent/golem-provider-linux-pre-rel-v0.16.0-consent.tar.gz | tar -xvz
wget -qO- https://github.com/golemfactory/yagna/releases/download/pre-rel-v0.16.0-consent/golem-requestor-linux-pre-rel-v0.16.0-consent.tar.gz | tar -xvz
mv golem-provider-linux-pre-rel-v0.16.0-consent/* .
mv golem-requestor-linux-pre-rel-v0.16.0-consent/* .
rm golem-provider-linux-pre-rel-v0.16.0-consent -r
rm golem-requestor-linux-pre-rel-v0.16.0-consent -r

