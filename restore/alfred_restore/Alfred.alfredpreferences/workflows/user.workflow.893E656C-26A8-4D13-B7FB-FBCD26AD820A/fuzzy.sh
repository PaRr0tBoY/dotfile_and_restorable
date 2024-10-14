#!/bin/zsh --no-rcs

trimmed() {
	local s2 s="$1"
	until s2="${s#[[:space:]]}"; [ "$s2" = "$s" ]; do s="$s2"; done
	until s2="${s%[[:space:]]}"; [ "$s2" = "$s" ]; do s="$s2"; done
  echo "$s"
}

readonly query=$1
readonly depth=$depth
readonly method="${method//\~/$HOME}"  
readonly paths=("${(f)${search_paths//\~/$HOME}}")

if [[ -z $(trimmed "$query") ]]; then
    echo -n '{"items": [{"title": "Type to search.", "icon": {"path": "icons/info.png"}, "valid": false}]}'
    exit 0
fi

if [[ $enable_folder_search -eq 0 ]]; then
    matches=$(find "${paths[@]}" -maxdepth $depth | "$method" --filter "$query")
else 
    matches=$(find "${paths[@]}" -maxdepth $depth -type d | "$method" --filter "$query")
fi 


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# Match specific file extensions and types (directories, pdfs, etc.)  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# matches=$(find "${paths[@]}" -maxdepth $depth -name '*.app' -o -name '*.pdf' -o -type d | "$method" --filter "$query")

# Guard against empty matches
if [[ -z $matches ]]; then
    echo -n '{"items": [{"title": "No results.", "icon": {"path": "icons/info.png"}, "valid": false}]}'
    exit 0
fi

items='{"items": ['

didMatch=false
while IFS= read -r abspath; do
    abspath=$(trimmed "$abspath")
    filename=$(basename "$abspath")
    # Extra check to only match the actual filenames, not the full path
    if [[ -n $(echo -n "$filename" | "$method" --filter "$query") ]]; then 
        didMatch=true
        abspath_trunc="${abspath//"$HOME"/~}"
        items+="""{
        \"title\": \""$filename:r"\",
        \"subtitle\": \""$abspath_trunc"\",
        \"arg\": \""$abspath"\",
        \"autocomplete\": \""$filename"\",
        \"text\": { \"largetype\": \""$abspath"\" },
        \"type\": \"file:skipcheck\",
        \"icon\": {\"path\": \""$abspath"\", \"type\": \"fileicon\"}"""
        if [[ -d "$abspath" ]]; then
            items+=""",
            \"mods\": {
                \"alt\": {
                    \"valid\": true,
                    \"arg\": \""$abspath"\",
                    \"subtitle\": \"Search '"$abspath_trunc"'\", 
                    \"icon\": {\"path\": \"icon.png\"},
                    \"variables\": {
                        \"trigger\": \"search.scope\",
                        \"scope\": \"Search "$abspath_trunc"\"
                    }
                },
                \"ctrl\": {
                    \"valid\": true,
                    \"arg\": \""$abspath"\",
                    \"subtitle\": \"Browse '"$abspath_trunc"'\", 
                    \"icon\": {\"path\": \"icons/browse.png\"},
                    \"variables\": {
                        \"trigger\": \"browse\"
                    }
                }
            }
            """
        fi
        items+="},"
    fi
done <<< "$matches"

if [[ $didMatch == false ]]; then
    echo -n '{"items": [{"title": "No results.", "icon": {"path": "icons/info.png"}, "valid": false}]}'
    exit 0
fi

response="${items%,}]}"
echo -n "$response"