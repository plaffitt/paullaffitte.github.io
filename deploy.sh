#!/usr/bin/env bash

TO_DEPLOY='develop'
DEPLOYED='master'

if [[ "$1" == '--dry-run' ]]; then
	DRY_RUN=true
else
	read -p "This action will hard reset $DEPLOYED onto $TO_DEPLOY and force push. Are you sure? (y/n) " -n 1 -r
	echo
	if [[ $REPLY =~ ^[Nn]$ ]];
		then exit
	fi
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

rm -rfv $(ls -a | grep -v 'build' | grep -v '.git')
mv build/** .
rm -d build

git add --all
git commit -m "build"
if [[ $DRY_RUN != 'true' ]]; then
	git push --force
fi
buildedHash=$(git log $DEPLOYED --oneline --pretty=format:"%h" -2 | awk 'NR==2')
lastTag=$(git tag | grep -P "\d*-\d{4}-\d{2}-\d{2}" | tail -n1 | cut -d'-' -f1)
tag=$(echo "$lastTag + 1" | bc)-$(date +%Y-%m-%d)
git tag $tag $buildedHash
if [[ $DRY_RUN != 'true' ]]; then
	git push origin $tag
fi

if [[ $DRY_RUN != 'true' ]]; then
	rm $TMPDIR -rf
else
	echo "Dry run output can be found here: $TMPDIR"
fi
