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
