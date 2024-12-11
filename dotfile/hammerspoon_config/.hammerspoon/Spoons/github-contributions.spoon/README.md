# GitHub Contributions

<p align="center">
   <a href="https://github.com/fork-my-spoons/github-contributions.spoon/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/fork-my-spoons/github-contributions.spoon">
  </a>
  <a href="https://github.com/fork-my-spoons/github-contributions.spoon/releases">
    <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/fork-my-spoons/github-contributions.spoon/total">
  </a>
  <a href="https://github.com/fork-my-spoons/github-contributions.spoon/releases">
   <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/fork-my-spoons/github-contributions.spoon">
  </a>
</p>

A menubar app, which shows github contributions chart for the last 7 days, similar to the one on the github's user page:

<p align="center">
  <img alt="screenshot1" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/screenshot1.png">
</p>

When clicked it shows some information about the user:

<p align="center">
  <img alt="screenshot2" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/screenshot2.png">
</p>


## Customizations

When creating a spoon you can customize how it looks like by passing optional parameters descibed below.

### Icons

You can change default square icon to any character, like 

circle ('●'): <img alt="classic" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/circles.png">

star ('★'): <img alt="classic" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/stars.png">

### Themes

You can also change colors of icons, by using one of the following color themes:

| theme name | screenshot |
|---|---|
| classic | <img alt="classic" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/classic.png">|
| dracula | <img alt="dracula" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/dracula.png">|
| leftpad | <img alt="leftpad" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/leftpad.png">|
| pink | <img alt="pink" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/pink.png">|
| teal | <img alt="teal" src="https://github.com/fork-my-spoons/github-contributions.spoon/raw/main/screenshots/teal.png">|


# Installation

- install [Hammerspoon](http://www.hammerspoon.org/) - a powerful automation tool for OS X
   - Manually:

      Download the [latest release](https://github.com/Hammerspoon/hammerspoon/releases/latest), and drag Hammerspoon.app from your Downloads folder to Applications.
   - Homebrew:

      ```brew install hammerspoon --cask```
 - download [github-contributions.spoon](https://github.com/fork-my-spoons/github-contributions.spoon/releases/latest/download/github-contributions.spoon.zip), unzip and double click on a .spoon file. It will be installed under ~/.hammerspoon/Spoons folder.
 - open ~/.hammerspoon/init.lua and add the following snippet:

```lua
-- github contributions
hs.loadSpoon("github-contributions")
spoon['github-contributions']:setup({
  usernames = {'streetturtle', 'fork-my-spoons', 'mgubaidullin'}, -- use on or multiple accounts
  -- theme = 'pink',
  -- char = '★'
})
spoon['github-contributions']:start()
```
