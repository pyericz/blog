/* jshint asi:true */

/**
 * [fixSidebar description]
 * 滚轮滚到一定位置时，将 sidebar-wrap 添加 fixed 样式
 * 反之，取消样式
 */
(function() {
    if (window.innerWidth > 770) {

        var sidebarWrap = document.querySelector('.right>.wrap');

        //fix 之后百分比宽度会失效，这里用js赋予宽度
        sidebarWrap.style.width = sidebarWrap.offsetWidth + "px";
        sidebarWrap.classList.add('fixed');

        setContentMaxHeightInPC(); //设置目录最大高度(PC端)
    }
    moveTOC(); //将Content内容转移
}());

/**
 * 设置目录最大高度
 */
function setContentMaxHeightInPC() {
    var windowHeight = window.innerHeight;
    var contentUl = document.querySelector('.content-ul');
    var contentMaxHeight = windowHeight - 77 - 60;
    contentUl.style.maxHeight = contentMaxHeight + 'px';
}

/**
 * 达到最大高度
 * @return {Boolean} [description]
 */
function isMaxHeight() {
    var windowHeight = window.innerHeight;
    var contentUl = document.querySelector('.content-ul');
    var contentMaxHeight = windowHeight - 77 - 60;
    var contentHeight = contentUl.offsetHeight;
    return contentMaxHeight === contentHeight;
}


//-------------mobile--------------
/**
 * 屏幕宽度小于770px时，点击锚点按钮，弹出目录框
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {
    if (window.innerWidth <= 770) {
        var anchorBtn = document.querySelector('.anchor');
        var rightDiv = document.querySelector('.right');

        /**
         * 监听锚点按钮
         */
        anchorBtn.onclick = function(e) {
            e.stopPropagation();
            rightDiv.classList.add('right-show');
            anchorBtn.classList.add('anchor-hide');
        };

        //监听body，点击body，隐藏Content
        document.querySelector('body').addEventListener('click', function() {
            rightDiv.classList.remove('right-show');
            anchorBtn.classList.remove('anchor-hide');
        });
        var touchMoved = false;
        document.querySelector('body').addEventListener('touchstart', function() {
            touchMoved = false;
        });
        document.querySelector('body').addEventListener('touchmove', function() {
            touchMoved = true;
        });
        document.querySelector('body').addEventListener('touchend', function() {
            if (!touchMoved) {
                rightDiv.classList.remove('right-show');
                anchorBtn.classList.remove('anchor-hide');
            }
        });

        ancherPostion(anchorBtn, rightDiv); //目录锚的位置固定
        setContentMaxHeight(); //设置目录最大高度
    }
}());

/**
 * 目录锚的位置固定
 */
function ancherPostion(anchorBtn, rightDiv) {
    window.addEventListener('scroll', function() {
        var top = anchorBtn.getBoundingClientRect().top;
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        anchorBtn.style.top = '72px';
        rightDiv.style.top = '72px';
    });
}

/**
 * 设置目录最大高度
 */
function setContentMaxHeight() {
    var windowHeight = window.innerHeight;
    var contentUl = document.querySelector('.content-ul');
    var contentMaxHeight = windowHeight - 180;
    contentUl.style.maxHeight = contentMaxHeight + 'px';
}

//-------------post Content----------------------
//将Content内容转移
function moveTOC() {
    if (document.querySelector('#markdown-toc') !== null) {
        var TOCString = document.querySelector('#markdown-toc').innerHTML;
        var contentUl = document.querySelector('#content-side');
        contentUl.insertAdjacentHTML('afterbegin', TOCString); //插入字符串

        var aTags = document.querySelectorAll('#content-side a');

        for (var i = 0; i < aTags.length; i++) {
            if (!aTags[i].classList.contains('scroll')) {
                aTags[i].classList.add('scroll');
            }
        }
    }
}

/**
 * 判断安卓版微信浏览器
 * @return {Boolean} [description]
 */
function isAndroidWechatBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    return /micromessenger/.test(ua) && /android/.test(ua2);
}
