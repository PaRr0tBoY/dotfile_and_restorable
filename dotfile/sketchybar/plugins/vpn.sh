#!/bin/bash

source "$CONFIG_DIR/icons.sh"
source "$CONFIG_DIR/colors.sh"

VPN=$(networksetup -getwebproxy "Wi-Fi" | awk '/Enabled/{print $2}' | sed 's/Proxy//g')

PORT=$(networksetup -getwebproxy "Wi-Fi" | awk '/Port:/{print $2}')

if [[ $VPN = "Yes" ]]; then
  sketchybar -m --set vpn icon=$VPN_ON \
                          icon.color=$MAGENTA \
                          drawing=on
else
  sketchybar -m --set vpn icon=$VPN_OFF \
                          icon.color=$RED \
                          drawing=on
fi
