#!/usr/bin/env bash

set -xe

TO_DEPLOY='develop'
DEPLOYED='master'

if [[ "$1" == '--dry-run' ]]; then
	DRY_RUN='true'
else
	read -p "This action will hard reset $DEPLOYED onto $TO_DEPLOY and force push. Are you sure? (y/n) " -n 1 -r
	echo
	if [[ $REPLY =~ ^[Nn]$ ]];
		then exit
	fi
fi


TMPDIR=$(mktemp -d)
export BUILD_TARGET=$(mktemp -d)
cp -r . $TMPDIR
cd $TMPDIR

git symbolic-ref HEAD refs/heads/$DEPLOYED
git reset --soft $TO_DEPLOY

export NODE_OPTIONS=--openssl-legacy-provider

yarn
yarn run prod

cp -r .git CNAME $BUILD_TARGET/
cd $BUILD_TARGET

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

rm $TMPDIR -rf
if [[ $DRY_RUN != 'true' ]]; then
	rm $BUILD_TARGET -rf
else
	echo "Dry run output can be found here: $BUILD_TARGET"
fi
