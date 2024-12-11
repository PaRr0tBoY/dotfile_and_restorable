#!/bin/bash

# curl -s "https://github-contributions.now.sh/api/v1/$1" | /opt/homebrew/bin/jq -r '[.contributions[] | select ( .date | strptime("%Y-%m-%d") | mktime < now)][:7]| .[].color'

if [ $# -eq 0 ]
  then
    echo "No arguments provided"
    exit 1
fi


curl -s "https://github.com/$1"  | grep -o 'data-level="[0-9]"' | grep -o "[0-9]"