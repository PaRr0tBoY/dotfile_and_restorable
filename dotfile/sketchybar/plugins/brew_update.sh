#!/bin/zsh

osascript -e 'display notification "正在更新,请稍候" with title "Brew Update Status"'
brew update
updated_packages=$(brew outdated --verbose)
brew upgrade
brew cleanup
if [ -n "$updated_packages" ]; then
  osascript -e 'display notification "更新完毕\n\n更新的包:\n'"$updated_packages"'" with title "Brew Update Status"'
else
  osascript -e 'display notification "没有做任何事，因为所有软件包已最新" with title "Brew Update Status"'
fi
