# HUGO BUILD SITE AND JSON SITE INDEX
# Assign pwd to curdir variable
curdir=$(pwd)
# Build Hugo. It's okay if there are dupes in the publishdir ("public") because we are just looking for the newest site-index.html anyway
hugo
cp ${curdir}/public/singletons/index.html ${curdir}/static/assets/site-index.json
cd $curdir
# Cleans out Build Directory "Public" if it exists
if [ -d "public" ]; then
	rm -rf public
fi
# "Image copy" = copies all images in "content" to /static/images/ before running the server. NOTE:
# 1. This requires additional client-side tweaks so that images still serve correctly to the browser.
# 2. This is based on the assumption that content md files reference images from relative images directory: eg, ![my alt text](images/my-image.jpg)
# Begin Image copy
find ${curdir}/content \( -iname '*.jpg' -o -iname '*.png' -o -iname '*.gif' \) -type f -exec cp -v -- {} ${curdir}/static/assets/images/ \;
# End Image copy
# Open Google Chrome
open -a Google\ Chrome.app http://localhost:1313
hugo server --ignoreCache