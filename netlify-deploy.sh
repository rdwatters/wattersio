# HUGO BUILD SITE AND JSON SITE INDEX
# For the blog, this alias is currently set to "blog" in bash
# Assign pwd to curdir variable
curdir=$(pwd)
TODAY=$(date)
# Build Hugo.
hugo
cp ${curdir}/public/singles/index.html ${curdir}/static/assets/site-index.json