local obj = {}
obj.__index = obj

-- Metadata
obj.name = "GitHub Contributions"
obj.version = "1.1"
obj.author = "Pavel Makhov"
obj.homepage = "https://github.com/fork-my-spoons/github-contributions.spoon"
obj.license = "MIT - https://opensource.org/licenses/MIT"

obj.indicator = nil
obj.iconPath = hs.spoons.resourcePath("icons")
obj.menu = {}
obj.color_levels = {}
obj.usernames = {}
obj.username = ''
obj.task = nil

obj.color_mapping = {
    standard = {
        [4] = '#216e39',
        [3] = '#30a14e',
        [2] = '#40c463',
        [1] = '#9be9a8',
        [0] = '#ebedf0'
    },
    classic = {
        [4] = '#196127',
        [3] = '#239a3b',
        [2] = '#7bc96f',
        [1] = '#c6e48b',
        [0] = '#ebedf0',
    },
    teal = {
        [4] = '#458B74',
        [3] = '#66CDAA',
        [2] = '#76EEC6',
        [1] = '#7FFFD4',
        [0] = '#ebedf0',
    },
    leftpad = {
        [4] = '#F6F6F6',
        [3] = '#DDDDDD',
        [2] = '#A5A5A5',
        [1] = '#646464',
        [0] = '#2F2F2F',
    },
    dracula = {
        [4] = '#ff79c6',
        [3] = '#bd93f9',
        [2] = '#6272a4',
        [1] = '#44475a',
        [0] = '#282a36'
    },
    pink = {
        [4] = '#61185f',
        [3] = '#a74aa8',
        [2] = '#ca5bcc',
        [1] = '#e48bdc',
        [0] = '#ebedf0',
    }
}

local followers_icon = hs.styledtext.new(' ', { font = {name = 'feather', size = 12 }, color = {hex = '#8e8e8e'}})
local repo_icon = hs.styledtext.new(' ', { font = {name = 'feather', size = 12 }, color = {hex = '#8e8e8e'}})
local twitter_icon = hs.styledtext.new(' ', { font = {name = 'feather', size = 12 }, color = {hex = '#8e8e8e'}})


local function show_warning(text)
    hs.notify.new(function() end, {
        autoWithdraw = false,
        title = 'GitHub Contributions Spoon',
        informativeText = string.format(text)
    }):send()
end

function split(s, delimiter)
    result = {};
    for match in (s..delimiter):gmatch("(.-)"..delimiter) do
        table.insert(result, match);
    end
    return result;
end

function obj:init()
    self.indicator = hs.menubar.new()

end

function obj:setup(args)
    self.usernames = args.usernames
    self.username = args.usernames[1]
    self.theme = args.theme or 'standard'
    self.char = args.char or '■'
end

function obj:start()
    self.task = hs.task.new('/bin/bash',
        function(exitCode, stdout, stderr)

            if (stderr ~= '') then 
                show_warning(stderr) 
                return
            end

            local contributions_text = hs.styledtext.new('')

            for i in stdout:gmatch("[^\r\n]+") do
                self.color_levels[#self.color_levels + 1] = i
            end

            for i = #self.color_levels - 5 - 6, #self.color_levels - 5 do
                contributions_text = contributions_text 
                    .. hs.styledtext.new(self.char, { color = { hex = obj.color_mapping[self.theme][ self.color_levels[i] + 0 ] } } )
            end

            self.indicator:setTitle(contributions_text)

        end,
        { hs.spoons.resourcePath("get_colors.sh"), self.username}
    )

    self.menu = {}
    local url = 'https://api.github.com/users/' .. self.username
    hs.http.asyncGet(url, {}, function(status, body)
        local user = hs.json.decode(body)

        title = hs.styledtext.new(user.login .. '\n')

        if (user.bio ~= nil) then
            title = title .. hs.styledtext.new(user.bio .. '\n', {color = {hex = '#8e8e8e'}})
        end

        title = title .. followers_icon .. hs.styledtext.new(user.followers .. ' followers · ' .. user.following .. ' following \n', {color = {hex = '#8e8e8e'}})
        title = title .. repo_icon .. hs.styledtext.new(user.public_repos .. ' repos · ' .. user.public_gists .. ' gists', {color = {hex = '#8e8e8e'}})


        table.insert(self.menu, {
            image = hs.image.imageFromURL(user.avatar_url):setSize({w=64, h=64}),
            title = title,
            fn = function() os.execute('open ' .. user.html_url) end
        })

        table.insert(self.menu, { title = '-'})

        local accounts_menu = {}

        if (#obj.usernames > 1) then
            for _, account in ipairs(obj.usernames) do
                table.insert(accounts_menu, {
                    title = account, 
                    checked = account == obj.username,
                    fn = function() 
                        obj.username = account 
                        obj:start()
                    end})
            end

            table.insert(self.menu, { title = 'Accounts', menu = accounts_menu})

            table.insert(self.menu, { 
                image = hs.image.imageFromName('NSTouchBarDownloadTemplate'), 
                title = 'Check for updates', 
                fn = function() obj:check_for_updates() end})
        end

        self.indicator:setMenu(self.menu)

    end)
    self.task:start()
end

function obj:check_for_updates()
    local release_url = 'https://api.github.com/repos/fork-my-spoons/github-contributions.spoon/releases/latest'
    hs.http.asyncGet(release_url, {}, function(status, body)
        local latest_release = hs.json.decode(body)
        latest = latest_release.tag_name:sub(2)
        
        if latest == obj.version then
            hs.notify.new(function() end, {
                autoWithdraw = false,
                title = obj.name,
                informativeText = "You have the latest version installed!"
            }):send()
        else
            hs.notify.new(function() 
                os.execute('open ' .. latest_release.assets[1].browser_download_url)
            end, 
            {
                title = object.name,
                informativeText = "New version is available",
                actionButtonTitle = "Download",
                hasActionButton = true
            }):send()
        end
    end)
end

return obj