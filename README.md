# dotfile_and_restorable

### Intro
This repository serves for saving all my personal use dotfiles and restorable files.Feel free to refer to my config for your own.Sorry for my bad code.Here is some showcase of my config

![sketchybar_config_showcase](https://www.ac1d.space/img/20241014220923.png)

![aerospace_showcase](https://www.ac1d.space/img/202410142213374.png)

### restore/Useful_Shell_Scripts

```
hexoNewPost.sh
hexoClean.sh
hexoPublish.sh
```

These three are for blog management if yours is also built with hexo.You should edit `hexodir` before using these scripts.

### restore/MacApps

Under this folder,there is a list of all apps that's currently installed on my mac. Some of them could really raise your life quality.
I have also screenshot my login items, which are my most-used apps and they are so good that I almost can't live without them.

### dotfile/fastfetch /macos_default_executive /wezterm /brew

dotfile under these paths mostly or completely come from others' repo, I just simply copy them and made some slight modification.

By executing /macos_default_executive/.macos you can apply some useful settings,either visible or not in macos settings app.
*Before trying to execute .macos, remember to back up you mac and check its content and maybe modify it to fit your needs*

To use .macos, give it Execution authority with:

```
cd /macos_default_executive
chmod +x .macos
```

and then execute it. It might ask you for password. Wait a few seconds until it is done. It's as simple as that.

```
./.macos
```

The instructions above also apply to /brew/brew.sh

To use other dotfile just drag them to config position of corresponding app.
