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

    local command
    if success and folder ~= "error" then
        command = string.format(
            '/Applications/kitty.app/Contents/MacOS/kitty --single-instance -d "%s"',
            folder
        )
    else
        command = '/Applications/kitty.app/Contents/MacOS/kitty --single-instance -d ~'
    end

    -- 使用 hs.task 异步运行命令
    hs.task.new("/bin/bash", nil, function(_, stdErr)
        if stdErr ~= "" then
            hs.alert("Error: " .. stdErr)
        end
        return false -- 任务完成后停止
    end, {"-c", command}):start()
end)
