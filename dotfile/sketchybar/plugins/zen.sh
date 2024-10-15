#!/bin/bash

zen_on() {
  sketchybar --set wifi drawing=off \
             --set apple.logo drawing=off \
             --set '/cpu.*/' drawing=off \
             --set calendar icon.drawing=off \
             --set front_app drawing=off \
             --set volume_icon drawing=off \
             --set brew drawing=off \
             --set volume drawing=off \
             --set github.bell drawing=off \
             --set weather drawing=off \
             --set music drawing=off \
             --set wechat drawing=off \
             --set vpn drawing=off \
             --set space_creator drawing=off \
             --set "控制中心,Bluetooth" drawing=off \
             --set "iStat Menus Menubar,com.bjango.istatmenus.memory" drawing=off \
             --set "iStat Menus Menubar,com.bjango.istatmenus.cpu" drawing=off
}

zen_off() {
  sketchybar --set wifi drawing=on \
             --set apple.logo drawing=on \
             --set '/cpu.*/' drawing=on \
             --set calendar icon.drawing=on \
             --set front_app drawing=on \
             --set volume_icon drawing=on \
             --set brew drawing=on \
             --set volume drawing=on \
             --set github.bell drawing=on \
             --set weather drawing=on \
             --set music drawing=on \
             --set wechat drawing=on \
             --set vpn drawing=on \
             --set space_creator drawing=on \
             --set "控制中心,Bluetooth" drawing=on \
             --set "iStat Menus Menubar,com.bjango.istatmenus.memory" drawing=on \
             --set "iStat Menus Menubar,com.bjango.istatmenus.cpu" drawing=on
}

if [ "$1" = "on" ]; then
  zen_on
elif [ "$1" = "off" ]; then
  zen_off
else
  if [ "$(sketchybar --query apple.logo | jq -r ".geometry.drawing")" = "on" ]; then
    zen_on
  else
    zen_off
  fi
fi
