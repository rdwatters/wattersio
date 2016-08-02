# HUGO BUILD SITE AND JSON SITE INDEX
# For the blog, this alias is currently set to "blog" in bash
# Assign pwd to curdir variable
curdir=$(pwd)
TODAY=$(date)
git checkout master
git merge dev

echo "Deployment: $TODAY" >> deploy.txt
# Add changes to git and push to remote origin master
git add .
git commit -m "${1:-No commit message added for Netlify Deploy}"
git push