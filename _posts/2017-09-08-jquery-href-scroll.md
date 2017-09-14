---
layout: post
title: 结合jQuery实现链接标题的滚动置顶
date: 2017-09-08
categories: javascript
tag: [jquery, javascript, scroll, href]
---
* content
{:toc}

{{ site.title }}为每一篇文章指定了**分类**和**标签**，当用户点击了某篇文章的分类链接或标签链接时，{{ site.title }}会跳转到对应的分类页或标签页。当页面加载完时，页面应把分类或标签对应的标题主动滚动到置顶位置。若用户在标签页点击其他标签时，该标签对应的标题也应滚动到最上面；但若用户点击的是分类，则跳转到分类页，并滚动置顶对应的分类标题。分类页也是相同的行为。那么如何实现这一目标呢？


## 分析

首先，并不是每一个链接都需要有上文所述的行为，因此有必要为分类和标签指定特殊的类别，用于区分其他链接。可以将所有有这种行为的链接指定为：
```html
<a class="scroll" href="..." />
```
接下来我们需要为每一个分类和标签指定对应的链接地址，这样在页面跳转的时候，代码能够知道目标地址。以本文为例，本文指定了文章类别为```javascript```，包含标签```jquery```，那么我们需要在生成的HTML中有如下定义：

类别

```html
<a class="scroll" href="category/#javascript" />
```
标签
```html
<a class="scroll" href="tag/#jquery" />
```
有了这样的HTML定义，我们就要分析如何定义上述的行为目标。

当页面不发生变化的时候，我们应该阻止默认的跳转行为，否则等于是重新加载了页面。当我们执行浏览器的后退操作的时候，会发现还在同一个页面，这显然不是我们想看到的。判断方式很简单，就是除去链接的hash值，如```#javascript```和```#jquery```, 目标链接和当前页面的链接路径是否一致？如果一致，则阻止默认事件行为，并执行滚动操作；如果不一致，则按照链接跳转的默认行为执行。

至此，我们可以递归遍历所有scroll类型的元素，监听每一个链接的点击操作，并执行如上的行为了。不过，等等，我们还有一个目标没实现，就是当页面加载完时，需要默认执行滚动到指定元素的操作。显然，我们可以在递归遍历的时候判断当前页面指向的hash值，是否和遍历到的元素对应起来，如果是，则执行一遍滚动就是了。遍历的代码如下：
```js
var elements=document.querySelectorAll("a.scroll");
var uri = document.URL;

(function parse(index){

    var element=elements.item(index);
    var href = element.getAttribute("href");

    if (href && uri.indexOf(href) != -1) {
        scroll(element);
    }
    element.addEventListener("click",function(event){
        var from = uri;
        var to = event.currentTarget.href;

        var index0 = from.indexOf('#');
        var index1 = to.indexOf('#');

        if (index0 != -1) {
            from = from.substr(0, index0);
        }

        if (index1 != -1) {
            to = to.substr(0, index1);
        }

        if (from == to) {
            event.preventDefault();
            scroll(element);
        }
    });

    if(index>0) parse(index-1);

})(elements.length-1);
```
好了，有了对滚动行为的解析，接下来就是如何定义滚动了。这个就要借助jQuery定义的animate方法来实现了。代码如下：
```js
var scroll=function(element){
    var href = element.getAttribute("href");
    var index = href.indexOf('#');
    var tag = href.substr(index);
    var top = $(tag).offset().top - 62;
    $("html, body").animate({ scrollTop: top }, {duration: 300, easing: "easeOutSine"});
}
```
这里我们用到了jQuery的easing插件来实现缓动曲线，当然这不是必要的。在上面的代码中，我们从链接路径中提取hash值，获取对应元素的位置（减去62是考虑到了{{site.title}}的header是常驻的，需要一定的偏移才能保证滚动完的元素不被header遮挡），并执行了滚动操作。

## 完整源码

完整的源码如下，大家可以结合上面的分析仔细阅读。

```js
document.addEventListener("DOMContentLoaded",function(){
    var scroll=function(element){
        var href = element.getAttribute("href");
        var index = href.indexOf('#');
        var tag = href.substr(index);
        var top = $(tag).offset().top - 62;
        $("html, body").animate({ scrollTop: top }, {duration: 300, easing: "easeOutSine"});

    },elements=document.querySelectorAll("a.scroll");

    var uri = document.URL;

    (function parse(index){

        var element=elements.item(index);
        var href = element.getAttribute("href");

        if (href && uri.indexOf(href) != -1) {
            scroll(element);
        }
        element.addEventListener("click",function(event){
            var from = uri;
            var to = event.currentTarget.href;

            var index0 = from.indexOf('#');
            var index1 = to.indexOf('#');

            if (index0 != -1) {
                from = from.substr(0, index0);
            }

            if (index1 != -1) {
                to = to.substr(0, index1);
            }

            if (from == to) {
                event.preventDefault();
                scroll(element);
            }
        });

        if(index>0) parse(index-1);

    })(elements.length-1);
});

```
