curdir=$(pwd)
TODAY=$(date)
branch_name=$(git rev-parse --abbrev-ref --symbolic-full-name @{u})
# Build Hugo.

hugo --ignoreCache --baseURL=https://ryanwatters.io
echo "Moving PROD site-index.html to assets/site-index.json"
echo ${branch_name}
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json