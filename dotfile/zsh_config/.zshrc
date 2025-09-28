# =====================================
# Oh My Zsh 配置
# =====================================

# Powerlevel10k 主题初始化（需要在最前面）
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Oh My Zsh 路径设置
export ZSH="$HOME/.oh-my-zsh"

# =====================================
# 主题和基本设置
# =====================================

# 主题设置
ZSH_THEME="powerlevel10k/powerlevel10k"

# 灵敏度设置
CASE_SENSITIVE="true"        # 大小写敏感
HYPHEN_INSENSITIVE="false"   # 连字符不敏感

# 更新设置
DISABLE_AUTO_UPDATE="false"  # 允许自动更新
DISABLE_UPDATE_PROMPT="true" # 禁用更新提示
export UPDATE_ZSH_DAYS=15    # 15天更新一次

# 功能设置
ENABLE_CORRECTION="true"     # 启用命令纠错
COMPLETION_WAITING_DOTS="true"  # 等待补全时显示点

# 历史记录时间格式
HIST_STAMPS="yyyy-mm-dd"

# =====================================
# 插件配置
# =====================================

# 插件列表
plugins=(
  git
  zsh-autosuggestions
  F-Sy-H
  zsh-history-substring-search
  autoenv
  zsh-vi-mode
  colored-man-pages
  zsh-navigation-tools
)

# 补全插件路径
fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src

# 加载 Oh My Zsh
source $ZSH/oh-my-zsh.sh

# =====================================
# 环境变量配置
# =====================================

# Homebrew 路径
export PATH=/opt/homebrew/bin:$PATH
export PATH="$PATH:/usr/local/bin"
export PATH="/usr/local/opt/python/libexec/bin:$PATH"
export PATH="/usr/local/upx:$PATH"
export PATH=~/npm/bin:$PATH
export PATH=/Applications/Alist:$PATH
export PATH="$PATH:$HOME/.local/bin"
export PATH=$PATH:/Users/acid/.spicetify
export PATH=/Users/acid/.meteor:$PATH

# Python 相关
alias python=/usr/local/bin/python3
alias pip=/usr/local/bin/pip3

# =====================================
# Homebrew 镜像配置
# =====================================

# 使用中科大镜像源
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_NO_ENV_HINTS="1"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"

# =====================================
# NVM 配置
# =====================================

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 加载 nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # 加载 nvm bash_completion

# =====================================
# Autojump 配置
# =====================================

[ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh

# =====================================
# Autoenv 配置
# =====================================

source '/opt/homebrew/opt/autoenv/activate.sh'

# =====================================
# Fuck 配置
# =====================================

eval $(thefuck --alias)

# =====================================
# Claude 配置
# =====================================

export ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
export ANTHROPIC_AUTH_TOKEN=e2105adcbe8d4d6ea49dce2fd94c127f.6dcsB9uMmtNxKXl2

# =====================================
# 别名配置
# =====================================

# JMCOMIC
jm() {
  if [ $# -eq 0 ]; then
    echo "Usage: jm <comic-id>"
    return 1
  fi
  cd '/Users/acid/Documents/Backup/solidworks_exts/doujinshi/' && jmcomic $1
}
# 基础操作别名
alias cls=clear                    # 清屏

# 窗口管理别名（Aerospace）
alias big="aerospace resize width +300"  # 窗口变大
alias sml="aerospace resize width -300"  # 窗口变小

# Homebrew 别名
alias bs="brew search"              # 搜索包
alias bi="brew install"             # 安装包
alias bu="brew uninstall"           # 卸载包
alias bss="brew services start"     # 启动服务
alias bsr="brew services restart"   # 重启服务
alias bsh="brew services stop"      # 停止服务
alias bubu="brew update && brew upgrade"  # 更新和升级

# Git 别名
alias gst="git status"              # 状态
alias gaa="git add --all"           # 添加所有
alias gcm="git commit -m"           # 提交
alias gpo="git push origin"         # 推送到 origin
alias gd="git diff"                 # 差异
alias g="git"                       # 简写

# =====================================
# 文件和目录操作别名
# =====================================

# 目录导航别名
alias ..="cd .."                    # 上一级
alias ...="cd ../.."               # 上两级
alias ....="cd ../../.."           # 上三级
alias .....="cd ../../../.."       # 上四级
alias -- -="cd -"                  # 返回上一次目录

# 快速进入目录
alias d="cd ~/Documents"           # 文档
alias dl="cd ~/Downloads"          # 下载
alias dt="cd ~/Desktop"            # 桌面

# =====================================
# 系统和工具别名
# =====================================

# 编辑器别名
alias zed='open -a "zed" .'         # 用 Zed 打开当前目录

# 开发服务器别名
alias st='j Silly && npm i && node server.js'  # 启动 Silly 项目
alias owu='open-webui serve'        # 启动 Open WebUI

# 代理别名
alias proxy='export all_proxy=http://127.0.0.1:7897'     # 设置代理
alias unproxy='unset all_proxy'     # 取消代理

# =====================================
# 列表和颜色配置
# =====================================

# 检测 ls 类型并设置颜色
if ls --color > /dev/null 2>&1; then # GNU `ls`
  colorflag="--color"
  export LS_COLORS='no=00:fi=00:di=01;31:ln=01;36:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.gz=01;31:*.bz2=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.avi=01;35:*.fli=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.ogg=01;35:*.mp3=01;35:*.wav=01;35:'
else # macOS `ls`
  colorflag="-G"
  export LSCOLORS='BxBxhxDxfxhxhxhxhxcxcx'
fi

# 列表别名
alias l="ls -lF ${colorflag}"        # 详细列表
alias la="ls -lAF ${colorflag}"       # 所有文件（包含隐藏文件）
alias lsd="ls -lF ${colorflag} | grep --color=never '^d'"  # 仅目录
alias ls="command ls ${colorflag}"    # 总是使用颜色

# =====================================
# 搜索和工具别名
# =====================================

# grep 别名（颜色）
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# sudo 别名
alias sudo='sudo '

# 实用工具别名
alias week='date +%V'               # 获取周数
alias c="tr -d '\n' | pbcopy"       # 去除换行符并复制到剪贴板
alias path='echo -e ${PATH//:/\\n}' # 每行显示一个 PATH 条目

# =====================================
# 系统维护别名
# =====================================

# 系统更新
alias update='sudo softwareupdate -i -a; brew update; brew upgrade; brew cleanup; npm install npm -g; npm update -g; sudo gem update --system; sudo gem update; sudo gem cleanup'

# 清理别名
alias cleanup="find . -type f -name '*.DS_Store' -ls -delete"  # 删除 .DS_Store 文件
alias emptytrash="sudo rm -rfv /Volumes/*/.Trashes; sudo rm -rfv ~/.Trash; sudo rm -rfv /private/var/log/asl/*.asl; sqlite3 ~/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV* 'delete from LSQuarantineEvent'"  # 清空垃圾桶

# DNS 清理
alias flush="dscacheutil -flushcache && killall -HUP mDNSResponder"  # 刷新 DNS 缓存

# LaunchServices 清理
alias lscleanup="/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -kill -r -domain local -domain system -domain user && killall Finder"

# =====================================
# 网络别名
# =====================================

# IP 地址
alias ip="dig +short myip.opendns.com @resolver1.opendns.com"  # 外网 IP
alias localip="ipconfig getifaddr en0"  # 本地 IP
alias ips="ifconfig -a | grep -o 'inet6\? \(addr:\)\?\s\?\(\(\([0-9]\+\.\)\{3\}[0-9]\+\)\|[a-fA-F0-9:]\+\)' | awk '{ sub(/inet6? (addr:)? ?/, \"\"); print }'"  # 所有 IP

# 网络接口
alias ifactive="ifconfig | pcregrep -M -o '^[^\t:]+:([^\n]|\n\t)*status: active'"  # 活跃网络接口

# =====================================
# 应用程序别名
# =====================================

# 浏览器
alias arc='/Applications/Arc.app/Contents/MacOS/Arc'  # Arc 浏览器

# 系统工具
alias plistbuddy="/usr/libexec/PlistBuddy"  # PlistBuddy 工具
alias airport='/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport'  # Airport CLI

# Chrome 相关
alias chromekill="ps ux | grep '[C]hrome Helper --type=renderer' | grep -v extension-process | tr -s ' ' | cut -d ' ' -f2 | xargs kill"  # 杀死 Chrome 标签页

# =====================================
# macOS 专用别名
# =====================================

# Finder 设置
alias showh="defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder"    # 显示隐藏文件
alias hideh="defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder"   # 隐藏隐藏文件
alias hidedesktop="defaults write com.apple.finder CreateDesktop -bool false && killall Finder"  # 隐藏桌面图标
alias showdesktop="defaults write com.apple.finder CreateDesktop -bool true && killall Finder"  # 显示桌面图标

# Spotlight
alias spotoff="sudo mdutil -a -i off"  # 禁用 Spotlight
alias spoton="sudo mdutil -a -i on"     # 启用 Spotlight

# 锁屏
alias afk="/System/Library/CoreServices/Menu\ Extras/User.menu/Contents/Resources/CGSession -suspend"  # 锁屏

# 重载 shell
alias reload="exec ${SHELL} -l"  # 重载 shell

# =====================================
# 实用函数
# =====================================

# fzf 目录跳转函数
cdf() {
  local target
  target=$(fzf) || return

  if [ -d "$target" ]; then
    cd "$target" || return
  else
    cd "$(dirname "$target")" || return
  fi
}

# =====================================
# 其他工具别名
# =====================================

# 编码别名
alias urlencode='python -c "import sys, urllib as ul; print ul.quote_plus(sys.argv[1]);"'  # URL 编码

# PDF 合并
alias mergepdf='gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=_merged.pdf'  # 合并 PDF

# 工具映射
command -v hd > /dev/null || alias hd="hexdump -C"           # hexdump 备用
command -v md5sum > /dev/null || alias md5sum="md5"          # md5sum 备用
command -v sha1sum > /dev/null || alias sha1sum="shasum"      # sha1sum 备用

# JavaScriptCore REPL
jscbin="/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Resources/jsc"
[ -e "${jscbin}" ] && alias jsc="${jscbin}"
unset jscbin

# HTTP 方法别名
for method in GET HEAD POST PUT DELETE TRACE OPTIONS; do
  alias "${method}"="lwp-request -m '${method}'"
done

# 音量控制
alias stfu="osascript -e 'set volume output muted true'"        # 静音
alias pumpitup="osascript -e 'set volume output volume 100'"    # 最大音量

# =====================================
# 其他实用别名
# =====================================

# Docker 别名
alias d="docker"                      # Docker 简写
alias dps="docker ps"                 # 查看运行容器
alias dpsa="docker ps -a"             # 查看所有容器
alias dim="docker images"             # 查看镜像
alias dr="docker run"                 # 运行容器
alias drd="docker run -d"             # 后台运行容器
alias drm="docker rm"                 # 删除容器
alias drmi="docker rmi"               # 删除镜像
alias db="docker build"               # 构建镜像
alias dl="docker logs"                # 查看日志
alias dlf="docker logs -f"            # 实时查看日志
alias de="docker exec"                # 进入容器
alias dex="docker exec -it"           # 交互式进入容器
alias dst="docker stop"               # 停止容器
alias drs="docker restart"            # 重启容器
alias dprune="docker system prune -f" # 清理无用资源

# Kubernetes 别名
alias k="kubectl"                     # Kubectl 简写
alias kg="kubectl get"                # 获取资源
alias kgp="kubectl get pods"          # 获取 Pod
alias kgs="kubectl get svc"           # 获取 Service
alias kgn="kubectl get nodes"         # 获取 Node
alias kd="kubectl describe"           # 描述资源
alias kdp="kubectl describe pod"      # 描述 Pod
alias kdel="kubectl delete"           # 删除资源
alias klogs="kubectl logs"            # 查看日志
alias klf="kubectl logs -f"           # 实时查看日志
alias kex="kubectl exec -it"          # 进入容器
alias kaf="kubectl apply -f"          # 应用配置
alias kdf="kubectl delete -f"         # 删除配置
alias kctx="kubectl config use-context" # 切换上下文
alias kns="kubectl config set-context --current --namespace" # 切换命名空间

# Tmux 别名
alias t="tmux"                       # Tmux 简写
alias ta="tmux attach -t"            # 附加会话
alias tn="tmux new -s"               # 新建会话
alias tl="tmux ls"                   # 列出会话
alias tk="tmux kill-session -t"      # 杀死会话

# Git 扩展别名
alias gl="git log --oneline"         # 简洁日志
alias glg="git log --graph --oneline --all" # 图形化日志
alias gco="git checkout"             # 切换分支
alias gcb="git checkout -b"          # 创建并切换分支
alias gp="git pull"                  # 拉取代码
alias gpf="git push --force"         # 强制推送
alias gr="git rebase"                # 变基
alias gri="git rebase -i"            # 交互式变基
alias grc="git rebase --continue"    # 继续变基
alias gra="git rebase --abort"       # 放弃变基
alias gss="git stash"                # 暂存
alias gsp="git stash pop"            # 恢复暂存
alias gsl="git stash list"           # 查看暂存列表
alias gsd="git stash drop"           # 删除暂存
alias gcp="git cherry-pick"          # 拣选提交
alias grh="git reset HEAD"            # 重置暂存区
alias grhh="git reset HEAD --hard"   # 硬重置
alias gclean="git clean -fd"         # 清理未跟踪文件

# 文件操作别名
alias cp="cp -iv"                    # 复制文件（确认模式）
alias mv="mv -iv"                    # 移动文件（确认模式）
alias rm="rm -iv"                    # 删除文件（确认模式）
alias mkdir="mkdir -pv"              # 创建目录（包含父目录）
alias less="less -R"                 # 彩色显示
alias du="du -h"                     # 人类可读格式显示大小
alias dus="du -sh"                   # 显示当前目录总大小
alias df="df -h"                     # 人类可读格式显示磁盘空间
alias free="free -h"                 # 人类可读格式显示内存

# 系统信息别名
alias sysinfo="uname -a"             # 系统信息
alias cpuinfo="top -l 1 | head -n 10" # CPU 信息
alias meminfo="top -l 1 | head -n 15" # 内存信息
alias diskinfo="df -h"               # 磁盘信息
alias netinfo="netstat -i"           # 网络信息
alias psa="ps aux"                   # 显示所有进程
alias psg="ps aux | grep"            # 搜索进程

# 压缩解压别名
alias untar="tar -xvf"               # 解压 tar
alias untgz="tar -xzvf"              # 解压 tar.gz
alias untbz="tar -xjvf"              # 解压 tar.bz2
alias txz="tar -cJf"                 # 压缩 tar.xz
alias tgz="tar -czf"                 # 压缩 tar.gz
alias tbz="tar -cjf"                 # 压缩 tar.bz2

# 网络工具别名
alias myip="curl ipinfo.io/ip"        # 获取外网IP
alias ping="ping -c 4"               # 默认ping 4次
alias ports="lsof -i"                # 显示端口占用
alias port="lsof -i :"               # 查看指定端口
alias ss="ss -tuln"                  # 显示套接字信息
alias netstat="netstat -tuln"        # 显示网络连接
alias wget="wget -c"                 # 断点续传下载

# 开发工具别名
alias y="yarn"                       # Yarn 简写
alias yi="yarn install"              # 安装依赖
alias ya="yarn add"                  # 添加依赖
alias yrm="yarn remove"              # 移除依赖
alias ys="yarn start"                # 启动项目
alias yb="yarn build"                # 构建项目
alias yt="yarn test"                 # 运行测试
alias n="npm"                        # NPM 简写
alias ni="npm install"               # 安装依赖
alias ns="npm start"                 # 启动项目
alias nt="npm test"                  # 运行测试
alias nb="npm run build"             # 构建项目

# 监控别名
alias htop="htop -t"                 # 显示进程树
alias watch="watch -n 1"             # 每秒刷新
alias mem="watch -n 1 free -h"       # 监控内存
alias cpu="watch -n 1 top -l 1 | head -n 15" # 监控CPU
alias disk="watch -n 1 df -h"        # 监控磁盘

# 快速编辑别名
alias zshconfig="vim ~/.zshrc"       # 编辑 zshrc
alias zshreload="source ~/.zshrc"    # 重新加载 zshrc
alias vimconfig="vim ~/.vimrc"       # 编辑 vimrc
alias hosts="sudo vim /etc/hosts"    # 编辑 hosts 文件

# 安全别名
alias ssh="ssh -o StrictHostKeyChecking=no" # SSH 连接时跳过主机密钥检查
alias scp="scp -o StrictHostKeyChecking=no" # SCP 传输时跳过主机密钥检查

# 快速启动别名
alias code="open -a Visual\ Studio\ Code" # 用 VSCode 打开
alias chrome="open -a Google\ Chrome"   # 用 Chrome 打开
alias safari="open -a Safari"            # 用 Safari 打开
alias finder="open ."                   # 用 Finder 打开当前目录

# =====================================
# 主题配置加载
# =====================================

# Powerlevel10k 配置
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
