#!/bin/zsh -f

readonly paths=("$@")
readonly loc='/tmp/togif/'
#[[ -d $loc ]] && { rm -r $loc }
mkdir $loc

typeset -i num=1
local extension="png" #assert that all input images have the same file extension
# TODO: Convert everything to png with sips
for path in "${paths[@]}"; do
    local ext=$path:e
    extension=$ext
    local seq="0$num"
    [[ $num -gt 9 ]] && seq="$num"
    /bin/cp "$path" "${loc}pic$seq.$ext"
    num+=1
done

readonly base="$HOME/Desktop/output"
local output="${base}.gif"
if [[ -f "$output" ]]; then
    typeset -i num=2
    while : ; do
        output="${base} $num.gif"
        [[ -f $output ]] || break
        num+=1
    done
fi

# 100/50=2 fps, 100/100=1 fps
/opt/homebrew/bin/convert -delay 100 ${loc}*."${extension}"(n) "$output" 

#/opt/homebrew/bin/ffmpeg -v quiet -f image2 -framerate 1 -i /tmp/togif/pic%02d."$extension" "$output"
#/opt/homebrew/bin/ffmpeg -f image2 -framerate 1 -i /tmp/togif/pic%02d."$extension" "$output"

#[[ -d $loc ]] && { rm -r $loc }
/bin/rm -r $loc
/usr/bin/open -R "$output"

##/opt/homebrew/bin/ffmpeg -f image2 -framerate 1 -i /tmp/togif/pic%02d."$extension" -vf palettegen=reserve_transparent=1 "$output" # fails
##/opt/homebrew/bin/ffmpeg -f image2 -framerate 1 -i /tmp/togif/pic%02d."$extension" -vf -gifflags +transdiff "$output"

exit 1

readonly file='/tmp/concat_list.txt'
[[ -f $file ]] && rm $file
readonly paths=("$@")
for path in "${paths[@]}"; do
	#echo "$path" >> $file
    #printf '"%s"\n' "$path" >> "$file"
    #printf '"%s"\n' "${path// /\\ }" >> "$file"
	echo "file '$path'" >> $file
	#echo -n "file '$path'\n" >> $file
done
/usr/bin/sed -i -e '$a\' $file

local output="$HOME/Desktop/output.gif"
if [[ -f "$output" ]]; then
    typeset -i num=2
    while : ; do
        output="$HOME/Desktop/output $num.gif"
        [[ -f $output ]] || break
        num+=1
    done
fi

##/usr/bin/touch "$output"

#ffmpeg -v quiet -framerate 6 -f concat -safe 0 -i $file -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -r 10 "$output"
#/opt/homebrew/bin/ffmpeg -framerate 6 -f concat -safe 0 -y -i "$file" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -r 10 "$output"
#/opt/homebrew/bin/ffmpeg --enable-demuxer=image2 -framerate 6 -f concat -safe 0 -i "$file" -y "$output" 
#/opt/homebrew/bin/ffmpeg -framerate 6 -f concat -safe 0 -i "$file" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -r 10 "$output"
#/opt/homebrew/bin/ffmpeg -f concat -safe 0 -i "$file" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -r 1 "$output"
#/opt/homebrew/bin/ffmpeg -f concat -safe 0 -i "$file" -c copy -r 1 "$output"
/opt/homebrew/bin/ffmpeg -f concat -safe 0 -i "$file" -r 1 -y "$output"

/usr/bin/open -R "$output"