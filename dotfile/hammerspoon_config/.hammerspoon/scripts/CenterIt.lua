hs.hotkey.bind({"cmd","shift"}, "d", function()
	local win = hs.window.focusedWindow()
	local f = win:frame()
	local screen = win:screen()
  local max = screen:frame()


  hs.execute("aerospace layout floating", true)
  
	f.x = max.w / 4
	f.y = max.h / 4
	f.w = max.w / 2
	f.h = max.h / 2
	win:setFrame(f)
end)
