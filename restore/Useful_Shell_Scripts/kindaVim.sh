# Use libfaketime to trick kindaVim into thinking that current time is available
# Excute this command again when kindaVim asks to donate
pkill faketime && pkill kindaVim
faketime '14:00:00' /Applications/kindaVim.app/Contents/MacOS/kindaVim
