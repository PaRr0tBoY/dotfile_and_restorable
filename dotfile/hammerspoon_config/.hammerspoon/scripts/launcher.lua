local hotkey = require "hs.hotkey"
local grid = require "hs.grid"
local window = require "hs.window"
local application = require "hs.application"
local appfinder = require "hs.appfinder"
local fnutils = require "hs.fnutils"

grid.setMargins({0, 0})

applist = {
    {shortcut = 'A',appname = 'Launchpad'},
    {shortcut = 'D',appname = 'Disk Utility'},
    {shortcut = 'F',appname = 'Finder'},
    {shortcut = 'I',appname = 'Messages'},
    {shortcut = 'M',appname = 'Spotify'},
    {shortcut = 'O',appname = 'orbstack'},
    {shortcut = 'P',appname = 'system preferences'},
    {shortcut = 'Q',appname = 'activity monitor'},
    {shortcut = 'S',appname = 'sublime text'},
    {shortcut = 'K',appname = 'kitty'},
    {shortcut = 'W',appname = 'Wechat'},
    {shortcut = 'V',appname = 'Vivaldi'},
    {shortcut = 'Z',appname = 'Zed'},
}

fnutils.each(applist, function(entry)
    hotkey.bind({'ctrl'}, entry.shortcut, entry.appname, function()
        application.launchOrFocus(entry.appname)
        -- toggle_application(applist[i].appname)
    end)
end)

-- Toggle an application between being the frontmost app, and being hidden
function toggle_application(_app)
    local app = appfinder.appFromName(_app)
    if not app then
        application.launchOrFocus(_app)
        return
    end
    local mainwin = app:mainWindow()
    if mainwin then
        if mainwin == window.focusedWindow() then
            mainwin:application():hide()
        else
            mainwin:application():activate(true)
            mainwin:application():unhide()
            mainwin:focus()
        end
    end
end
