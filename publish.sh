#!/usr/bin/env bash

TO_DEPLOY='develop'
DEPLOYED='master'

read -p "This action will hard reset $DEPLOYED onto $TO_DEPLOY and force push. Are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Nn]$ ]];
	then exit
fi

TMPDIR=$(mktemp -d)

cp . $TMPDIR -R
cd $TMPDIR

git add --all
git stash

git checkout $TO_DEPLOY
git fetch origin

git checkout $DEPLOYED
git reset --hard origin/$TO_DEPLOY

yarn
yarn run re

sed .gitignore -i -e 's/assets\/js\/\*\.js//'
sed .gitignore -i -e 's/api\/\*\.json//'

git add --all
git commit -m "build"
git push --force
buildedHash=$(git log $DEPLOYED --oneline --pretty=format:"%h" -2 | awk 'NR==2')
lastTag=$(git tag | grep -P "\d*-\d{4}-\d{2}-\d{2}" | tail -n1 | cut -d'-' -f1)
tag=$(echo "$lastTag + 1" | bc)-$(date +%Y-%m-%d)
git tag $tag $buildedHash
git push origin $tag

rm $TMPDIR -rf
