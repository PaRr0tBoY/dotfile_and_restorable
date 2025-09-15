local eScreen = "PHL24M1N5500Z"
local windowLayout = {
    {"Vivaldi", nil, eScreen, hs.layout.left50, nil, nil},
    {"Sublime Text", nil, eScreen, hs.layout.right50, nil, nil}
}

hs.hotkey.bind({"ctrl", "shift"}, "d", function()
    hs.layout.apply(windowLayout)
end)
