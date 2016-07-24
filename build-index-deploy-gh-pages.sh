# HUGO BUILD SITE AND JSON SITE INDEX
# For the blog, this alias is currently set to "blog" in bash
# Assign pwd to curdir variable
curdir=$(pwd)
TODAY=$(date)
# Build Hugo.
hugo --ignoreCache --baseURL=https://ryanwatters.io
cp ${curdir}/public/singletons/index.html ${curdir}/public/assets/site-index.json
rm -rf ${curdir}/public/singletons
cd $curdir

yes | cp -rf public/* ~/Desktop/GitHub/rdwatters.github.io
rm -rf public
cd ~/Desktop/GitHub/rdwatters.github.io
echo "Deployment: $TODAY" >> deploy.txt
# Push changes to GH Pages Repo
git add .
git commit -m "${1:-No commit message added for blog deploy}"
git push