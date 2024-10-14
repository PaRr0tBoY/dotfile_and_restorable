#!/bin/bash

# === Configuration ===
source "$HOME/.config/sketchybar/colors.sh"

# === Get Current Date and Time ===
LC_TIME=en_US.UTF-8 CURRENT_DATETIME=$(date '+%b.%d %H:%M')

# === Update Sketchybar Item ===
HOUR=$(date +%H)
if [ $HOUR -ge 9 ] && [ $HOUR -lt 17 ]; then
  ICON="􀆭"
  COLOR=$SUN_COLOR
elif [ $HOUR -ge 17 ] && [ $HOUR -lt 19 ]; then
  ICON="􀆴"
  COLOR=$SUN_RISE_SET_COLOR
elif [ $HOUR -ge 5 ] && [ $HOUR -lt 9 ]; then
  ICON="􀆱"
  COLOR=$SUN_RISE_SET_COLOR
else
  ICON="􀇀"
  COLOR=$MOON_COLOR
fi

sketchybar --set $NAME \
  label="$CURRENT_DATETIME" \
  label.font="SF Pro:Semibold:13.0" \
  icon.padding_left=10 \
  label.padding_right=10 \
  icon="$ICON" \
  icon.color=$COLOR
