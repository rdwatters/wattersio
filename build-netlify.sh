curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
# Build Hugo.

if branch_name="dev"
	then
	hugo --ignoreCache --baseURL=http://dev.ryanwattersio.netlify.com
	echo "Moving DEV site-index.html to assets/site-index.json"
	else
	hugo --ignoreCache --baseURL=https://ryanwatters.io
	echo "Moving PROD site-index.html to assets/site-index.json"
fi
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json