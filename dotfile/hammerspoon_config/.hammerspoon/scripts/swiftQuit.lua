-- 配置项
local CONFIG = {
    -- 检查延迟时间
    CHECK_DELAY = 2,
    -- 清理定时器的间隔
    CLEANUP_INTERVAL = 30,
    -- 最大定时器数量（防止内存泄漏）
    MAX_PENDING_TIMERS = 50
}

-- 受保护的应用列表（不会被自动退出）
local PROTECTED_APPS = {
    -- 系统应用
    ["Dock"] = true,
    ["SystemUIServer"] = true,
    ["System Settings"] = true,
    ["Finder"] = true,
    ["访达"] = true,

    -- 效率工具
    ["Raycast"] = true,
    ["Alfred 5"] = true,
    ["SnippetsLab"] = true,
    ["ClipboardHistory"] = true,
    ["KeyCue"] = true,
    ["Bartender 5"] = true,
    ["Maccy"] = true,
    ["Taskbar"] = true,
    ["Yoink"] = true,
    ["PopClip"] = true,
    ["HazeOver"] = true,
    ["Hookmark"] = true,
    ["CleanShot X"] = true,
    ["TabTab"] = true,
    ["iStat Menus"] = true,

    -- 系统服务
    ["Background Music"] = true,
    ["Clash Verge"] = true,
    ["Revisual"] = true,
    ["InputLeap"] = true,
    ["Barrier"] = true,
    ["Hammerspoon"] = true,

    -- 时间追踪和笔记
    ["Timemator"] = true,
    ["ProNotes"] = true,

    -- 娱乐应用
    ["腾讯元宝"] = true,
    ["NeteaseMusic"] = true,
    ["网易云音乐"] = true,
}

-- 定时器管理
local pendingTimers = {}
local timerCount = 0

-- 工具函数：安全地获取应用
local function safeGetApp(appName)
    local success, app = pcall(function()
        return hs.application.get(appName)
    end)
    return success and app or nil
end

-- 工具函数：检查应用是否有可见窗口
local function hasVisibleWindows(app)
    if not app then return false end

    local success, result = pcall(function()
        local windows = app:allWindows()
        if not windows or #windows == 0 then
            return false
        end

        -- 检查是否有可见且非最小化的窗口
        for _, window in ipairs(windows) do
            if window:isVisible() and not window:isMinimized() then
                return true
            end
        end
        return false
    end)

    return success and result or false
end

-- 工具函数：检查应用是否应该被保护
local function isProtectedApp(appName)
    return PROTECTED_APPS[appName] == true
end

-- 工具函数：安全地退出应用
local function safeQuitApp(app, appName)
    if not app then return false end

    local success, result = pcall(function()
        print(string.format("Auto-quitting app: %s", appName))
        return app:kill()
    end)

    if success and result then
        print(string.format("Successfully quit: %s", appName))
    else
        print(string.format("Failed to quit: %s", appName))
    end

    return success and result
end

-- 清理过期的定时器
local function cleanupTimers()
    local activeCount = 0
    for key, timer in pairs(pendingTimers) do
        if timer:running() then
            activeCount = activeCount + 1
        else
            pendingTimers[key] = nil
        end
    end
    timerCount = activeCount
    print(string.format("Timer cleanup: %d active timers", activeCount))
end

-- 定期清理定时器
local cleanupTimer = hs.timer.new(CONFIG.CLEANUP_INTERVAL, cleanupTimers)
cleanupTimer:start()

-- 主要的检查和退出逻辑
local function checkAndQuitApp(appName)
    local app = safeGetApp(appName)

    -- 再次检查应用是否存在（可能在延迟期间被手动关闭）
    if not app then
        return
    end

    -- 检查应用是否有可见窗口
    if not hasVisibleWindows(app) then
        safeQuitApp(app, appName)
    else
        print(string.format("App %s still has visible windows, not quitting", appName))
    end
end

-- 主函数：处理应用失活事件
local function handleAppDeactivated(appName, appObject)
    -- 基础检查
    if not appObject then
        return
    end

    -- 检查是否是受保护的应用
    if isProtectedApp(appName) then
        return
    end

    -- 检查应用当前状态
    if not hasVisibleWindows(appObject) then
        -- 如果应用已经没有可见窗口，立即退出
        safeQuitApp(appObject, appName)
        return
    end

    -- 防止创建过多定时器
    if timerCount >= CONFIG.MAX_PENDING_TIMERS then
        print("Too many pending timers, skipping app quit check")
        return
    end

    -- 创建延迟检查定时器
    local timerKey = appName .. "_" .. os.time()
    local timer = hs.timer.doAfter(CONFIG.CHECK_DELAY, function()
        checkAndQuitApp(appName)
        pendingTimers[timerKey] = nil
        timerCount = timerCount - 1
    end)

    pendingTimers[timerKey] = timer
    timerCount = timerCount + 1

    print(string.format("Scheduled quit check for: %s (pending timers: %d)", appName, timerCount))
end

-- 主监听函数
local function swiftQuit(appName, eventType, appObject)
    -- 只处理失活事件
    if eventType ~= hs.application.watcher.deactivated then
        return
    end

    local success, result = pcall(function()
        handleAppDeactivated(appName, appObject)
    end)

    if not success then
        print(string.format("Error in swiftQuit for %s: %s", appName, tostring(result)))
    end
end

-- 防抖处理（可选）
local debounceTimers = {}
local function debouncedSwiftQuit(appName, eventType, appObject)
    if eventType ~= hs.application.watcher.deactivated then
        return
    end

    -- 清除之前的防抖定时器
    if debounceTimers[appName] then
        debounceTimers[appName]:stop()
    end

    -- 设置新的防抖定时器
    debounceTimers[appName] = hs.timer.doAfter(0.1, function()
        swiftQuit(appName, eventType, appObject)
        debounceTimers[appName] = nil
    end)
end

-- 创建并启动监听器
quit_appWatcher = hs.application.watcher.new(swiftQuit) -- 或使用 debouncedSwiftQuit
quit_appWatcher:start()

print("Swift quit watcher started")

-- 辅助函数：添加受保护的应用
local function addProtectedApp(appName)
    PROTECTED_APPS[appName] = true
    print(string.format("Added %s to protected apps list", appName))
end

-- 辅助函数：移除受保护的应用
local function removeProtectedApp(appName)
    PROTECTED_APPS[appName] = nil
    print(string.format("Removed %s from protected apps list", appName))
end

-- 辅助函数：列出所有受保护的应用
local function listProtectedApps()
    print("Protected apps:")
    for appName, _ in pairs(PROTECTED_APPS) do
        print("  " .. appName)
    end
end

-- 清理函数
local function cleanup()
    -- 停止主监听器
    if quit_appWatcher then
        quit_appWatcher:stop()
        quit_appWatcher = nil
        print("Swift quit watcher stopped")
    end

    -- 停止清理定时器
    if cleanupTimer then
        cleanupTimer:stop()
        cleanupTimer = nil
    end

    -- 清理所有待处理的定时器
    for key, timer in pairs(pendingTimers) do
        timer:stop()
        pendingTimers[key] = nil
    end
    timerCount = 0

    -- 清理防抖定时器
    for key, timer in pairs(debounceTimers) do
        timer:stop()
        debounceTimers[key] = nil
    end

    print("Swift quit cleanup completed")
end

-- 导出有用的函数（如果需要的话）
return {
    addProtectedApp = addProtectedApp,
    removeProtectedApp = removeProtectedApp,
    listProtectedApps = listProtectedApps,
    cleanup = cleanup
}
