curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
# Build Hugo.
hugo --ignoreCache
if branch_name="dev"
	then
	echo "Moving site-index.html to assets/site-index.json ${branch_name}"
fi
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json