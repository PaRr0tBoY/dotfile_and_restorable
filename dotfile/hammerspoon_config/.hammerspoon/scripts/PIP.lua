local utils = require('./utils')

local CONFIG = {
    BUNDLE_ID = "com.vivaldi.Vivaldi",
    DEBOUNCE_TIME = 0.1
}

-- 匹配画中画窗口的关键词
local PIP_KEYWORDS = {
    "画中画",
    "Picture in Picture",
    "pip",
    "PIP"
}

local function executeCommand(cmd)
    local output, status = hs.execute(cmd, true)
    return status and output or nil
end

local function getCurrentWorkspaceName()
    local output = executeCommand("aerospace list-workspaces --focused")
    return output and output:match("^%s*([^\r\n]-)%s*$") or nil
end

local function isPIPWindow(windowTitle)
    if not windowTitle then return false end

    local lowerTitle = windowTitle:lower()
    for _, keyword in ipairs(PIP_KEYWORDS) do
        if lowerTitle:find(keyword:lower()) then
            return true
        end
    end
    return false
end

local function moveWindowToCurrentWorkspace(window)
    local workSpaceName = getCurrentWorkspaceName()
    if not workSpaceName then return false end

    local command = string.format("aerospace move-node-to-workspace --window-id %s '%s'",
                                  window:id(), workSpaceName)
    return executeCommand(command) ~= nil
end

local function PIPFollow(appObject)
    local success, result = pcall(function()
        local apps = hs.application.applicationsForBundleID(CONFIG.BUNDLE_ID)
        if not apps or #apps == 0 then return false end

        local movedAny = false
        for _, app in ipairs(apps) do
            local windows = app:allWindows()
            for _, window in ipairs(windows) do
                local title = window:title()
                if isPIPWindow(title) then
                    if moveWindowToCurrentWorkspace(window) then
                        movedAny = true
                        print("移动 PIP 窗口: " .. (title or "未知"))
                    end
                end
            end
        end
        return movedAny
    end)

    if not success then
        print("Error in PIPFollow: " .. tostring(result))
    end
    return success and result
end

local debouncedPIP = utils.debounce(PIPFollow, CONFIG.DEBOUNCE_TIME)
PIPWatcher = hs.application.watcher.new(
    function(appName, eventType, appObject)
        if eventType == hs.application.watcher.activated then
            debouncedPIP(appObject)
        end
    end
)
PIPWatcher:start()
