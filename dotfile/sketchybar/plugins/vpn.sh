#!/bin/bash

source "$CONFIG_DIR/icons.sh"
source "$CONFIG_DIR/colors.sh"

VPN=$(networksetup -getwebproxy "Wi-Fi" | awk '/Enabled/{print $2}' | sed 's/Proxy//g')

PORT=$(networksetup -getwebproxy "Wi-Fi" | awk '/Port:/{print $2}')

if [[ $VPN = "Yes" ]]; then
  sketchybar -m --set vpn icon=$VPN_ON \
                          icon.color=$BLUE \
                          label="1" \
                          drawing=on
else
  sketchybar -m --set vpn icon=$VPN_OFF \
                          icon.color=$RED \
                          label="0" \
                          drawing=on
fi
