-- Hammerspoon脚本：浏览器应用自动切换系统Fn锁
-- 默认媒体键模式，浏览器中切换到功能键模式

-- 配置区域 - 浏览器应用列表
local browserApps = {
    "Vivaldi",
    "Safari",
    "Google Chrome",
    "Firefox",
    "Microsoft Edge",
    "Arc",
    "Opera",
    -- 可以添加更多浏览器
}

-- 当前状态跟踪
local lastApp = nil
local originalFnState = nil
local currentFnState = nil

-- 获取当前Fn锁状态
local function getFnLockState()
    local output, status = hs.execute("defaults read -g com.apple.keyboard.fnState 2>/dev/null")
    if status and output then
        local state = string.match(output, "1")
        return state ~= nil
    end
    return false -- 默认返回false（媒体键模式）
end

-- 设置Fn锁状态
local function setFnLockState(enabled)
    local value = enabled and "1" or "0"

    -- 设置全局和用户级别的Fn锁状态
    hs.execute("defaults write -g com.apple.keyboard.fnState " .. value)
    hs.execute("defaults write com.apple.keyboard.fnState " .. value)

    -- 通知系统设置变更
    hs.execute("killall cfprefsd 2>/dev/null")

    -- 记录当前状态
    currentFnState = enabled

    local modeText = enabled and "功能键 (F1-F12)" or "媒体键 (亮度/音量等)"
    print("Fn锁状态已设置为: " .. modeText)
end

-- 检查应用是否为浏览器
local function isBrowserApp(appName)
    for _, browserApp in ipairs(browserApps) do
        if string.find(appName, browserApp) then
            return true
        end
    end
    return false
end

-- 应用切换处理函数
local function handleAppSwitch()
    local currentApp = hs.application.frontmostApplication()
    if not currentApp then return end

    local appName = currentApp:name()

    -- 如果应用没有变化，不需要处理
    if lastApp == appName then return end

    print("应用切换: " .. appName)

    -- 获取当前系统Fn锁状态
    local systemFnState = getFnLockState()

    -- 记录原始状态（仅在首次运行时）
    if originalFnState == nil then
        originalFnState = systemFnState
        currentFnState = systemFnState
        print("记录初始Fn锁状态: " .. (originalFnState and "功能键模式" or "媒体键模式"))
    end

    -- 判断是否需要切换Fn锁状态
    if isBrowserApp(appName) then
        -- 切换到浏览器：启用功能键模式
        if not currentFnState then
            setFnLockState(true)
            hs.alert.show("🌐 浏览器模式: 功能键已启用", 2)
        end
    else
        -- 切换到其他应用：恢复媒体键模式
        if currentFnState then
            setFnLockState(false)
            hs.alert.show("💻 系统模式: 媒体键已启用", 2)
        end
    end

    lastApp = appName
end

-- 创建应用监视器
local appWatcher = hs.application.watcher.new(function(appName, eventType, appObject)
    if eventType == hs.application.watcher.activated then
        -- 延迟执行，确保应用完全激活
        hs.timer.doAfter(0.2, handleAppSwitch)
    end
end)

-- 启动监视器
appWatcher:start()

-- 初始化：处理当前应用
hs.timer.doAfter(1.0, function()
    handleAppSwitch()
    hs.alert.show("🔄 Fn锁智能切换已启动", 2)
end)

-- 手动切换热键（可选）
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "f", function()
    local newState = not currentFnState
    setFnLockState(newState)
    local modeText = newState and "功能键模式" or "媒体键模式"
    hs.alert.show("🔧 手动切换: " .. modeText, 2)
end)

-- 显示当前Fn锁状态的热键
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "s", function()
    local systemState = getFnLockState()
    local modeText = systemState and "功能键模式" or "媒体键模式"
    hs.alert.show("📊 当前Fn锁状态: " .. modeText, 2)
    print("系统Fn锁状态: " .. modeText)
    print("脚本记录状态: " .. (currentFnState and "功能键模式" or "媒体键模式"))
end)

-- 清理函数
local function cleanup()
    print("清理Fn锁切换脚本...")
    if appWatcher then
        appWatcher:stop()
    end
    -- 可选：退出时恢复原始状态
    -- if originalFnState ~= nil then
    --     setFnLockState(originalFnState)
    -- end
end

-- 注册清理函数
hs.shutdownCallback = cleanup

-- 启动信息
print("=== Fn锁智能切换脚本已加载 ===")
print("支持的浏览器:", table.concat(browserApps, ", "))
print("快捷键:")
print("  手动切换: Cmd+Alt+Ctrl+F")
print("  查看状态: Cmd+Alt+Ctrl+S")
print("规则: 默认媒体键，浏览器中自动切换到功能键")
