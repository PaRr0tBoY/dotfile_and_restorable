#!/bin/zsh

readonly ext="$d_ext"
readonly root="$1"
file="$root.$ext"

touch_it() {
	touch "$file"
	if [[ "$insert_pb" -eq 1 ]]; then 
		echo "$(pbpaste)" >> $file
	fi
	if [[ "$ext" =~ "docx|doc|rtf|rtfd|odt" ]]; then
		local tempfile="${root%/*}/${file:t:r}.txt"
		mv "$file" "$tempfile"
		textutil -convert "$ext" "$tempfile"
		rm "$tempfile"
	fi
}

if [[ "$ext" == "playground" ]]; then
	./src/playground.sh "$file" "$location" 
	exit 1
elif [[ ! -f "$file" ]]; then
	touch_it
else 
	typeset -i num=2
	while true; do
		file="$root $num.$ext"
		[[ -f $file ]] || break
		num+=1
	done
	touch_it
fi

echo -n "$file"
