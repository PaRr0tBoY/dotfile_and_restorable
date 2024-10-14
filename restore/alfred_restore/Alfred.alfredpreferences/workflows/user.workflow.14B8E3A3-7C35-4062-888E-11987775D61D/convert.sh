#!/bin/zsh
readonly scale="$1"
readonly displayname="$split9"
readonly format="$split10"
readonly file="$split11"
readonly location=$file:h

local output="$location/$displayname.gif"
if [[ -f "$output" ]]; then
    typeset -i num=2
    while : ; do
        output="$location/$displayname $num.gif"
        [[ -f $output ]] || break
        num+=1
    done
fi

ffmpeg -v quiet -i "$file" -filter_complex "[0:v] fps="$fps",scale="$scale":-1,split [a][b];[a] palettegen [p];[b][p] paletteuse" "$output"

if [[ "$open" -ne 1 ]]; then
    open -R "$output"
else
    open "$output"
fi
