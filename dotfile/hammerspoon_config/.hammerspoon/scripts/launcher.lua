-- local hotkey = require "hs.hotkey"
-- local grid = require "hs.grid"
-- local window = require "hs.window"
-- local application = require "hs.application"
-- local appfinder = require "hs.appfinder"
-- local fnutils = require "hs.fnutils"

-- grid.setMargins({0, 0})

-- applist = {
--     {shortcut = 'A',appname = 'Launchpad'},
--     {shortcut = 'D',appname = 'Disk Utility'},
--     {shortcut = 'F',appname = 'Finder'},
--     {shortcut = 'I',appname = 'Messages'},
--     {shortcut = 'K',appname = 'kitty'},
--     {shortcut = 'M',appname = 'Spotify'},
--     {shortcut = 'O',appname = 'orbstack'},
--     {shortcut = 'P',appname = 'system preferences'},
--     {shortcut = 'R',appname = 'Follow'},
--     {shortcut = 'S',appname = 'sublime text'},
--     {shortcut = 'V',appname = 'Vivaldi'},
--     {shortcut = 'W',appname = 'Wechat'},
--     {shortcut = 'Z',appname = 'Zed'},
-- }

-- fnutils.each(applist, function(entry)
--     hotkey.bind({'ctrl'}, entry.shortcut, entry.appname, function()
--         application.launchOrFocus(entry.appname)
--         -- toggle_application(applist[i].appname)
--     end)
-- end)

-- -- Toggle an application between being the frontmost app, and being hidden
-- function toggle_application(_app)
--     local app = appfinder.appFromName(_app)
--     if not app then
--         application.launchOrFocus(_app)
--         return
--     end
--     local mainwin = app:mainWindow()
--     if mainwin then
--         if mainwin == window.focusedWindow() then
--             mainwin:application():hide()
--         else
--             mainwin:application():activate(true)
--             mainwin:application():unhide()
--             mainwin:focus()
--         end
--     end
-- end


local hotkey = require "hs.hotkey"
local grid = require "hs.grid"
local window = require "hs.window"
local application = require "hs.application"
local appfinder = require "hs.appfinder"
local fnutils = require "hs.fnutils"

grid.setMargins({0, 0})

-- 定义应用程序的快捷键和名称
applist = {
    {shortcut = 'A', apps = {'Launchpad'}},
    {shortcut = 'D', apps = {'Disk Utility'}},
    {shortcut = 'F', apps = {'Follow','Finder'}},
    {shortcut = 'M', apps = {'Messages'}},
    {shortcut = 'K', apps = {'kitty'}},
    {shortcut = 'S', apps = {'Spotify', 'sublime text'}},
    {shortcut = 'O', apps = {'orbstack', 'OBS'}}, -- 同时有 orbstack 和 OBS
    {shortcut = 'P', apps = {'system preferences'}},
    {shortcut = 'R', apps = {'Follow'}},
--    {shortcut = 'S', apps = {'sublime text'}},
    {shortcut = 'V', apps = {'Vivaldi'}},
    {shortcut = 'W', apps = {'Wechat'}},
    {shortcut = 'Z', apps = {'Zed'}},
}

-- 创建一个状态表，用于记录当前激活的应用程序
local appStates = {}

-- 绑定快捷键
fnutils.each(applist, function(entry)
    hotkey.bind({'ctrl'}, entry.shortcut, function()
        -- 如果只有一个应用，直接启动
        if #entry.apps == 1 then
            application.launchOrFocus(entry.apps[1])
            return
        end

        -- 多个应用时，获取当前状态
        local currentIndex = appStates[entry.shortcut] or 1
        local nextIndex = (currentIndex % #entry.apps) + 1 -- 循环获取下一个应用
        local nextApp = entry.apps[nextIndex]

        -- 更新状态表
        appStates[entry.shortcut] = nextIndex

        -- 启动或切换到下一个应用
        application.launchOrFocus(nextApp)
    end)
end)
