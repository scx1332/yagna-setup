mkdir -p golem/requestor
mkdir -p golem/provider
cp common.env golem/requestor/.env
cp common.env golem/provider/.env

cat provider.env >> golem/provider/.env
cat requestor.env >> golem/requestor/.env

