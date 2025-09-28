local mainApp = "备忘录"        -- 主应用
local companionApp = "ProNotes" -- 伴随应用

function appWatcher(appName, eventType, appObject)
    if appName == mainApp then
        if eventType == hs.application.watcher.launched then
            hs.execute("aerospace workspace Wri", true)
            print("Workspace -> Write")
            -- Notes 激活时启动 ProNotes
            hs.timer.doAfter(0.5,
            function()
                hs.application.launchOrFocus(companionApp)
            end)
        elseif eventType == hs.application.watcher.terminated then
            -- Notes 退出时关闭 ProNotes
            local target = hs.appfinder.appFromName(companionApp)
            if target then
                target:kill()
            end
        end
    end
end

appWatcherObj = hs.application.watcher.new(appWatcher)
appWatcherObj:start()

-- -- 配置项
-- local CONFIG = {
--     MAIN_APP = "备忘录",
--     COMPANION_APP = "ProNotes",
--     TARGET_WORKSPACE = "Wri",
--     LAUNCH_DELAY = 0.5,
--     KILL_DELAY = 0.2,
--     MAX_KILL_ATTEMPTS = 3,
--     KILL_ATTEMPT_INTERVAL = 0.5
-- }

-- -- 工具函数：执行命令
-- local function executeCommand(cmd, successMsg, errorMsg)
--     local output, status = hs.execute(cmd, true)
--     if status and successMsg then
--         print(successMsg)
--     elseif not status and errorMsg then
--         print(errorMsg)
--     end
--     return status, output
-- end

-- -- 工具函数：安全地启动应用
-- local function safeLaunchApp(appName, delay)
--     delay = delay or 0

--     hs.timer.doAfter(delay, function()
--         local success, result = pcall(function()
--             return hs.application.launchOrFocus(appName)
--         end)

--         if success and result then
--             print(string.format("Successfully launched/focused: %s", appName))
--         else
--             print(string.format("Failed to launch/focus: %s", appName))
--         end
--     end)
-- end

-- -- 工具函数：安全地终止应用
-- local function safeKillApp(appName, maxAttempts, interval)
--     maxAttempts = maxAttempts or CONFIG.MAX_KILL_ATTEMPTS
--     interval = interval or CONFIG.KILL_ATTEMPT_INTERVAL

--     local function attemptKill(attempt)
--         local app = hs.appfinder.appFromName(appName)

--         if not app then
--             print(string.format("%s is not running", appName))
--             return true -- 应用已经不在运行，任务完成
--         end

--         local success = app:kill()

--         if success then
--             print(string.format("Successfully killed: %s", appName))
--             return true
--         else
--             print(string.format("Kill attempt %d failed for: %s", attempt, appName))

--             if attempt >= maxAttempts then
--                 print(string.format("Max attempts reached, force killing: %s", appName))
--                 return app:kill9() -- 强制终止
--             else
--                 -- 递归重试
--                 hs.timer.doAfter(interval, function()
--                     attemptKill(attempt + 1)
--                 end)
--             end
--         end
--         return false
--     end

--     hs.timer.doAfter(CONFIG.KILL_DELAY, function()
--         attemptKill(1)
--     end)
-- end

-- -- 工具函数：切换到指定工作区
-- local function switchToWorkspace(workspace)
--     local cmd = string.format("aerospace workspace %s", workspace)
--     local status, output = executeCommand(
--         cmd,
--         string.format("Switched to workspace: %s", workspace),
--         string.format("Failed to switch to workspace: %s", workspace)
--     )
--     return status
-- end

-- -- 工具函数：检查应用是否正在运行
-- local function isAppRunning(appName)
--     local app = hs.appfinder.appFromName(appName)
--     return app ~= nil
-- end

-- -- 主函数：处理应用启动
-- local function handleAppLaunched(appName)
--     print(string.format("Handling launch of: %s", appName))

--     -- 切换到目标工作区
--     if not switchToWorkspace(CONFIG.TARGET_WORKSPACE) then
--         return -- 如果工作区切换失败，不继续执行
--     end

--     -- 检查伴随应用是否已经在运行，避免重复启动
--     if isAppRunning(CONFIG.COMPANION_APP) then
--         print(string.format("%s is already running", CONFIG.COMPANION_APP))
--         return
--     end

--     -- 启动伴随应用
--     safeLaunchApp(CONFIG.COMPANION_APP, CONFIG.LAUNCH_DELAY)
-- end

-- -- 主函数：处理应用终止
-- local function handleAppTerminated(appName)
--     print(string.format("Handling termination of: %s", appName))

--     -- 检查伴随应用是否在运行
--     if not isAppRunning(CONFIG.COMPANION_APP) then
--         print(string.format("%s is not running", CONFIG.COMPANION_APP))
--         return
--     end

--     -- 终止伴随应用
--     safeKillApp(CONFIG.COMPANION_APP)
-- end

-- -- 主监听函数
-- local function appWatcher(appName, eventType, appObject)
--     -- 只处理主应用的事件
--     if appName ~= CONFIG.MAIN_APP then
--         return
--     end

--     local success, result = pcall(function()
--         if eventType == hs.application.watcher.launched then
--             handleAppLaunched(appName)
--         elseif eventType == hs.application.watcher.terminated then
--             handleAppTerminated(appName)
--         end
--     end)

--     if not success then
--         print(string.format("Error in appWatcher: %s", tostring(result)))
--     end
-- end

-- -- 防抖处理（可选）
-- local debounceTimers = {}
-- local function debouncedAppWatcher(appName, eventType, appObject)
--     local key = appName .. "_" .. tostring(eventType)

--     -- 清除之前的定时器
--     if debounceTimers[key] then
--         debounceTimers[key]:stop()
--     end

--     -- 设置新的定时器
--     debounceTimers[key] = hs.timer.doAfter(0.1, function()
--         appWatcher(appName, eventType, appObject)
--         debounceTimers[key] = nil
--     end)
-- end

-- -- 创建并启动监听器
-- appWatcherObj = hs.application.watcher.new(appWatcher) -- 或使用 debouncedAppWatcher
-- appWatcherObj:start()

-- print(string.format("App watcher started - monitoring %s", CONFIG.MAIN_APP))

-- -- 清理函数（可选）
-- local function cleanup()
--     if appWatcherObj then
--         appWatcherObj:stop()
--         appWatcherObj = nil
--         print("App watcher stopped")
--     end

--     -- 清理所有防抖定时器
--     for key, timer in pairs(debounceTimers) do
--         timer:stop()
--         debounceTimers[key] = nil
--     end
-- end

-- -- 可以在需要时调用 cleanup() 来清理资源
