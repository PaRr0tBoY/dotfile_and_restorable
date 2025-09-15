local utils = require('./utils')

local CONFIG = {
    BUNDLE_ID = "com.vivaldi.Vivaldi",
    PIP_WINDOW_NAME = "画中画",
    DEBOUNCE_TIME = 0.1
}

local function executeCommand(cmd)
    local output, status = hs.execute(cmd, true)
    return status and output or nil
end

local function getCurrentWorkspaceName()
    local output = executeCommand("aerospace list-workspaces --focused")
    return output and output:match("^%s*([^\r\n]-)%s*$") or nil
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

        for _, app in ipairs(apps) do
            local window = app:findWindow(CONFIG.PIP_WINDOW_NAME)
            if window then
                return moveWindowToCurrentWorkspace(window)
            end
        end
        return false
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
