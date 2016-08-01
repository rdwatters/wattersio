curdir=$(pwd)
TODAY=$(date)
# Build Hugo.
hugo --ignoreCache --baseURL=https://ryanwatters.io
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json
open -a Google\ Chrome.app http://localhost:1313;
hugo serve --buildDrafts=true --buildFuture=true