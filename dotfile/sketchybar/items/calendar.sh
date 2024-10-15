#!/bin/bash

sketchybar --add item calendar right \
  --set calendar \
  script=$PLUGIN_DIR/calendar.sh \
  label="$(LC_TIME=en_US.UTF-8 /bin/bash -c "date '+%b. %d %H:%M'")" \
  label.font="SF Pro:Semibold:12.0" \
  click_script="$PLUGIN_DIR/zen.sh" \
  background.height=25 \
  padding_left=0 \
  padding_right=0 \
  #background.color=0xff232136 \
  update_freq=1