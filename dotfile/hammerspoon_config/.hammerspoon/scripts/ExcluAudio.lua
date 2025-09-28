-- HammerSpoon 单一音频播放管理脚本
-- 确保同一时间只有一个应用在播放音频

local audioManager = {}

-- 需要监控的音频应用列表
local audioApps = {
    "Music",
    "Spotify",
    "VLC",
    "QuickTime Player",
    "Safari",
    "Google Chrome",
    "Firefox",
    "IINA",
    "Podcasts",
    "YouTube Music",
    "SoundCloud",
    "Audacity",
    "NeteaseMusic",
    "Vivaldi",
}

-- 当前正在播放的应用
local currentPlayingApp = nil

-- 检查应用是否正在播放音频
function isAppPlayingAudio(appName)
    local app = hs.application.get(appName)
    if not app then return false end

    -- 使用系统音频设备检查
    local audioDevices = hs.audiodevice.allOutputDevices()
    for _, device in pairs(audioDevices) do
        if device:inUse() then
            -- 这里可以进一步检查具体是哪个应用在使用
            return true
        end
    end

    return false
end

-- 暂停指定应用的音频播放
function pauseApp(appName)
    local app = hs.application.get(appName)
    if not app then return end

    -- 根据不同应用使用不同的暂停方法
    if appName == "Music" then
        hs.osascript.applescript('tell application "Music" to pause')
    elseif appName == "Spotify" then
        hs.osascript.applescript('tell application "Spotify" to pause')
    elseif appName == "VLC" then
        hs.osascript.applescript('tell application "VLC" to pause')
    elseif appName == "QuickTime Player" then
        hs.osascript.applescript('tell application "QuickTime Player" to pause document 1')
    elseif appName == "IINA" then
        -- IINA 使用空格键暂停
        app:activate()
        hs.eventtap.keyStroke({}, "space")
    else
        -- 对于浏览器和其他应用，尝试发送媒体键
        app:activate()
        hs.timer.doAfter(0.1, function()
            hs.eventtap.event.newSystemKeyEvent("PLAY", true):post()
            hs.eventtap.event.newSystemKeyEvent("PLAY", false):post()
        end)
    end
end

-- 检查并管理音频播放
function manageAudioPlayback()
    local playingApps = {}

    -- 检查哪些应用正在运行且可能播放音频
    for _, appName in pairs(audioApps) do
        local app = hs.application.get(appName)
        if app and app:isRunning() then
            -- 这里简化处理，实际中可以通过更复杂的方法检测音频状态
            table.insert(playingApps, appName)
        end
    end

    -- 如果有多个应用可能在播放，暂停除了最新激活的之外的所有应用
    if #playingApps > 1 then
        local frontmostApp = hs.application.frontmostApplication()
        local frontmostAppName = frontmostApp and frontmostApp:name() or ""

        for _, appName in pairs(playingApps) do
            if appName ~= frontmostAppName and appName ~= currentPlayingApp then
                pauseApp(appName)
                print("暂停了应用: " .. appName)
            end
        end

        -- 更新当前播放应用
        if hs.fnutils.contains(audioApps, frontmostAppName) then
            currentPlayingApp = frontmostAppName
        end
    end
end

-- 应用激活时的回调函数
function appActivatedCallback(appName, eventType, app)
    if eventType == hs.application.watcher.activated then
        if hs.fnutils.contains(audioApps, appName) then
            -- 暂停其他音频应用
            for _, otherAppName in pairs(audioApps) do
                if otherAppName ~= appName then
                    pauseApp(otherAppName)
                end
            end
            currentPlayingApp = appName
            print("切换到音频应用: " .. appName)
        end
    end
end

-- 媒体键监听
function mediaKeyCallback(event)
    local keyCode = event:getKeyCode()

    -- 播放/暂停键 (F8)
    if keyCode == 100 then
        manageAudioPlayback()
    end

    return false -- 不拦截事件，让系统正常处理
end

-- 初始化
function audioManager.init()
    -- 创建应用观察者
    audioManager.appWatcher = hs.application.watcher.new(appActivatedCallback)
    audioManager.appWatcher:start()

    -- 创建媒体键监听器
    audioManager.mediaKeyTap = hs.eventtap.new({hs.eventtap.event.types.systemDefined}, mediaKeyCallback)
    audioManager.mediaKeyTap:start()

    -- 定时检查音频状态（可选）
    audioManager.timer = hs.timer.doEvery(5, manageAudioPlayback)

    print("音频管理器已启动")
end

-- 停止监控
function audioManager.stop()
    if audioManager.appWatcher then
        audioManager.appWatcher:stop()
    end
    if audioManager.mediaKeyTap then
        audioManager.mediaKeyTap:stop()
    end
    if audioManager.timer then
        audioManager.timer:stop()
    end
    print("音频管理器已停止")
end

-- 手动暂停所有音频应用
function audioManager.pauseAll()
    for _, appName in pairs(audioApps) do
        pauseApp(appName)
    end
    currentPlayingApp = nil
    print("已暂停所有音频应用")
end

-- 添加快捷键绑定
hs.hotkey.bind({"cmd", "alt"}, "P", function()
    audioManager.pauseAll()
end)

hs.hotkey.bind({"cmd", "alt"}, "M", function()
    manageAudioPlayback()
end)

-- 启动音频管理器
audioManager.init()

-- 在HammerSpoon重新加载时清理
hs.timer.doAfter(0.1, function()
    print("单一音频播放管理器已加载")
    print("快捷键:")
    print("  Cmd+Alt+P: 暂停所有音频应用")
    print("  Cmd+Alt+M: 手动管理音频播放")
end)
