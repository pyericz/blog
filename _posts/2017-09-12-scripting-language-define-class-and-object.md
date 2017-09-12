---
layout: post
title: 几种脚本语言定义类和实例化对象的方式总结
date: 2017-09-12
categories: language
tag: [lua, javascript, swift, python]
---
* content
{:toc}

在面向对象编程范式中，脚本语言对类和对象的定义和使用和静态语言有着很大的区别。
本文试图通过总结对比几种脚本语言定义类和实例化对象的方式，领悟各脚本在面向对象中的设计意图。



## Lua


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

总结：不支持访问保护

## JavaScript

### Factory Paradigm

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

### Constructor Paradigm

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

### Prototype Paradigm

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

继承

```javascript
function ClassA(color) {
    this.color = color;
}

ClassA.prototype.sayColor = function() {
    alert(this.color);
}

function ClassB(color, name) {
    // this.newMethod = ClassA;
    // this.newMethod(color);
    // delete this.newMethod;

    // ClassA.apply(this, arguments)

    ClassA.call(this, color);

    this.name = name;
}

ClassB.prototype.sayName = function() {
    alert(this.name);
}
```

总结：不支持访问保护

## Swift

## Python

