---
layout: post
title: 用Lua语言实现一个任务队列
date: 2017-08-24
categories: lua
tag: [work, queue, async]
---
* content
{:toc}

在编程过程中，我们通常都会碰到一些需要依次执行的**异步操作**，比如依次执行的UI动画，或依次执行的网络请求，甚至还有混合依次执行的情况：比如先执行一个loading动画，然后发起一次网络请求，
请求成功后需要执行一段耗时的异步逻辑处理操作，完成后弹出banner显示操作成功。我们惊讶地发现，这里的每一次操作居然都是不同类型的操作！
如果只是简单地定义一系列回调函数，去处理下一个操作，会发现原本该有的简洁代码，如今充斥了一堆肮脏的代码调用；代码结构不再清晰，代码意图随之淹没其中。
更为痛苦的是，当业务需求发生变更时，原来定义好的操作顺序有可能要重新调整，这时再来看原有的代码结构，想死的心都有。

那么针对上面的问题是否有一套解决方案，可以让你的代码看起来更加有条理性呢？答案是肯定的。一个精心设计的任务队列，就能很好地梳理整串的操作流程。任务队列中的每个任务，都是一段干净的代码块；
各个操作的执行顺序，只需要调整任务的顺序就可以了。初次看起来这似乎很有前途。但读者可能要问了，这个任务队列能解决不同操作类型的任务吗？显然，这是我们希望做到的。
因此，有必要为每个任务定义一个协议，只要每个操作都能按照任务协议来设计自己的代码，理论上任何的操作都适用同一个任务队列。

本文将以Lua语言为例，实现一个通用的任务队列。



GitHub源码：[](https://github.com/pyericz/LuaWorkQueue)

### 定义Object
我们将采用面向对象的编程方法来展开讨论，虽然Lua本身不是面向对象语言，但可以利用元表方便地模拟面向对象过程。为此，我们可以先定义Object，通过定义extend方法，和new方法，模拟面向对象中的继承和实例化。
```lua
local Object = {}

function Object:construct()
end

function Object:extend()
    local class = {}
    setmetatable(class, self)
    self.__index = self
    return class
end

function Object:new()
    local obj = self:extend()
    obj:construct()
    return obj
end

return Object
```
后面的每一个类，都需要基于Object来扩展定义。

我们以object.lua保存这个文件。


### 定义任务协议

我们需要定义一个任务的基类。在这个基类中我们为每一个Work对象定义三个协议方法，分别是workBegin, work和workEnd，如下

```lua
local Object = require "object"
local Work = Object:extend{}

function Work:workBegin()
end

function Work:work(callback)
    error("work function not defined")
end

function Work:workEnd()
end

return Work
```

在这三个协议方法中，work方法是必须实现的，其余两个方法可选。可以看出，当work方法没有重新定义时，当该方法被队列调用时，系统就会报错。work方法需要传入一个回调方法callback用于通知外面该任务已经执行完毕，否则外界无法知道任务什么时候完成。

我们以work.lua保存这个文件。

### 实现一个双向队列

为了实现一个任务队列，我们还需要先实现一个双向队列。如下：

```lua
local Object = require "object"
local Deque = Object:extend{}

function Deque:construct()
    self.first = 0
    self.last = -1
    self.list = {}
end

function Deque:length()
    return self.last - self.first + 1
end

function Deque:pushLeft(value)
    local first = self.first - 1
    self.first = first
    self.list[first] = value
end

function Deque:pushRight(value)
    local last = self.last + 1
    self.last = last
    self.list[last] = value
end

function Deque:isEmpty()
    return self.first > self.last
end

function Deque:popLeft()
    assert(not self:isEmpty(), "Deque is empty")
    local list = self.list
    local first = self.first
    local value = list[first]
    list[first] = nil
    self.first = first + 1
    return value
end

function Deque:popRight()
    assert(not self:isEmpty(), "Deque is empty")
    local list = self.list
    local last = self.last
    local value = list[last]
    list[last] = nil
    self.last = last - 1
    return value
end

function Deque:getLeft()
    assert(not self:isEmpty(), "Deque is empty")
    return self.list[self.first]
end

function Deque:getRight()
    assert(not self:isEmpty(), "Deque is empty")
    return self.list[self.last]
end

return Deque
```
该双向队列实现了双向push和pop功能，用于添加任务和取出任务。

我们以deque.lua保存这个文件。

### 实现任务队列

有了双向队列和任务协议，接下来我们就可以很方便地实现一个双向任务队列。

```lua
local Object = require "object"
local Deque = require "deque"

local WorkQueue = Object:extend()
WorkQueue.FIFO = 1  -- first in first out
WorkQueue.LIFO = 2  -- last in first out

function WorkQueue:construct()
    self.workList = Deque:new()
    self.queueType = WorkQueue.FIFO
end

function WorkQueue:setCallback(callback)
    self.callback = callback
end

function WorkQueue:addWork(work)
    self.workList:pushRight(work)
end

function WorkQueue:setQueueType(queueType)
    if queueType == WorkQueue.FIFO or queueType == WorkQueue.LIFO then
        self.queueType = queueType
    end
end

function WorkQueue:getQueueType()
    return self.queueType
end

function WorkQueue:_startWork(workObj, finishCallback)
    local function callback()
        workObj:workEnd()
        if type(finishCallback) == "function" then
            finishCallback()
        end
    end
    workObj:workBegin()
    workObj:work(callback)
end

function WorkQueue:start()
    if self.workList:isEmpty() then
        if type(self.callback) == "function" then
            self.callback()
        end
        return
    end

    local work = nil
    if self:getQueueType() == WorkQueue.FIFO then
        work = self.workList:popLeft()
    else
        work = self.workList:popRight()
    end

    local function callback()
        self:start()
    end

    if work then
        self:_startWork(work, callback)
    else
        callback()
    end

end

return WorkQueue
```

值得注意的是，该任务队列既可以支持先进先出(FIFO)，也可以支持先进后出(LIFO)，可以通过setQueueType方法去设置。

```lua
function WorkQueue:setQueueType(queueType)
    if queueType == WorkQueue.FIFO or queueType == WorkQueue.LIFO then
        self.queueType = queueType
    end
end
```
我们以work_queue.lua保存这个文件。

### 测试
好了，接下来我们就要对实现的任务队列做个简单的测试了。在这段简单的测试代码中，虽然我们的work方法实际上是同步执行的，但不影响整套机制的原理。

```lua
local Object = require "object"
local Work = require "work"
local WorkQueue = require "work_queue"
local Deque = require "deque"

local test = Work:extend()

function test:setId(id)
    self.id = id
end

function test:getId()
    return self.id
end

function test:workBegin()
    print("work begin: ", self.id)
end

function test:workEnd()
    print("work end: ", self.id)
    print("=============================")
end

function test:work(callback)
    -- do the dirty work. As an example, the work is to print the test id
    print("working ... ", self.id)
    callback()
end

function main()
    local function finishCallback()
        print("all done")
    end
    local workQueue = WorkQueue:new()
    workQueue:setQueueType(WorkQueue.FIFO)
    workQueue:setCallback(finishCallback)
    for i=1, 10 do
        local work = test:new()
        work:setId(i)
        print("add work", work:getId())
        workQueue:addWork(work)
    end
    print("================ work queue start ================")
    workQueue:start()
end

main()
```
在这个测试例子中，我们分别创建了10个任务，每个任务分别配上一个id用于识别任务对象。同时，我们将WorkQueue的queueType设置为FIFO。代码的运行结果如下：
```
add work	1
add work	2
add work	3
add work	4
add work	5
add work	6
add work	7
add work	8
add work	9
add work	10
================ work queue start ================
work begin: 	1
working ... 	1
work end: 	1
=============================
work begin: 	2
working ... 	2
work end: 	2
=============================
work begin: 	3
working ... 	3
work end: 	3
=============================
work begin: 	4
working ... 	4
work end: 	4
=============================
work begin: 	5
working ... 	5
work end: 	5
=============================
work begin: 	6
working ... 	6
work end: 	6
=============================
work begin: 	7
working ... 	7
work end: 	7
=============================
work begin: 	8
working ... 	8
work end: 	8
=============================
work begin: 	9
working ... 	9
work end: 	9
=============================
work begin: 	10
working ... 	10
work end: 	10
=============================
all done
```
当把queueType改为LIFO，运行结果如下：
```
add work	1
add work	2
add work	3
add work	4
add work	5
add work	6
add work	7
add work	8
add work	9
add work	10
================ work queue start ================
work begin: 	10
working ... 	10
work end: 	10
=============================
work begin: 	9
working ... 	9
work end: 	9
=============================
work begin: 	8
working ... 	8
work end: 	8
=============================
work begin: 	7
working ... 	7
work end: 	7
=============================
work begin: 	6
working ... 	6
work end: 	6
=============================
work begin: 	5
working ... 	5
work end: 	5
=============================
work begin: 	4
working ... 	4
work end: 	4
=============================
work begin: 	3
working ... 	3
work end: 	3
=============================
work begin: 	2
working ... 	2
work end: 	2
=============================
work begin: 	1
working ... 	1
work end: 	1
=============================
all done
```
