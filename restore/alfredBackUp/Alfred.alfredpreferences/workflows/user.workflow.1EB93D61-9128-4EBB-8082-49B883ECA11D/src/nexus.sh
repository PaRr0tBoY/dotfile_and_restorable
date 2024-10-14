#!/bin/zsh --no-rcs

## Ayai GPT Nexus alpha - launch the bundled executable
xattr -d com.apple.quarantine ./src/Ayai >/dev/null 2>&1
./src/Ayai "$1"

#$HOME${x_debug_DEV} "$1"
