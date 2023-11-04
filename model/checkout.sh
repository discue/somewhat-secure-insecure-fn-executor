#!/bin/bash

set -ex

declare -r categories=("jsfuck" "jjencode" "uglify" "obfuscate" "jsconfuser" "jsconfuser-minified" "sake")

cd model

mkdir -p training/plain
for item in "${categories[@]}"; do
    mkdir -p training/$item
done

mkdir -p test/plain
for item in "${categories[@]}"; do
    mkdir -p test/$item
done

mkdir -p export

if [[ ! -d "jquery" ]]; then
    git clone --depth=1 https://github.com/jquery/jquery
fi

if [[ ! -d "Leaflet" ]]; then
    git clone --depth=1 https://github.com/Leaflet/Leaflet
fi

if [[ ! -d "svelte" ]]; then
    git clone --depth=1 https://github.com/sveltejs/svelte
fi

if [[ ! -d "mocha" ]]; then
    git clone --depth=1 https://github.com/mochajs/mocha
fi

find . -wholename "./jquery/src/**.js" -exec cp {} ./training/plain/ \;
find . -wholename "./mocha/lib/**.js" -exec cp {} ./training/plain/ \;
find . -wholename "./svelte/packages/svelte/src/**.js" -exec cp {} ./training/plain/ \;
find . -wholename "./Leaflet/src/**.js" -exec cp {} ./test/plain/ \;

for item in "${categories[@]}"; do
    node ./encode-w-"$item".js training
done

for item in "${categories[@]}"; do
    node ./encode-w-"$item".js test
done