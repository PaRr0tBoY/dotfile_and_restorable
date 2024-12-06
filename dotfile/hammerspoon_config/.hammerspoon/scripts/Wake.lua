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
    hs.execute("pkill NotchNook && pkill Swish")
    hs.execute("open -a 'Swish'")
    hs.execute("open -a 'NotchNook'")
    hs.execute("open -a 'MiddleClick'")
    hs.osascript.applescript(string.format(
        'display notification "%s" with title "%s"',
        content, displayType
    ))
end

-- 外接显示器的处理逻辑
local function runCommandsForExternalDisplay()
    hs.alert.show("You are using an external display. Executing pkill commands.")
    local displayType = "You’re On External Display"
    local content = "Killing Notch Nook And Swish"
    hs.execute("pkill NotchNook")
    hs.execute("pkill Swish")
    hs.execute("pkill MiddleClick")
    hs.osascript.applescript(string.format(
        'display notification "%s" with title "%s"',
        content, displayType
    ))
end

-- 例行操作
local function reloadRoutines()
    hs.execute("brew services restart sketchybar")
    hs.execute("brew services restart borders")
    hs.execute("brew update")
    hs.execute("brew upgrade")
    hs.execute("/opt/homebrew/bin/sketchybar --reload")
    hs.execute("mv -v ~/Library/Application\\ Support/.ffuserdata ~/.Trash")
    hs.execute("pkill bird")
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
