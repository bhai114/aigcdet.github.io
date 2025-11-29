#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动更新 _posts 文件夹中 HTML 文件的修改时间到 front matter
使用方法: python3 update_post_dates.py
"""

import os
import re
from datetime import datetime, timezone, timedelta

def get_file_mtime(filepath):
    """获取文件的修改时间（北京时间 UTC+8）"""
    # 获取文件修改时间（Unix 时间戳）
    mtime = os.path.getmtime(filepath)
    
    # 转换为北京时间（UTC+8）
    beijing_tz = timezone(timedelta(hours=8))
    dt = datetime.fromtimestamp(mtime, tz=beijing_tz)
    
    return dt.strftime('%Y-%m-%d %H:%M:%S')

def update_front_matter(filepath):
    """更新文件的 front matter 中的 date 字段"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 获取文件修改时间
        file_date = get_file_mtime(filepath)
        
        # 检查是否已有 front matter
        if not content.startswith('---'):
            print(f"⚠️  {os.path.basename(filepath)}: 没有 front matter，跳过")
            return False
        
        # 提取 front matter
        front_matter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
        if not front_matter_match:
            print(f"⚠️  {os.path.basename(filepath)}: front matter 格式错误，跳过")
            return False
        
        front_matter = front_matter_match.group(1)
        rest_content = content[front_matter_match.end():]
        
        # 检查是否已有 date 字段
        date_pattern = r'^date:\s*.*$'
        if re.search(date_pattern, front_matter, re.MULTILINE):
            # 更新现有的 date 字段
            new_front_matter = re.sub(
                date_pattern,
                f'date: {file_date}',
                front_matter,
                flags=re.MULTILINE
            )
        else:
            # 添加新的 date 字段（在 layout 之后）
            if 'layout:' in front_matter:
                new_front_matter = re.sub(
                    r'(layout:\s*.*)',
                    r'\1\ndate: ' + file_date,
                    front_matter
                )
            else:
                new_front_matter = f'date: {file_date}\n{front_matter}'
        
        # 重新组合文件内容
        new_content = f'---\n{new_front_matter}\n---{rest_content}'
        
        # 写回文件
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ {os.path.basename(filepath)}: 更新日期为 {file_date}")
        return True
        
    except Exception as e:
        print(f"❌ {os.path.basename(filepath)}: 错误 - {str(e)}")
        return False

def main():
    """主函数"""
    posts_dir = '_posts'
    
    if not os.path.exists(posts_dir):
        print(f"❌ 错误: {posts_dir} 文件夹不存在")
        return
    
    html_files = [f for f in os.listdir(posts_dir) if f.endswith('.html')]
    
    if not html_files:
        print(f"⚠️  {posts_dir} 文件夹中没有找到 HTML 文件")
        return
    
    print(f"📝 找到 {len(html_files)} 个 HTML 文件\n")
    
    updated_count = 0
    for filename in html_files:
        filepath = os.path.join(posts_dir, filename)
        if update_front_matter(filepath):
            updated_count += 1
    
    print(f"\n✨ 完成！成功更新 {updated_count}/{len(html_files)} 个文件")

if __name__ == '__main__':
    main()

