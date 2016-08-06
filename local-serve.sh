# HUGO BUILD SITE AND JSON SITE INDEX
# For the blog, this alias is currently set to "blog" in bash
# Assign pwd to curdir variable
curdir=$(pwd)
TODAY=$(date)
git checkout dev
# Build Hugo.
hugo --ignoreCache --baseURL=http://localhost:1313
cp ${curdir}/public/singles/index.html ${curdir}/static/assets/site-index.json
rm -rf public
open -a Google\ Chrome.app http://localhost:1313;
hugo serve --buildDrafts=true --buildFuture=true