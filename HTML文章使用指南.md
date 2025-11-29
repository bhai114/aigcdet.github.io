# 📝 如何添加 HTML 格式的文章

## 📋 文件命名规则

文章文件必须按照以下格式命名：
```
YYYY-MM-DD-文章标题.html
```

例如：
- `2025-11-29-我的第一篇文章.html`
- `2025-12-01-HTML使用指南.html`

## 🎨 HTML 文章模板

已经在 `_posts` 文件夹中创建了一个模板文件：
```
2025-11-29-HTML文章模板示例.html
```

您可以复制这个文件作为新文章的起点。

## 📄 文章结构

每个 HTML 文章都需要包含以下部分：

### 1. Front Matter（必需）

在文件开头添加：

```yaml
---
layout: post
title: 文章标题
subtitle: 文章副标题（可选）
date: 2025-11-29
author: 作者名
tags:
    - 标签1
    - 标签2
---
```

### 2. HTML 内容

Front Matter 之后就是您的 HTML 内容。

## ✨ 快速开始

### 方法一：复制模板
```bash
cd _posts
cp 2025-11-29-HTML文章模板示例.html 2025-12-01-我的新文章.html
# 然后编辑新文件
```

### 方法二：新建文件

创建一个新的 `.html` 文件，按照以下结构：

```html
---
layout: post
title: 我的文章标题
date: 2025-11-29
author: 我的名字
tags:
    - 技术
---

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* 在这里添加自定义样式 */
    </style>
</head>
<body>
    <div class="article-content">
        <h2>标题</h2>
        <p>这是内容...</p>
    </div>
</body>
</html>
```

## 🎨 可用的样式类

模板中包含以下预定义样式：

### 提示框
```html
<div class="highlight-box">
    <strong>💡 重点：</strong> 重要信息
</div>

<div class="info-box">
    <strong>ℹ️ 信息：</strong> 提示信息
</div>

<div class="warning-box">
    <strong>⚠️ 注意：</strong> 警告信息
</div>
```

### 代码
```html
<p>内联代码：<code>代码</code></p>

<pre><code>代码块
多行代码
</code></pre>
```

### 引用
```html
<blockquote>
    引用内容
</blockquote>
```

### 表格
```html
<table>
    <thead>
        <tr>
            <th>列1</th>
            <th>列2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>数据1</td>
            <td>数据2</td>
        </tr>
    </tbody>
</table>
```

## 💡 提示

1. **Front Matter 必须在文件开头**，否则 Jekyll 无法识别
2. **文件名必须包含日期**，格式为 `YYYY-MM-DD-`
3. **使用 UTF-8 编码**保存文件
4. **样式可以内联**在 HTML 中，也可以使用外部 CSS
5. **提交后等待 1-2 分钟** GitHub Pages 才会更新

## 📁 关于现有的 Markdown 文件

现有的两篇 Markdown 文章已保留：
- `2021-03-29-KVO详解.md`
- `2016-01-06-ReactiveCocoa-进阶.md`

**它们可以继续使用**，Jekyll 支持混合使用 Markdown 和 HTML 文件。

如果您想删除它们：
```bash
cd _posts
rm *.md
```

## 🚀 部署步骤

1. 创建或编辑 HTML 文章
2. 保存到 `_posts` 文件夹
3. 提交到 GitHub：
```bash
git add _posts/
git commit -m "添加新文章"
git push origin master
```
4. 等待 1-2 分钟，访问网站查看

## 📞 常见问题

### Q: 文章不显示？
A: 检查：
- 文件名是否符合格式（包含日期）
- Front Matter 是否正确
- 文件是否在 `_posts` 文件夹中

### Q: 样式不生效？
A: 确保：
- CSS 写在 `<style>` 标签中
- 或者使用内联样式 `style="..."`

### Q: 可以混用 Markdown 和 HTML 吗？
A: 可以！Jekyll 支持同时使用两种格式。

---

**祝您写作愉快！** ✨

