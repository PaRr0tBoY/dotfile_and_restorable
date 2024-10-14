#!/bin/zsh

playground_dir="$1"
playground_name="${playground_dir:t:r}"
finder_location="$2"
contents="import Cocoa

"
 
if [[ "$insert_pb" -eq 1 ]]; then
    contents+="$(pbpaste)"
else 
    contents+="var greeting = \"Hello, playground\""
fi

# xyz.playground is considered a directory
if [[ ! -d "$playground_dir" ]]; then 
    mkdir -p "$playground_dir"
else
    typeset -i num=2
    while : ; do
        playground_dir="${finder_location}${playground_name} $num.playground"
        [[ -d "$playground_dir" ]] || break
        num+=1
    done
    mkdir -p "$playground_dir"
fi

cat <<EOF > "$playground_dir/Contents.swift"
${contents}
EOF

cat <<EOF > "$playground_dir/contents.xcplayground"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<playground version='5.0' target-platform='macos' buildActiveScheme='true' executeOnSourceChanges='false' importAppTypes='true'>
    <timeline fileName='timeline.xctimeline'/>
</playground>
EOF

if [[ $posthaste -eq 1 ]]; then
    echo -n "$finder_location\t$playground_dir"
else 
    echo -n "$playground_dir"
fi
