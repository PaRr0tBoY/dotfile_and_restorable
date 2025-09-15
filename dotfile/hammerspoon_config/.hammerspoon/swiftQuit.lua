function swiftQuit(appName, eventType, appObject)
	if eventType = hs.application.watcher.hidden then
		appObject:kill()
	end
end


quit_appWatcher = hs.application.watcher.new(swiftQuit)
quit_appWatcher:start()
