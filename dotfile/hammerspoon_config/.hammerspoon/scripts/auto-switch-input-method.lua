-- **************************************************
-- 根据 App 自动切换输入法
-- **************************************************

local utils = require('./utils')

-- --------------------------------------------------
local Pinyin = 'com.tencent.inputmethod.wetype.pinyin'
local ABC = 'com.apple.keylayout.ABC'

-- 定义你自己想要自动切换输入法的 app
local APP_TO_IME = {
  ['/Applications/Terminal.app'] = ABC,
  ['/Applications/iTerm.app'] = ABC,
  ['/Applications/Visual Studio Code.app'] = ABC,
  ['/Applications/WebStorm.app'] = ABC,
  ['/Applications/Spotify.app'] = ABC,
  ['/Applications/Zed.app'] = ABC,
  ['/Applications/kitty.app'] = ABC,
  ['Finder.app'] = ABC,

  ['/Applications/QQ.app'] = Pinyin,
  ['/Applications/WeChat.app'] = Pinyin,
  ['/Applications/企业微信.app'] = Pinyin,
  ['/Applications/DingTalk.app'] = Pinyin,
  ['/Applications/Logseq.app'] = Pinyin,
  ['/Applications/Vivaldi.app'] = Pinyin,
  ['/System/Applications/Reminders.app'] = Pinyin,
  ['/System/Library/CoreServices/Finder.app'] = Pinyin,
  ['/Applications/ChatGPT.app'] = Pinyin,
}
-- --------------------------------------------------

local function updateFocusedAppInputMethod(appObject)
  local focusedAppPath = appObject:path()
  local ime = APP_TO_IME[focusedAppPath]

  if ime then
    hs.keycodes.currentSourceID(ime)
  end
end
local debouncedUpdateFn = utils.debounce(updateFocusedAppInputMethod, 0.1)

asim_appWatcher = hs.application.watcher.new(
  function(appName, eventType, appObject)
    if eventType == hs.application.watcher.activated then
      debouncedUpdateFn(appObject)
    end
  end
)
asim_appWatcher:start()
