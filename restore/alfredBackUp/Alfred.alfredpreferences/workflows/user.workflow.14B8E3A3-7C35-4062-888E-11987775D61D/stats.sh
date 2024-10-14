#!/bin/zsh
readonly file="$1"
readonly displayname=$file:t:r
readonly format=$file:t:e
readonly height=$(mdls -name kMDItemPixelHeight -r "$file")
readonly width=$(mdls -name kMDItemPixelWidth -r "$file")
typeset -i split3=$(($height/1.5))
typeset -i split4=$(($width/1.5))
typeset -i split5=$(($height/2))
typeset -i split6=$(($width/2))
typeset -i split7=$(($height/3))
typeset -i split8=$(($width/3))
echo -n "$height\t$width\t$split3\t$split4\t$split5\t$split6\t$split7\t$split8\t$displayname\t$format\t$file"