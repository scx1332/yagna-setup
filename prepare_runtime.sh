set -x
mkdir -p golem/requestor
mkdir -p golem/provider_0
cp common.env golem/requestor/.env
cp common.env golem/provider_0/.env

cat provider.env >> golem/provider_0/.env
cat requestor.env >> golem/requestor/.env

