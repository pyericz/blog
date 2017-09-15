---
layout: post
title: ES6中箭头函数中this的本质
date: 2017-09-15
categories: javascript
tag: [es6, this, javascript, arrow, function]
---

* content
{:toc}

ECMAScript 6（简称ES6）中引入了箭头(```=>```)函数，使函数的定义简洁了许多。可以简单对比如下两种函数的定义方式：
- 传统方式
```js
var isEven = function(x) { return x % 2 === 0;}
```
- 箭头函数
```js
var isEven = x => x % 2 === 0;
```

初次学习箭头函数，可能容易被```this```的行为搞混。本篇通过简单的例子梳理箭头函数中```this```的本质。



## 引论

>箭头函数内部并不存在```this```的绑定机制。如果箭头函数中使用了```this```，那么该```this```指向的只能是外层代码中定义的```this```。正因为箭头函数中没有```this```的绑定机制，**箭头函数是不能作为构造函数使用的**。

## 探究

以如下简单的代码片段为例：
```js
function foo() {
    console.log("outer:", this);
    console.log("\n");
    let inner1 = function() {
        console.log("inner1:", this);
    };
    let inner2 = ()=> void console.log("inner2:", this);
    inner1();
    inner2();
    console.log("============");
    var obj = {id: 0};
    inner1.call(obj);
    inner2.call(obj);
}

foo.call({id: 100});
```
其执行结果为：
```
outer: {id: 100}

inner1: Window
inner2: {id: 100}
============
inner1: {id: 0}
inner2: {id: 100}
```
从这个结果可以看出，无论是否给```inner2```函数传递对象，```inner2```函数中的```this```始终指向传给```foo```函数的对象。可见，箭头函数的```this```总是指向**外层函数定义生效时所在的对象**（本例中是```{id: 100}```），就好像```this```被固化了。而普通函数```inner1```则会受到传递给它的对象的影响。

本质上，```this```指向的固化并非箭头函数内部有自己的一套绑定```this```的机制；恰恰相反，箭头函数内部并不存在任何```this```的绑定机制。正因为如此，如果箭头函数中使用了```this```，由于函数内部并未定义```this```，那么该```this```指向的只能是外层代码中定义的```this```，在本例中即为传给```foo```函数的对象```{id: 100}```。

正因为箭头函数中没有```this```的绑定机制，**箭头函数是不能作为构造函数使用的**。

那么为什么不给箭头函数绑定```this```呢？答案就是这样做有利于封装回调函数。举个例子

```js
var eventHandler = {
    register: function() {
        document.addEventListener('click',event=>this.onClick(event));
    },

    onClick: function(event) {
        console.log("onclicked");
    }
}

eventHandler.register();
```
在这段代码片段中，如果```register```函数订阅事件的回调函数不是使用箭头函数，```this```指向的就是```document```，从而会因为找不到```document```的```onClick```方法而报错。如果不绑定```this```，```this```只能指向```eventHandler```，从而确保了回调的正确性。

