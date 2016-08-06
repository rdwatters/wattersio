curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
# Build Hugo.

if branch_name="dev"
	then
	hugo --ignoreCache --baseURL=http://dev.ryanwattersio.netlify.com
	echo "In DEV"
	else
	hugo --ignoreCache --baseURL=https://ryanwatters.io
	echo "In PROD"
fi
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json


# echo $(git rev-parse --abbrev-ref --symbolic-full-name @{u})