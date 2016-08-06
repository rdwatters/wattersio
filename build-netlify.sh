curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
# Build Hugo.

if [ $branch_name = "dev"]
	then
	hugo --ignoreCache --baseURL=http://dev.ryanwattersio.netlify.com
	echo "In DEV - moving singles index.html to site-index.json"
	else
	hugo --ignoreCache --baseURL=https://ryanwatters.io
	echo "In PROD - moving singles index.html to site-index.json"
fi
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json

# onething="yes"
# twothing="yes"
# if [ $onething = "yes" ]
# 	then
# 	echo "you are correct"
# fi


# echo $(git rev-parse --abbrev-ref --symbolic-full-name @{u})