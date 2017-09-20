---
layout: post
title: 尾调用优化
date: 2017-09-17
categories: lua
tag: [lua, python, tco, optimize]
---
* content
{:toc}

**尾调用**(**Tail Call**)是函数式编程非常重要的概念。所谓尾调用，是指函数的最后一步操作是函数调用。以Lua语言为例，在这个函数定义中

```lua
function foo()
	return bar()
end
```

```foo()``` 函数的最后一步操作是返回一次对```bar()```函数的调用，我们把这样的函数调用称作尾调用。

需要注意的是，以下一些情况并不属于尾调用：

```lua
-- case 1
function foo()
	local ret = bar()
	return ret
end

-- case 2
function foo()
	return bar() + 1
end

-- case 3
function foo()
	bar()
end
```
第一种情况在执行了函数调用之后，又进行了赋值操作，然后才是返回结果，这显然不是尾调用。第二种情况在执行了函数调用之后，又进行了一次加法操作后才返回计算结果，因此也不属于尾调用。而第三种情况，虽然表面上看起来像是最后一步做了函数调用，但实际上Lua语言在每个函数的结尾都默认执行了一次空返回的操作（如果没有返回值的话）。第三种情况相当于

```lua
function foo()
	bar()
	return nil
end
```
因此这第三种情况也不属于尾调用。使用的时候一定要注意这些情况。

当尾调用的函数是函数自身(self-called)时，我们就把这样的尾调用称作**尾递归**(**Tail Recursion**)。

那么，尾调用有什么意义呢？我们先来对比下面两个函数的执行结果

```lua
function foo()
	foo()
end
```

```lua
function bar()
	return bar()
end
```
前者很快就报```stack overflow```的错误，而后者始终不会结束执行。这是什么原因呢？这里就涉及到我们本篇要讨论的主题——**尾调用优化**(**Tail Call Optimization**, **TCO**)。



## 尾调用优化

我们知道，当函数被调用的时候，内存中会形成所谓的**调用帧**(**call frame**)，用于保存函数调用的位置以及函数内部声明的一些变量信息等。只有当函数执行结束后，将其结果返回到函数调用的位置，对应的调用帧才会被删除，释放内存空间。比如，函数```foo```内部调用了函数```bar```，那么```foo```所在的调用帧上又会形成一个```bar```的调用帧。等```bar```执行结束之后，才会返回到```foo```调用```bar```的位置，并删掉```bar```的调用帧。假设```bar```又调用了函数```foobar```，则又会在```bar```上形成```foobar```的调用帧。依次类推，就会形成所谓的**调用栈**(**call stack**)。

对于上面```foo```的无限递归例子，因为函数调用始终没结束，不会删除调用帧，而每一次函数调用又会新增一个调用帧，从而导致调用栈越变越大，最终造成栈溢出。

那么既然```bar```函数也进行了无限递归操作，为什么就不会造成栈溢出呢？我们先来看看尾调用的特殊之处。在执行尾调用的时候，由于尾调用是最后一步操作，在这一步操作之后，当前调用帧就没有继续存在下去的必要了（调用位置、内部变量等等都不会再用到了），因此理论上可以不保留当前调用帧，直接跳到尾调用函数的调用帧去。这样，理论上我们可以只需要保留一个调用帧，从而不会因为无限递归而造成调用栈越变越大而造成栈溢出。而这就是我们所说的尾调用优化。

>**尾调用优化可以大大节省内存。**

前面我一直强调“理论上”，是因为尾调用优化并不是所有语言的特性。我们来看下面用Python语言写的一个尾调用函数
```py
def foo():
    return foo();

foo();
```
不幸的是，执行这段代码就会报如下错误：
```
RuntimeError: maximum recursion depth exceeded
```
可见Python语言就不支持尾调用优化。

## 尾调用优化案例

前面分析介绍了尾调用优化，下面结合一些具体的例子，分析如何对既有的代码做调整，以实现尾调用优化。

先来看一个阶乘的例子。传统的阶乘函数写法如下：
```lua
local function factorial(n)
	if n == 0 then
		return 1
	else 
		return n * factorial(n - 1)
	end
end
```
这显然不是一个尾调用。那么如何把这样的函数实现变成尾调用呢？上面的函数之所以不是尾调用，原因就在于调用结束后还进行了一次乘法操作；如果我们能把这次乘法操作封装到函数调用内部，不就可以实现尾调用了吗？因此我们有如下的改进方式：
```lua
local function factorial(n)
	local function doFactorial(n, result)
		if n == 0 then
			return result
		else
			return doFactorial(n - 1, result * n)
		end
	end
	return doFactorial(n, 1)
end
```
在这一改进中，我们不直接对```factorial```做递归调用，而是通过定义了```doFactorial```这个内部函数来负责封装乘```n```操作。这样```doFactorial```本身就实现了尾调用，而外层函数```factorial```又可以保持接口不变。

最后再来看一个Fibonacci数列的例子：
```lua
local function Fibonacci(n)
	if (n <= 1) then
		return 1
	end
	return Fibonacci(n - 1) + Fibonacci(n - 2)
end
```
在没有做尾调用优化的时候，该函数的执行时间会随着```n```的变大而明显变长，且会在```n```到达一定数值之后，报```stack overflow```的错误。做了尾调用优化之后，其运算效率大大增加。下面是尾调用优化后的代码
```lua
local function Fibonacci(n)
	local function doFibonacci(n, ret1, ret2)
		if (n <= 1) then
			return ret2
		end
		return doFibonacci(n - 1, ret2, ret1 + ret2)
	end
	return doFibonacci(n, 1, 1)
end
```
