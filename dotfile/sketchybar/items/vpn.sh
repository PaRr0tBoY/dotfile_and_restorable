sketchybar -m --add item vpn right \
              --set vpn icon=$VPN_OFF \
			            icon.font="$FONT:Bold:14.0" \
			  			label.font="$FONT:Black:12.0" \
                        script="$PLUGIN_DIR/vpn.sh" \
                        update_freq=5 \
                        icon.padding_left=0 \
                        label.padding_right=-5
