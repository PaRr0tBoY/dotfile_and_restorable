local wf = hs.window.filter.new(false):setAppFilter('访达')

-- 配置项
local CONFIG = {
    FINDER_BUNDLE_ID = "com.apple.finder",
    MIN_WINDOWS = 2,
    KEYSTROKE_DELAY = 0.1,
    MERGE_DELAY = 0.5 -- 给合并操作更多时间
}

-- 工具函数：shell引用转义
local function sh_quote(s)
    return "'" .. tostring(s):gsub("'", "'\\''") .. "'"
end

-- 工具函数：执行命令并返回结果
local function executeCommand(cmd, errorMsg)
    local output, status = hs.execute(cmd, true)
    if not status then
        print(errorMsg or ("Failed to execute: " .. cmd))
        return nil
    end
    return output and output:match("^%s*(.-)%s*$") or ""
end

-- 工具函数：获取访达窗口数量
local function getFinderWindowCount()
    local cmd = "aerospace list-windows --app-bundle-id " .. CONFIG.FINDER_BUNDLE_ID .. " --count --monitor all"
    local output = executeCommand(cmd, "Failed to get Finder window count")
    return output and tonumber(output) or 0
end

-- 工具函数：获取当前工作区名称
local function getCurrentWorkspaceName()
    local cmd = "aerospace list-workspaces --focused"
    local output = executeCommand(cmd, "Failed to get current workspace")
    if not output or output == "" then
        hs.alert.show("Unable to fetch current workspace")
        return nil
    end
    return output:match("([^\r\n]+)")
end

-- 工具函数：获取访达窗口ID列表
local function getFinderWindowIds()
    local cmd = "aerospace list-windows --app-bundle-id " .. CONFIG.FINDER_BUNDLE_ID .. " --format %{window-id} --monitor all"
    local output = executeCommand(cmd, "Failed to get Finder window IDs")
    if not output then return {} end

    local windowIds = {}
    for id in output:gmatch("[^\r\n]+") do
        local cleanId = id:match("^%s*(.-)%s*$")
        if cleanId and cleanId ~= "" and cleanId ~= "0" then
            table.insert(windowIds, cleanId)
        end
    end
    return windowIds
end

-- 工具函数：移动窗口到工作区
local function moveWindowsToWorkspace(windowIds, workspaceName)
    if #windowIds == 0 then
        hs.alert.show('No windows to move')
        return
    end

    print(string.format("Moving %d Finder windows to workspace: %s", #windowIds, workspaceName))

    for i, windowId in ipairs(windowIds) do
        hs.timer.doAfter(i * 0.05, function() --异步执行
            local cmd = string.format("aerospace move-node-to-workspace --window-id %s %s",
                                     windowId, sh_quote(workspaceName))
            local success = hs.execute(cmd, true)
            if success then
                print(string.format("Moved window %s to %s", windowId, workspaceName))
            else
                print(string.format("Failed to move window %s", windowId))
            end
        end)
    end
end

-- 主函数：处理访达窗口合并
local function handleFinderWindowMerge()
    -- 检查窗口数量
    local windowCount = getFinderWindowCount()
    print(string.format("Current Finder window count: %d", windowCount))

    if windowCount < CONFIG.MIN_WINDOWS then
        print("Not enough Finder windows to trigger merge")
        return
    end

    -- 获取访达应用
    local app = hs.application.find('访达')
    if not app then
        print("Finder app not found")
        return
    end

    -- 发送合并快捷键
    print("Sending merge keystroke to Finder")
    hs.eventtap.keyStroke({"cmd"}, "u", app)

    -- 等待合并操作完成后再移动窗口
    hs.timer.doAfter(CONFIG.MERGE_DELAY, function()
        local workspaceName = getCurrentWorkspaceName()
        if not workspaceName then return end

        local windowIds = getFinderWindowIds()
        moveWindowsToWorkspace(windowIds, workspaceName)
    end)
end

-- 防抖处理
local debounceTimer = nil
local function debouncedHandleFinderWindowMerge()
    if debounceTimer then
        debounceTimer:stop()
    end

    debounceTimer = hs.timer.doAfter(0.2, function()
        handleFinderWindowMerge()
        debounceTimer = nil
    end)
end

-- 设置窗口监听
wf:subscribe(hs.window.filter.windowCreated, function(window, appName, eventName)
    print(string.format("Finder window created: %s", window and window:title() or "unknown"))
    debouncedHandleFinderWindowMerge()
end)
