#!/bin/zsh

# R E T I N A OR E X T E R N A L

desktop=$(system_profiler SPDisplaysDataType | grep -c 'Retina')
if [ "$desktop" -gt 0 ]; then
    echo "You are on a Retina display. Prepare launch"
    display_type="You’re On Retina Display"
    content="Launching Notch Nook And Swish"
    pkill NotchNook && pkill Swish
    open -a 'Swish'
    open -a 'NotchNook'
    open -a 'MiddleClick'
else
    echo "You are using an external display. Executing pkill commands."
    display_type="You’re On External Display"
    content="Killing Notch Nook And Swish"
    pkill NotchNook
    pkill Swish
    pkill MiddleClick
fi

# R O U T I N E R E L O A D
brew services restart sketchybar
brew services restart borders
brew update
brew upgrade
/opt/homebrew/bin/sketchybar --reload
mv -v ~/Library/Application\ Support/.ffuserdata ~/.Trash
pkill bird

# S T A T U S R E P O R T
osascript -e "display notification \"$content\" with title \"$display_type\""
