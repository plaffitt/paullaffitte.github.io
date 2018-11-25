#!/usr/bin/env bash

read -p "This action will hard reset master onto develop and force push. Are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Nn]$ ]];
	then exit
fi

TMPDIR=$(mktemp -d)

cp . $TMPDIR -R
cd $TMPDIR

git add --all
git stash

git checkout develop
git fetch origin

git checkout master
git reset --hard origin/develop

yarn
yarn run build

sed .gitignore -i -e 's/assets\/js\/\*\.js//' # FIXME remove api/*.json as well
git add --all
git commit -m "build"
git push --force

rm $TMPDIR -rf
