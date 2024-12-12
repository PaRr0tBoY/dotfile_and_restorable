log = hs.logger.new('autoscript', 'debug')
local cmdArr = {
    "cd /Users/acid/Scripts/ && /bin/bash GitPush.sh",
}

function shell(cmd)
    hs.alert.show("execute")
    log.i('execute')
    result = hs.osascript.applescript(string.format('do shell script "%s"', cmd))
    hs.execute(cmd)
end

function runAutoScripts()
    for key, cmd in ipairs(cmdArr) do
        shell(cmd)
    end
end

myTimer = hs.timer.doEvery(10800, runAutoScripts)
myTimer:start()
