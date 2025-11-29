/**
 * 现代化博客增强脚本
 * 包含回到顶部按钮、平滑滚动等功能
 */

(function() {
    'use strict';

    // ============ 回到顶部按钮 ============
    function initBackToTop() {
        // 创建回到顶部按钮
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('title', '回到顶部');
        document.body.appendChild(backToTop);

        // 监听滚动事件
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // 点击回到顶部
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============ 增强文章卡片动画 ============
    function initCardAnimation() {
        const cards = document.querySelectorAll('.post-preview');
        
        // 使用 Intersection Observer API 实现滚动时的动画
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });

            cards.forEach(function(card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }
    }

    // ============ 图片懒加载 ============
    function initLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // 降级处理
            images.forEach(function(img) {
                img.src = img.dataset.src;
            });
        }
    }

    // ============ 导航栏滚动效果 ============
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar-custom');
        if (!navbar) return;

        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('is-fixed');
                
                // 向下滚动隐藏，向上滚动显示
                if (scrollTop > lastScrollTop) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('is-fixed');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ============ 平滑锚点跳转 ============
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============ 外部链接新窗口打开 ============
    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        
        links.forEach(function(link) {
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // ============ 复制代码功能 ============
    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre');
        
        codeBlocks.forEach(function(block) {
            // 创建复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.innerHTML = '复制';
            copyBtn.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                padding: 4px 12px;
                font-size: 12px;
                background: rgba(255,255,255,0.9);
                border: 1px solid #ddd;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            `;
            
            // 设置 pre 为相对定位
            block.style.position = 'relative';
            block.appendChild(copyBtn);
            
            // 复制功能
            copyBtn.addEventListener('click', function() {
                const code = block.querySelector('code') || block;
                const text = code.textContent;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(function() {
                        copyBtn.innerHTML = '已复制！';
                        setTimeout(function() {
                            copyBtn.innerHTML = '复制';
                        }, 2000);
                    });
                }
            });
            
            // 悬停效果
            copyBtn.addEventListener('mouseenter', function() {
                this.style.background = '#0085a1';
                this.style.color = '#fff';
                this.style.borderColor = '#0085a1';
            });
            
            copyBtn.addEventListener('mouseleave', function() {
                if (this.innerHTML === '复制') {
                    this.style.background = 'rgba(255,255,255,0.9)';
                    this.style.color = '#000';
                    this.style.borderColor = '#ddd';
                }
            });
        });
    }

    // ============ 阅读进度条 ============
    function initReadingProgress() {
        // 创建进度条
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #0085a1 0%, #00b4d8 50%, #90e0ef 100%);
            width: 0%;
            z-index: 9999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);

        // 更新进度
        window.addEventListener('scroll', function() {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ============ 初始化所有功能 ============
    function init() {
        // DOM 加载完成后执行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initBackToTop();
                initCardAnimation();
                initLazyLoad();
                initNavbarScroll();
                initSmoothScroll();
                initExternalLinks();
                initCodeCopy();
                initReadingProgress();
            });
        } else {
            initBackToTop();
            initCardAnimation();
            initLazyLoad();
            initNavbarScroll();
            initSmoothScroll();
            initExternalLinks();
            initCodeCopy();
            initReadingProgress();
        }
    }

    // 启动
    init();

})();

