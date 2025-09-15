local utils = require('./utils')

local function NotesOn(appObject)
    local ProNotesID = "com.dexterleng.ProNotes"
    local NotesID = "com.apple.Notes"
    local Notes = hs.application.get(NotesID)
    if Notes then
        hs.application.launchOrFocusByBundleID(ProNotesID)
    else
        local ProNotes = hs.application.get(ProNotesID)
        if ProNotes then
            ProNotes:kill()
        end
    end
end

local debouncedUpdateFn = utils.debounce(NotesOn, 0.1)

notes_appwatcher = hs.application.watcher.new(
    function (appName, eventType, appObject)
        if (appName == "备忘录")then
            if eventType == hs.application.watcher.launched or
           eventType == hs.application.watcher.terminated then
               debouncedUpdateFn(appObject)
            end
        end
    end
)

notes_appwatcher:start()
