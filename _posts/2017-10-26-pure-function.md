---
layout: post
title: 函数式编程——纯函数
date: 2017-10-26
categories: fp
tag: [fp, functional, programming, javascript]
---
* content
{:toc}

**纯函数**(Pure Function)的是函数式编程中一个非常重要的概念，是函数式编程关于“避免使用**状态**(State)或**可变数据**(Mutable Data)”这一定义的最直接推论。那么，什么是纯函数？为什么函数式编程追求纯函数的使用？


>所谓纯函数，指的是给定相同的输入，总会返回相同的输出，且不会产生任何可观察的副作用(Obversable Side Effect)的函数。

我们可以通过一个简单的例子来观察下，什么是纯函数，什么是非纯函数(Impure Function)。

我们先来看非纯函数的样子

```javascript
var minimum = 21;

var isValid = function(num) {
	return num >= minimum;
};
```
在这个```isValid```的函数定义中，```minimum```变量定义在外部，是一个可能被外部环境影响的变量。因此在不同的系统状态中，给定```isValid```函数同样的输入，是有可能返回不同的输出结果的，因此不属于纯函数。那么，怎么改成纯函数呢？只需要把```minimum```封装到函数内部即可。

```javascript
var isValid = function(num) {
	let minimum = 21;
	return num >= minimum;
};
```
在这个实现中，```minimum```的作用域只在函数内部，因此不会产生任何副作用，且相同的输入一定会返回相同的输出，因此是纯函数。

那么上面提到的副作用具体指什么？

>所谓副作用(Side Effect)，是指函数在计算的过程中，改变了系统的状态，或者与外界进行了可观测的交互(Observable Interaction)。

因此，副作用应包括但不限于：
- 更改文件系统
- 插入一条记录到数据库
- 发起http网络请求
- 可变数据
- 打印到终端或屏幕/log
- 响应用户的输入
- DOM查询/操作
- 访问系统状态
- 获取随机数
- 获取当前时间

总之，函数式编程的哲学观是，任何产生副作用的函数应该是由错误的行为导致的。

**注意，函数式编程不是要求只能使用纯函数，而是尽量使用纯函数。**在编程中，我们不可能放弃http请求，不可能放弃把信息打印到屏幕，不可能放弃响应用户输入，如果函数式编程禁止使用这些手段，我们将寸步难行；因此，函数式编程不可能只有纯函数。**既然不能完全抛弃非纯函数，我们也同样希望存在一些可控的方式来使用它们**。这里会有一系列的手段来处理，包括```functor```和```monad```的概念。本文并不打算展开讲解这些手段（留待后续的文章介绍），只简单介绍**延迟求值**(Defer Evaluation)或**惰性求值**(Lazy Evaluation)的方式。

```javascript
var pureHttpCall = function(url, params) {
	return function() {
		return $.getJSON(url, params);
	};
};
```
在这里，```pureHttpCall```函数并不直接发起网络请求，而是返回一个匿名函数

```javascript
return function() {
	return $.getJSON(url, params);
};
```
该函数只有在被调用的时候，才真正执行网络请求，这就是所谓的延迟求值或惰性求值。我们说```pureHttpCall```是纯函数，是因为对它来说，同样的输入（给定相同的```url和```和```params```），总是返回同样的输出。

那么，使用纯函数有什么意义呢？

### 可缓存(Cacheable)
由于给定相同的输入，总能得到相同的输出，因此可以对返回结果做缓存处理，这样下次如果还有相同的函数调用，就可以直接返回结果，优化了执行效率。

我们可以使用下面的方法来缓存结果

```javascript
function cacheFunc(func) {
	var cache = {}
	return function() {
		var argStr = JSON.stringfy(arguments);
		cache[argStr] = cache[argStr] || func.apply(func, arguments);
		return cache[argStr];
	};
}
```

有了```cacheFunc```，就可以这样来定义一个纯函数

```javascript
var squareNumber = cacheFunc(function(x){
	return x * x;
});

squareNumber(4);
// => 16

squareNumber(4); // returns cache for input 4
// => 16
```

### 可移植/自文档化(Portable/Self-Documenting)
纯函数是完全自给自足的。它不依赖于系统状态，因此如果我们要得到一个可操作系统状态相关的纯函数，该系统必须传递给这个纯函数；意味着，纯函数应该得到任何需要用到的东西，函数的依赖必须明确指定出来。在开始之前，关于纯函数处理系统状态，读者请先理一下思路：我们在上文已经提到过了，通过延迟执行的方式，我们可以把一个非纯操作封装到一个纯函数的返回值中。看下面的例子

```javascript
// impure
var signUp = function(attrs) {
	var user = saveUser(attrs);
	welcomeUser(user);
};

var saveUser = function(attrs) {
	var user = Db.save(attrs);
	...
};

var welcomeUser = function(user) {
	Email(user, ...);
	...
};
```

```javascript
// pure
var signUp = function(Db, Email, attrs) {
	return function() {
		var user = saveUser(Db, attrs);
		welcomeUser(Email, user);
	};
};

var saveUser = function(Db, attrs) {
	...
};

var welcomeUser = function(Email, user) {
	...
};
```
上面例子说明了纯函数必须明确告知他所依赖的对象、方法等，比如这里的```Db```,```Email```,```attrs```。对于这种需要强制“注入”依赖的函数，实际上提供了更丰富的接口信息，我们不需要额外的文档信息来告诉我们函数内部使用了什么```Db```，用了什么```Email```方法，接口本身就要求这些信息是传递进去的。也正因为这种强制“注入”的依赖，使得我们的函数变得更方便移植：不同的系统也许使用的是不同的数据库，那么只要传入该系统对应数据库给该函数就是了。可以对比参考命令式编程(Imperative Programming)的情况。命令式编程在编程过程中耦合的系统状态和必要依赖等，会导致命令式编程的函数无法很方便地移植到另一个系统中。

### 可测试(Testable)
正因为确定的输入有确定的输出，对纯函数的测试会变得更加简单。我们不需要为了测试一个函数，而去mock一个相同的系统环境；要做的只需要定义好输入，定义好输出断言(assert)就可以了。

### 引用透明(Referential Transparency)
很多人相信，引用透明是使用纯函数最大的好处。
>所谓引用透明，是指如果一段代码可以替换成它所执行的结果，而且是在不改变整个程序行为的前提下进行的，那么这段代码就是引用透明的。

正因为纯函数能根据相同的输入返回相同的结果，这就保证了引用透明性。我们还是来看一段例子。

```javascript
var count = 0;

function rq(x) {
	count ++;
	return x + count;
}

function rt(x) {
	return x + 1;
}
```

对于非纯函数```rq```来说，不存在引用透明。实际上，由于```rq```改变了```count```，反过来```count```又影响了```rq```的结果，因此，当```x == y```的时候，```rq(x)```并不等于```rq(y)```，这就导致了引用不透明(Referential Opaque)。比如
```javascript
var p = rq(x) + rq(y) * (rq(x) - rq(x));
```
如果尝试做如下化简，就会出错

```javascript
var p = rq(x) + rq(y) * (0); // 第一步化简，实际上已经出错了

var p = rq(x) + 0; // 第二步化简

var p = rq(x);  // 最后的化简结果，可惜是个错误的结果
```
相反，```rt```是纯函数，满足引用透明，如果把下面的表达式

```javascript
var p = rt(x) + rt(y) * (rt(x) - rt(x));
```

化简为
```javascript
var p = rt(x);
```
是完全没有问题的。

### 代码并行(Parallel Code)
最为决定性的一点是，我们可以任意并行地运行纯函数。因为纯函数无需访问任何共享的内存，不会因为副作用而进入竞争状态(Race Condition)，这为我们的高并发设计提供了可行性。


