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
    {shortcut = 'F', apps = {'Finder'}},
    {shortcut = 'M', apps = {'Messages'}},
    {shortcut = 'K', apps = {'kitty'}},
    {shortcut = 'S', apps = {'sublime text'}},
    {shortcut = 'O', apps = {'Orbstack', 'OBS'}},
    {shortcut = 'X', apps = {'System Settings'}},
    {shortcut = 'R', apps = {'Reeder'}},
    {shortcut = 'n', apps = {'Notes','NeteaseMusic'}},
    {shortcut = 'V', apps = {'Vivaldi'}},
    {shortcut = 'W', apps = {'Wechat'}},
    {shortcut = 'Z', apps = {'Zed'}},
    {shortcut = 'N', apps = {'Notes'}},
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
