curdir=$(pwd)
TODAY=$(date)
# Build Hugo.
hugo --ignoreCache
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json