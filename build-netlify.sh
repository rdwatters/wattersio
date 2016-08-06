curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
echo $branch_name
# Build Hugo.
hugo --ignoreCache
echo "Moving site-index.html to assets/site-index.json"
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json