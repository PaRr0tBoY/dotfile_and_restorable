-- 检查显示器类型
local function checkDisplayType()
    local output, status = hs.execute("system_profiler SPDisplaysDataType | grep -c 'Retina'", true)
    return tonumber(output) > 0
end

-- Retina 显示器的处理逻辑
local function runCommandsForRetinaDisplay()
    hs.alert.show("You are on a Retina display. Prepare launch")
    local displayType = "You’re On Retina Display"
    local content = "Launching Notch Nook And Swish"

    local commands = {
        "pkill NotchNook",
        "pkill Swish",
        "open -a 'Swish'",
        "open -a 'NotchNook'",
        "open -a 'MiddleClick'",
        string.format(
            "osascript -e 'display notification \"%s\" with title \"%s\"'",
            content, displayType
        )
    }

    for _, cmd in ipairs(commands) do
        hs.task.new("/bin/bash", nil, nil, {"-c", cmd}):start()
    end
end

-- 外接显示器的处理逻辑
local function runCommandsForExternalDisplay()
    hs.alert.show("You are using an external display. Executing pkill commands.")
    local displayType = "You’re On External Display"
    local content = "Killing Notch Nook And Swish"

    local commands = {
        "pkill NotchNook",
        "pkill Swish",
        "pkill MiddleClick",
        string.format(
            "osascript -e 'display notification \"%s\" with title \"%s\"'",
            content, displayType
        )
    }

    for _, cmd in ipairs(commands) do
        hs.task.new("/bin/bash", nil, nil, {"-c", cmd}):start()
    end
end

-- 例行操作
local function reloadRoutines()
    local commands = {
        "brew services restart sketchybar",
        "brew services restart borders",
        "brew update",
        "brew upgrade",
        "/opt/homebrew/bin/sketchybar --reload",
        "mv -v ~/Library/Application\\ Support/.ffuserdata ~/.Trash",
        "pkill bird"
    }

    for _, cmd in ipairs(commands) do
        hs.task.new("/bin/bash", nil, nil, {"-c", cmd}):start()
    end
end

-- 主逻辑函数
local function main()
    if checkDisplayType() then
        runCommandsForRetinaDisplay()
    else
        runCommandsForExternalDisplay()
    end
    reloadRoutines()
end

-- 监听系统唤醒事件
local caffeinateWatcher = hs.caffeinate.watcher.new(function(eventType)
    if eventType == hs.caffeinate.watcher.systemDidWake then
        hs.alert.show("System woke up! Executing script...")
        main()
    end
end)

-- 启动 watcher
caffeinateWatcher:start()
