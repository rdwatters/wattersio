curdir=$(pwd)
TODAY=$(date)
# Build Hugo.

hugo --ignoreCache --baseURL=https://ryanwatters.io
echo "Moving PROD site-index.html to assets/site-index.json"
echo $(git rev-parse --abbrev-ref --symbolic-full-name @{u})
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json