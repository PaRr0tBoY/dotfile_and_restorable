#!/bin/zsh

readonly place=$(
cat <<EOF | osascript
    tell application "Finder"
        if exists Finder window 1 then
            return POSIX path of (target of Finder window 1 as alias)
        else
            return POSIX path of "${fallback}"
        end if
    end tell
EOF
)

if [[ $cached -ne 1 ]]; then
	open -b "com.runningwithcrayons.Alfred" alfred://runtrigger/com.zeitlings.mkfile/build
	exit 1
else
    if [[ $posthaste -eq 1 ]]; then
        readonly ext="${d_ext}"
        local base="untitled"
        local file="$place$base.$ext"

        # New Xcode Playground
        if [[ "$ext" == "playground" ]]; then
            ./src/playground.sh "$file" "$place"
            exit 1
        fi
        
        if [[ ! -f "$file" ]]; then 
            touch "$file"
        else
            typeset -i num=2
            while : ; do
                file="$place$base $num.$ext"
                [[ -f "$file" ]] || break
                num+=1
            done
            touch "$file"
        fi
        
        if [[ "$insert_pb" -eq 1 ]]; then
			echo "$(pbpaste)" >> $file
        fi
        
        if [[ "$ext" =~ "docx|doc|rtf|rtfd|odt" ]]; then
            local tempfile="${file%/*}/${file:t:r}.txt"
            mv "$file" "$tempfile"
            textutil -convert "$ext" "$tempfile"
            rm "$tempfile"
        fi

        echo -n "$place\t$file"
        exit 1
    fi

    echo -n "$place"
fi
