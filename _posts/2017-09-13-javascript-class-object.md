---
layout: post
title: JavaScript面向对象编程范式总结
date: 2017-09-13
categories: javascript
tag: [class, object, oo, inheritance, factory, constructor]
---

* content
{:toc}

很多脚本语言并不原生支持面向对象范式编程，但其内部机制又提供了必要的手段，可以让我们很方便地模拟面向对象范式编程。ECMAScript 6之前，JavaScript也是这样的状况。那么当时的JavaScript提供了哪些手段来定义类和实例化对象呢？JavaScript提供的手段非常丰富，包括把函数当成了一种引用类型（定义指针和引用），```prototype```关键字（定义类），```new```和```this```关键字（定义实例化），以及```call()```和```apply()```方法（定义继承）。手段很多，用来定义类的方式也很多。

到了ECMAScript 6，这种状况得到了改善。JavaScript引入了Class（类）的概念。不过，Class只能算是一种语法糖，其能实现的功能，之前的版本也都能实现。而面向对象一些本该有的特质，如访问保护，没有的依然没有。不过新的方式方法可以让面向对象的原型写法更加自然、清晰，更加符合面向对象的范式。

本文对几种常用的定义类和实例化对象的方式方法进行总结。



## ECMAScript 6之前的方式
### 类的定义

#### 工厂范式

```javascript
function showColor() {
    alert(this.color);
}

function createCar(color, doors, mpg) {
    var o = new Object;
    o.color = color;
    o.doors = doors;
    o.mpg = mpg;
    o.showColor = showColor;
    return o;
}

var oCar1 = createCar("red", 4, 23);
var oCar2 = createCar("blue", 3, 25);
```

#### 构造函数范式

```javascript
function showColor() {
    alert(this.color);
}

function Car(color, doors, mpg) {
    this.color = color;
    this.doors = doors;
    this.mpg = mpg;
    this.showColor = showColor;
}

var oCar1 = new Car("red", 4, 23);
var oCar2 = new Car("blue", 3, 25);
```

#### 模板范式

```javascript
function Car(color, doors, mpg) {
    this.color = color;
    this.doors = doors;
    this.mpg = mpg;
}

Car.prototype.showColor = function() {
    alert(this.color);
};

var oCar1 = new Car("red", 4, 23);
var oCar2 = new Car("blue", 3, 25);
```

或者如果想把```showColor```函数封装到Car内部，可以用下面的方式。
```javascript
function Car(color, doors, mpg) {
    this.color = color;
    this.doors = doors;
    this.mpg = mpg;
	
    if (typeof Car._initialized == "undefined") {
        Car.prototype.showColor = function() {
            alert(this.color);
        };
        Car._initialized = true;
    }
}

var oCar1 = new Car("red", 4, 23);
var oCar2 = new Car("blue", 3, 25);
```

### 继承

#### 类伪装

```javascript
function ClassA(color) {
    this.color = color;
}

ClassA.prototype.sayColor = function() {
    alert(this.color);
}

function ClassB(color, name) {
    this.newMethod = ClassA;
    this.newMethod(color);
    delete this.newMethod;
	
    this.name = name;
}

ClassB.prototype = new ClassA()

ClassB.prototype.sayName = function() {
    alert(this.name);
}
```

#### call方法

```javascript
function ClassA(color) {
    this.color = color;
}

ClassA.prototype.sayColor = function() {
    alert(this.color);
}

function ClassB(color, name) {

    ClassA.call(this, color);

    this.name = name;
}

ClassB.prototype = new ClassA()

ClassB.prototype.sayName = function() {
    alert(this.name);
}
```

#### apply方法

```javascript
function ClassA(color) {
    this.color = color;
}

ClassA.prototype.sayColor = function() {
    alert(this.color);
}

function ClassB(color, name) {

	// ClassA.apply(this, new Array(color));

    ClassA.apply(this, arguments);

    this.name = name;
}

ClassB.prototype = new ClassA()

ClassB.prototype.sayName = function() {
    alert(this.name);
}
```

## ECMAScript 6的方式

### 类的定义

```javascript
class Car {
    constructor(color, doors, mpg) {
        this.color = color;
        this.doors = doors;
        this.mpg = mpg;
    }

    showColor() {
        alert(this.color);
    }
}

var oCar1 = new Car("red", 4, 23);
var oCar2 = new Car("blue", 3, 25);
```

甚至还可以定义静态方法，只需要在方法名面前加上```static```关键字即可。

```javascript
class Car {
    constructor(color, doors, mpg) {
        this.color = color;
        this.doors = doors;
        this.mpg = mpg;
    }

    showColor() {
        alert(this.color);
    }
	
    static sayCar() {
        alert("hello, car!")
    }	
}

var oCar1 = new Car("red", 4, 23);
var oCar2 = new Car("blue", 3, 25);
// 调用静态方法
Car.sayCar() // 'hello, car!'
```
需要注意的是，静态方法如果包含```this```，那么这个```this```指的是类，而不是实例。

### 继承

```javascript
class ClassA {
    constructor(color) {
        this.color = color;
    }

    sayColor() {
        alert(this.color);
    }
}

class ClassB extends ClassA {
    constructor(color, name) {
        super(color);
        this.name = name;
    }

    sayName() {
        alert(this.name);
    }
}
```
