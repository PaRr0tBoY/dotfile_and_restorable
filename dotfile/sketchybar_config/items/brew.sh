#!/bin/bash

# Trigger the brew_udpate event when brew update or upgrade is run from cmdline
# e.g. via function in .zshrc

brew=(
	update_freq=180
	icon=􀐛
	label=0
	label.font="$FONT:Bold:13.0"
	script="$PLUGIN_DIR/brew.sh"
	click_script="$PLUGIN_DIR/brew_update.sh"
	padding_left=-7
)

sketchybar --add event brew_update \
	--add item brew right \
	--set brew "${brew[@]}" \
	--subscribe brew brew_update
