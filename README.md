# dotfile_and_restorable

### Intro
This repository serves for saving all my personal use dotfiles and restorable files.Feel free to refer to my config for your own.Sorry for my bad code.Here is some showcase of my config

sketchybar is customized for better aerospace experience.

![sketchybar_config_showcase](https://www.ac1d.space/img/20241014220923.png)

![aerospace_showcase](https://www.ac1d.space/img/202410142213374.png)

### restore/Useful_Shell_Scripts

```
hexoNewPost.sh
hexoClean.sh
hexoPublish.sh
```

These three are for blog management if yours is also built with hexo.You should edit `hexodir` before using these scripts.

`IsItRetina` is used when system wake. To determine whether I am using built-in retina display or an external display and execute different scripts.

`kindaVim` use libfaketime to trick kindaVim into thinking that the current time is available. So you're not annoying by its donation reminder after 1pm.

`openTmodLoader` help you open tmodloader without crashing on macos. 

### restore/MacApps

Under this folder,there is a list of all apps that's currently installed on my mac. Some of them could really raise your life quality.
I have also screenshot my login items, which are my most-used apps and they are so good that I almost can't live without them.

### dotfile/fastfetch /macos_default_executive /wezterm /brew

dotfile under these paths mostly or completely come from others' repo, I just simply copy them and made some slight modification.

By executing /macos_default_executive/.macos you can apply some useful settings,either visible or not in macos settings app.

**Before trying to execute .macos, remember to back up you mac and check its content and maybe modify it to fit your needs**


To use .macos, give it execution authority with:

```
cd /macos_default_executive
chmod +x .macos
```

and then execute it. It might ask you for password. Wait a few seconds until it is done. 

```
./.macos
```

Done. It's as simple as that.

The instructions above also apply to /brew/brew.sh

To use other dotfile just drag them to config position of corresponding app.
