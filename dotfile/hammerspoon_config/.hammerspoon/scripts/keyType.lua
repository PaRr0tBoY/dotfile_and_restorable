local fnTap = hs.eventtap.new({hs.eventtap.event.types.keyDown}, function(e)
    local keyCode = e:getKeyCode()
    hs.alert("Pressed Key Code: " .. keyCode)
    print("Key Code:", keyCode)
    return false -- 不阻止事件传递
end)
fnTap:start()
