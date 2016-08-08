curdir=$(pwd)
TODAY=$(date)
branch_name=$(git symbolic-ref --short -q HEAD)
# Build Hugo.

hugo --ignoreCache
cp ${curdir}/public/singles/index.html ${curdir}/public/assets/site-index.json

# onething="yes"
# twothing="yes"
# if [ $onething = "yes" ]
# 	then
# 	echo "you are correct"
# fi


# echo $(git rev-parse --abbrev-ref --symbolic-full-name @{u})