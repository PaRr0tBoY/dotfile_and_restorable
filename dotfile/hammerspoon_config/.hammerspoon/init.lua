-- hs.configdir = os.getenv('HOME') .. '/.hammerspoon'
-- package.path = hs.configdir .. '/?.lua;' .. hs.configdir .. '/?/init.lua;' .. hs.configdir .. '/Spoons/?.spoon/init.lua;' .. package.path
-- -----------------------------------------------------------------------------------------------
require('./scripts/auto-switch-input-method')
require('./scripts/wifi-mute')
require('./scripts/defeating-paste-blocking')
require('./scripts/magspeed-smooth-scrolling-fix')
-- require('./scripts/reload')
require('./scripts/AutoReload')
-- require('./scripts/launcher')
require('./scripts/Wake')
require('./scripts/GitPush')
require('./scripts/OpenInKitty')


-------------------------------------------------------------------------------------------------------------------------------------------------
-- github contributions
hs.loadSpoon("github-contributions")
spoon['github-contributions']:setup({
  usernames = {'PaRr0tBoY'}, -- use one or multiple accounts
  theme = 'classic',
  char = '★'
})
spoon['github-contributions']:start()
