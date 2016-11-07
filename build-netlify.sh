curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
# Build Hugo.

hugo --ignoreCache
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json
