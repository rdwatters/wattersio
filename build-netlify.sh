curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
echo $branch_name
# Build Hugo.
hugo --ignoreCache
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json