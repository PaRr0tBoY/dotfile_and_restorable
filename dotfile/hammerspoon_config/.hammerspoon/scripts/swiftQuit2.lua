local swiftwf = hs.window.filter.new(true):setFilters({
    ["Dock"] = false,
    ["SystemUIServer"] = false,
    ["System Settings"] = false,
    ["Raycast"] = false,
    ["SnippetsLab"] = false,
    ["Alfred 5"] = false,
    ["ClipboardHistory"] = false,
    ["KeyCue"] = false,
    ["Bartender 5"] = false,
    ["Maccy"] = false,
    ["Taskbar"] = false,
    ["Yoink"] = false,
    ["PopClip"] = false,
    ["Background Music"] = false,
    ["Hookmark"] = false,
    ["CleanShot X"] = false,
    ["TabTab"] = false,
    ["HazeOver"] = false,
    ["Clash Verge"] = false,
    ["Revisual"] = false,
    ["InputLeap"] = false,
    ["Barrier"] = false,
    ["Hammerspoon"] = false
})

swiftwf:subscribe({"windowMinimized", "windowDestroyed", "windowNotVisible"}, function(window, appName, eventName)
    local app = hs.application.get(appName)
    print(appName)
    if app then
        local windows = app:allWindows()
        print(#windows)
        if #windows == 0 then
            app:kill()
        end
    end
end)
