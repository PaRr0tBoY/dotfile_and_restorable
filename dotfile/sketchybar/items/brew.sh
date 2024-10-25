#!/bin/bash

# Trigger the brew_udpate event when brew update or upgrade is run from cmdline
# e.g. via function in .zshrc

brew=(
	icon=􀐛
	label=?
	label.font="$FONT:Bold:13.0"
	icon.color=$MAGENTA
	script="$PLUGIN_DIR/brew.sh"
	click_script="$PLUGIN_DIR/brew_update.sh"
	padding_left=10
	update_freq=60
)

sketchybar --add event brew_update \
	--add item brew right \
	--set brew "${brew[@]}" \
	--subscribe brew brew_update
