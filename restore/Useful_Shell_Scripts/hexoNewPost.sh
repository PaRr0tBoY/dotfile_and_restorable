# Create New Hexo Post And Open It
hexodir=(/Users/acid/Documents/repo/parr0tboy.github.io 副本)

cd "$hexodir"
hexo new post "{query}"
open -a "UlyssesMac" ./source/_posts/$(date +%Y-%m-%d)-"{query}".md
