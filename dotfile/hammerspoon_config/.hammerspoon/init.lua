-- hs.configdir = os.getenv('HOME') .. '/.hammerspoon'
-- package.path = hs.configdir .. '/?.lua;' .. hs.configdir .. '/?/init.lua;' .. hs.configdir .. '/Spoons/?.spoon/init.lua;' .. package.path
-- -----------------------------------------------------------------------------------------------
-- Scripts

-- Scripts I Copied --
require('./scripts/auto-switch-input-method')
require('./scripts/defeating-paste-blocking')
require('./scripts/magspeed-smooth-scrolling-fix')
require('./scripts/OpenInKitty')
require("./scripts/AlertClipboard")
require('./scripts/launcher')
require('./scripts/caffeine')

-- Scripts I Wrote --
require("./scripts/notesCopilot")
require('./scripts/CenterIt') -- I love this simple little thing too
require('./scripts/finderUnion') -- Myfav
require('./scripts/swiftQuit') -- This scripts implements the app 'swift quit' function
require('./scripts/PIP')
require('./scripts/ring')

-- require("./scripts/NotesCompanion") -- At least I tried, and it works, but not as good as notesCopilot which I vibe-coded

--Disabled --
-- require('./scripts/AutoReload')
-- require('./scripts/Fluor')
-- require('./scripts/wifi-mute')
-- require('./scripts/GitPush')

-- Spoon

-- 菜单栏时间
-- hs.loadSpoon("ZeroOffset")
-- spoon.ZeroOffset:init()
-- spoon.ZeroOffset:start()

-- 输入法指示灯
hs.loadSpoon("InputMethodIndicator")
spoon.InputMethodIndicator:start({
    ABCColor = "#1E88E5",
    LocalLanguageColor = "#62C555",
    mode = "adaptive",
    showOnChangeDuration = 3,
    checkInterval = 0.01,
    dotSize = 6,
    deltaY = 7
})

--  Cheat Sheet
local ksheet = hs.loadSpoon("KSheet")
if ksheet then
    ksheet:init()
    ksheet:bindHotkeys({
        show = {{"shift"}, "y"},
        hide = {{"shift"}, "y"},
        toggle = {{"cmd","shift"}, "c"}
    })
else
    hs.notify.show("KSheet 加载失败", "请检查 Spoon 是否安装正确", "")
end

-- 中键滚动
local MiddleClickDragScroll = hs.loadSpoon("MiddleClickDragScroll"):configure{
  excludedApps = {"Terminal", "iTerm2", "Xcode"},
  excludedWindows = {"^Preferences$", "^Settings$"},
  excludedUrls = {
    "^https://mail%.google%.com",
    "^https://docs%.google%.com"
  },
  indicatorSize = 30,
  indicatorAttributes = {
    type = "circle",
    fillColor = { red = 0.2, green = 0.4, blue = 0.8, alpha = 0.4 },
    strokeColor = { red = 1, green = 1, blue = 1, alpha = 0.8 },
  },

  startDistance = 10,
  scrollMode = "pixel",
  scrollFrequency = 0.01,
  scrollAccelaration = 30,
  scrollSpeedFn =
  function(self, x)
    return (x ^ 2) / (self.scrollAccelaration ^ 2)
  end
}:start()

-- 屏幕圆角
hs.loadSpoon("RoundedCorners")
spoon.RoundedCorners.radius = 15
spoon.RoundedCorners.allScreens = true
spoon.RoundedCorners.level = spoon.RoundedCorners.level + 1
spoon.RoundedCorners:start()

-- 弹出磁盘
hs.loadSpoon("EjectMenu")

spoon.EjectMenu.eject_on_sleep = true
spoon.EjectMenu.notify = true
spoon.EjectMenu.show_in_menubar = true

spoon.EjectMenu.never_eject = {
    "/Volumes/OrbStack",
    "/Volumes/Backup"
}
spoon.EjectMenu:start()
spoon.EjectMenu:bindHotkeys({
    ejectAll = {{"cmd", "alt", "ctrl"}, "e"}
})

--又是一个输入法指示灯
-- hs.loadSpoon("MenubarFlag")
-- spoon.MenubarFlag.allScreens = true
-- spoon.MenubarFlag.colors = {
--  ["ABC"] = { hs.drawing.color.blue },
--  ["鼠须管"] = { hs.drawing.color.green },
-- }
-- spoon.MenubarFlag.indicatorAlpha = 0.3
-- spoon.MenubarFlag.indicatorHeight = 5
-- spoon.MenubarFlag.indicatorInAllSpaces = false
-- spoon.MenubarFlag.timerFreq = 1.0
-- spoon.MenubarFlag:start()

-- App启动器
-- hs.loadSpoon("AppLauncher")
-- spoon.AppLauncher.modifiers = { "ctrl" }
-- spoon.AppLauncher:bindHotkeys({
-- 	w = "Wechat",
-- 	s = "Sublime Text",
-- 	z = "Zed",
-- 	a = "NeteaseMusic",
-- 	v = "Vivaldi",
-- 	n = "Notes",
-- 	r = "Reeder",
-- 	k = "kitty",
-- 	l = "Logseq",
-- 	x = "Calflow",
-- 	f = "finder"
-- })

-- -- Hsearch
-- hs.loadSpoon("HSearch")
-- -- 绑定快捷键
-- hs.hotkey.bind({"ctrl","shift"}, "space", function()
--     spoon.HSearch:toggleShow()
-- end)
-- 任务栏网速指示器
-- hs.loadSpoon("SpeedMenu")
-- spoon.SpeedMenu:start()
-- spoon.SpeedMenu:rescan()
-- hs.loadSpoon("SpoonInstall")



-------------------------------------------------------------------------------------------------------------------------------------------------
-- github contributions
-- hs.loadSpoon("github-contributions")
-- spoon['github-contributions']:setup({
--   usernames = {'PaRr0tBoY'}, -- use one or multiple accounts
--   theme = 'classic',
--   char = '★'
-- })
-- spoon['github-contributions']:start()
-- hs.loadSpoon("AllBrightness")

-- require("rcmd")
