#!/bin/bash

QUERY="$1"
ARG="$2"

py3=$(command -v python3)

###################################
## 1. LIST APPS TO EXTRACT ICONS ##
###################################

if [[ "$ARG" == "--start" ]]; then
	LIST=$(find /Applications -maxdepth 2 | egrep -i "\.app$" | grep -i "$QUERY")
	LIST+=$(find /System/Applications -maxdepth 2 | egrep -i "\.app$" | grep -i "$QUERY")

	echo '<?xml version="1.0"?><items>
		<item>
			<arg>online^'$QUERY'</arg>
			<title>Search app icons online</title>
			<subtitle>Switch to online search in App Store and Mac App Store</subtitle>
		</item>'
	while IFS= read -r line
	do
	appnm=$(basename "$line" | sed 's|.app||g')
	echo '<item>
			<arg>'$line'</arg>
			<title>'$appnm'</title>
			<icon type="fileicon">'$line'</icon>
		</item>'
	done <<< "$LIST"
	echo '</items>'

###################################
##     2. LIST ICONS TO FILE     ##
###################################

elif [[ "$ARG" == "--extract" ]]; then
	qr=$(echo "$QUERY" | awk -F'^' '{print $1}')
	argument=$(echo "$QUERY" | awk -F'^' '{print $2}')

	if [[ "$qr" == "online" ]]; then
		osascript -e 'tell application id "com.runningwithcrayons.Alfred" to run trigger "online" in workflow "com.mcskrzypczak.extracticon" with argument "'"$argument"'"'
	else
		appicon=$($py3 acpython.py "$QUERY/Contents/Info.plist" --local --icon)
		appicon=${appicon//.icns/}
		appname=$($py3 acpython.py "$QUERY/Contents/Info.plist" --local --name)
			
		sips -s format png "$QUERY/Contents/Resources/$appicon.icns" --out "$HOME/Desktop/$appname.png"

		osascript -e 'tell application id "com.runningwithcrayons.Alfred" to run trigger "notify" in workflow "com.mcskrzypczak.extracticon" with argument "'"$HOME/Desktop/$appname.png"'"'
	fi

###################################
##  3. DOWNLOAD ICON TO DESKTOP  ##
###################################

elif [[ "$ARG" == "--download" ]]; then
	IMGURL=$(echo "$QUERY" | awk -F'^' '{print $1}')
	IMGEXT=$(echo "$IMGURL" | awk -F'.' '{print $NF}')
	APPNM=$(echo "$QUERY" | awk -F'^' '{print $2}')
	DEV=$(echo "$QUERY" | awk -F'^' '{print $3}')

	curl -o "$HOME/Desktop/$APPNM-$DEV.$IMGEXT" "$IMGURL"

	if [[ "$IMGEXT" == "jpg" ]] || [[ "$IMGEXT" == "jpeg" ]]; then
		sips -s format png "$HOME/Desktop/$APPNM-$DEV.$IMGEXT" --out "$HOME/Desktop/$APPNM-$DEV.png"
		rm "$HOME/Desktop/$APPNM-$DEV.$IMGEXT"
		IMGEXT="png"
	fi

	if [[ "$DEV" == "iOS" ]]; then
		$py3 mask.py "$HOME/Desktop/$APPNM-$DEV.$IMGEXT"
		rm "$HOME/Desktop/$APPNM-$DEV.$IMGEXT"
		mv "$HOME/Desktop/$APPNM-$DEV".png.png "$HOME/Desktop/$APPNM-$DEV".png
	fi

fi