#!/bin/bash

# 博客预览脚本
# 用于在本地启动 Jekyll 服务器查看博客效果

echo "🚀 正在启动博客预览服务器..."
echo ""
echo "📝 注意事项："
echo "   1. 请确保已安装 Jekyll 和 Bundler"
echo "   2. 如果是首次运行，请先执行: bundle install"
echo "   3. 服务器启动后，请在浏览器访问: http://localhost:4000"
echo ""
echo "按 Ctrl+C 可以停止服务器"
echo ""
echo "----------------------------------------"
echo ""

# 检查是否安装了 Jekyll
if ! command -v jekyll &> /dev/null
then
    echo "❌ 错误: 未检测到 Jekyll"
    echo "请先安装 Jekyll: gem install jekyll bundler"
    exit 1
fi

# 启动 Jekyll 服务器
bundle exec jekyll serve --livereload

