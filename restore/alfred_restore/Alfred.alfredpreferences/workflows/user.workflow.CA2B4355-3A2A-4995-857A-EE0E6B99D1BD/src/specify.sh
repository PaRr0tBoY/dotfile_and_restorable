#!/bin/zsh


if [[ $cached -ne 1 ]]; then
	echo -n "{\"rerun\":1,\"items\":[{\"title\":\"Building UTType Cache\",\"valid\":false,\"subtitle\":\"This will only take a few seconds...\"}]}"
else 
	readonly cache="${alfred_workflow_data}"
	local query=$1
	local cmp=("${(@s/./)1}")
	#local icon="\"icon\":{\"type\":\"filetype\",\"path\":\"public.plain-text\"}"
	local icon="\"icon\":{\"path\":\"unk.png\"}"

	if [[ "$#cmp[@]" -gt 1 ]]; then
		query="$cmp[1]"
		d_ext="$cmp[2]"
		[[ -z "$query" ]] && query="untitled"
	elif [[ ! -n $query ]]; then
		query="untitled"
	fi

	if [[ -f "${cache}/proto.$d_ext" ]]; then
		readonly UTI=$(mdls -name kMDItemContentType -raw "${cache}/proto.$d_ext")
		icon="\"icon\":{\"type\":\"filetype\",\"path\":\"$UTI\"}"
	fi 

	# Autocomplete
	subtitle="Create in '$location:r:t'"
	autocomplete="$query.$d_ext" # title+extension

	# guard that some extension has been entered 
	if [[ -n "$cmp[2]" && "$autosuggest" -eq 1 ]]; then
		local extensions=("${(f)$(cat ./src/ext.txt)}")

		# filter on entered file extension
		if [[ -n $d_ext ]]; then
			set -A filtered
			for extension in "${extensions[@]}"; do
				local n="$extension:t"
				[[ -f $extension ]] || n=$extension:t
				if [[ $n = $d_ext* && $n != $d_ext ]]; then 
					#subtitle+="  ·  ⇥ ${query}.$extension" 
					subtitle+="  |  ⇥  ${query}.$extension" 
					autocomplete="${query}.$extension"
					break
				fi
			done
		fi

	fi

	response="{\"items\":[{\"title\":\"$query.$d_ext\",\"arg\":\"$location$query\",\"subtitle\":\"$subtitle\",$icon,\"autocomplete\":\"$autocomplete\",\"mods\":{\"cmd\":{\"subtitle\":\"${location/$HOME/~}\"},\"cmd+shift\":{\"subtitle\":\"Create with Clipboard Contents\",\"variables\":{\"insert_pb\":1}},\"alt+shift\":{\"subtitle\":\"Create without Clipboard Contents\",\"variables\":{\"insert_pb\":0}}}}],\"variables\":{\"d_ext\":\"$d_ext\"}}"

	echo -n $response
fi
