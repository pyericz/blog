---
layout: post
title: "触摸屏禁用css鼠标悬停"
date: 2017-08-23
categories: javascript
tag: [hover, js, css]
---
* content
{:toc}

对触摸屏来说, css中```:hover```的定义本身是没有意义的。当我们定义的```:hover```行为在非触摸屏浏览器中表现良好时，在触摸屏上的表现却会让人困扰：
当用户通过click或tap的方式选中其中一个有```:hover```的元素时，该元素会保持住```:hover```的状态，直至失去焦点。
有一种解决的方式是判断如果设备是触摸屏设备，则移除掉所有的```:hover```定义。


### 移除方法

完整的代码如下：
```js
(function() {
    var touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;

    if (touch) { // 移除所有:hover配置
        try { // 防止不支持DOM样式的浏览器抛出异常
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;

                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;

                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }
}());
```
具体来说，首先判断是否为触摸屏
```js
var touch = 'ontouchstart' in document.documentElement
    || navigator.maxTouchPoints > 0
    || navigator.msMaxTouchPoints > 0;
```

如果是，则遍历并移除所有的定义。
```js
for (var si in document.styleSheets) {
    var styleSheet = document.styleSheets[si];
    if (!styleSheet.rules) continue;

    for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
            styleSheet.deleteRule(ri);
        }
    }
}
```
对于手机端，和非触摸屏的pc端，这段代码可以很好地帮助解决问题。但对于既支持触摸屏，又支持鼠标的PC，就会有问题了。因为用鼠标操作的时候，由于被判断为触摸屏，所有的```:hover```已经被移除掉了，导致鼠标的悬停操作不起作用。
至于如何解决这一困难，还需要继续探索。

### 参考
- [How to remove/ignore :hover css style on touch devices](https://stackoverflow.com/a/30303898)
