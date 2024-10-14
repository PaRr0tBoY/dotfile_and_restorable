#!/bin/zsh --no-rcs 

readonly directive=$1

if [[ "$(which swiftc)" =~ "not" ]]; then
    swift -suppress-warnings \
	-import-objc-header ./src/AccessibilityBridgingHeader.h \
	./src/WindowNavigator.swift $directive
else
    [[ -f ./src/WindowNavigator ]] || $(swiftc -suppress-warnings -import-objc-header ./src/AccessibilityBridgingHeader.h ./src/WindowNavigator.swift -o ./src/WindowNavigator) 
    ./src/WindowNavigator $directive
fi
