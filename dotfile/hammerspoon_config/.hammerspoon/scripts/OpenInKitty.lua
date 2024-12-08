hs.hotkey.bind({"alt"}, "return", function()
    local success, folder = hs.osascript.applescript([[
        tell application "Finder"
            try
                set currentFolder to (insertion location as alias)
                return POSIX path of currentFolder
            on error
                return "error"
            end try
        end tell
    ]])

    if success and folder ~= "error" then
        local kittyCommand = string.format(
            '/Applications/kitty.app/Contents/MacOS/kitty --single-instance -d "%s"',
            folder
        )
        hs.execute(kittyCommand)
    else
        local defaultCommand = '/Applications/kitty.app/Contents/MacOS/kitty --single-instance -d ~'
        hs.execute(defaultCommand)
    end
end)
