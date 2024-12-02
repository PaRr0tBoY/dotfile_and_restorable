# Deploy And publish website to UpYun
hexodir=(/Users/acid/Documents/repo/parr0tboy.github.io 副本)

cd "$hexodir"
hexo d
upx sync public /
