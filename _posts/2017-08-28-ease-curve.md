---
layout: post
title: 缓动曲线
date: 2017-08-28
categories: math
tag: [ease, curve]
mathjax: true
---

* content
{:toc}

缓动曲线在UI动画中的应用十分广泛。缓动曲线可以用来控制动画的运动速率，使其按照我们的意愿模拟真实物体的运动规律。举个例子，当我们往上抛出一个石块时，在不考虑空气阻力的情况下，石块会在重力的作用下，先匀减速上升，直至速度为零。而后，石块的速度又会从零开始匀加速下降。那么，如何模拟这样的运动过程呢？在高中物理课上，我们已经知道，石块的位移和时间之间满足平方关系：

<div style="font-size: 13px;">
$$
h(t) = v_0t - \frac{1}{2}gt^2 + h_0
$$
</div>

其中，$$h(t)$$是石块在$$t$$时刻的高度，$$v_0$$是石块的初速度，$$g$$是重力加速度，$$h_0$$是石块的初始高度。从这个式子可以看出，我们需要一条二次方的运动曲线（抛物线）来模拟这样的运动过程。而类似这样的一条曲线，就是本文要讨论的缓动曲线。


总的来说，缓动曲线包含四大类，分别是线性（linear）、缓入（ease in）、缓出（ease out）和缓入缓出（ease in and out）。除了线性类，其余三大类又可以细分出各种子类，比如二次方缓动曲线（Quadratic）就是其中的一个子类。以上文提到的石块为例，石块的运动曲线满足二次方缓动曲线，而上升过程满足缓出的过程（速度先快后慢），下降过程则满足缓入过程（速度先慢后快）。本文将对线性类和缓动类的10种子类共11种类别31种组合情况进行公式化整理，并绘制相应的缓动曲线图，供大家查阅。这11种类别分别为：

- Linear
- Sinusoidal
- Quadratic
- Cubic
- Quartic
- Quintic
- Exponential
- Circular
- Back
- Elastic
- Bounce


## 缓动曲线的关系

### 曲线关系

缓动曲线的**定义域**是$$[0, 1]$$，而其**值域**满足前提

<div style="font-size: 13px;">
$$
\begin{align}
f(0) &= 0, \\
f(1) &= 1
\end{align}
$$
</div>

从这个前提出发，我们将会看到，不论是直线，还是缓动曲线，都会遵循相同的计算方式。

假设以函数$$f_b(x)$$作为基础函数（一般可作为缓入函数），若缓入函数表示为

<div style="font-size: 13px;">
$$f(x) = f_b(x)$$
</div>

那么我们将会看到，所有的缓出曲线必然可以表示为

<div style="font-size: 13px;">
$$
g(x) = 1 - f_b(1-x)
$$
</div>

而缓入缓出曲线可以用分段函数表示

<div style="font-size: 13px;">
$$
h(x) =
\begin{cases}
0.5\cdot f_b(2\cdot x) & ,x \in [0, 0.5] \\
\\
0.5\cdot[2-f_b(2\cdot(1-x))] & ,x\in(0.5, 1]
\end{cases}
$$
</div>

### 举例
#### 平方曲线
对于平方曲线，我们定义基础函数为

<div style="font-size: 13px;">
$$
f_b(x) = x^2,\quad x\in[0, 1]
$$
</div>

则缓入函数表示为

<div style="font-size: 13px;">
$$
f(x) = f_b(x) = x^2,\quad x\in[0, 1]
$$
</div>

缓出函数可以表示为

<div style="font-size: 13px;">
$$
g(x) = 1 - f_b(1-x) = 1-(1-x)^2,\quad x\in[0, 1]
$$
</div>

而缓入缓出曲线可以用分段函数表示

<div style="font-size: 13px;">
$$
\begin{align}
h(x) &=
\begin{cases}
0.5\cdot f_b(2\cdot x) & ,x \in [0, 0.5] \\
\\
0.5\cdot[2-f_b(2\cdot(1-x))] & ,x\in(0.5, 1]
\end{cases}\\
\\
&= 
\begin{cases}
0.5\cdot(2x)^2 & ,x \in [0, 0.5] \\
\\
0.5\cdot(2-[2(1-x)]^2) & ,x\in(0.5, 1]
\end{cases}\\
\\
&= 
\begin{cases}
2x^2 & ,x \in [0, 0.5] \\
\\
1-2(1-x)^2 & ,x\in(0.5, 1]
\end{cases}
\end{align}
$$
</div>

#### 直线
对于直线来说，上述的缓动曲线关系依然成立。令基础函数为

<div style="font-size: 13px;">
$$
f_b(x) = x,\quad x\in[0, 1]
$$
</div>

则缓入函数：

<div style="font-size: 13px;">
$$
f(x) = f_b(x) = x,\quad x\in[0, 1]
$$
</div>

缓出函数：

<div style="font-size: 13px;">
$$
g(x) = 1 - f_b(1-x) = 1 - (1 - x) = x,\quad x\in[0, 1]
$$
</div>

缓入缓出函数：

<div style="font-size: 13px;">
$$
\begin{align}
h(x) &=
\begin{cases}
0.5\cdot f_b(2\cdot x) & ,x \in [0, 0.5] \\
\\
0.5\cdot[2-f_b(2\cdot(1-x))] & ,x\in(0.5, 1]
\end{cases}\\
\\
&= 
\begin{cases}
0.5\cdot (2\cdot x) & ,x \in [0, 0.5] \\
\\
0.5\cdot[2-(2\cdot(1-x))] & ,x\in(0.5, 1]
\end{cases}\\
\\
&= 
\begin{cases}
x & ,x \in [0, 0.5] \\
\\
x & ,x\in(0.5, 1]
\end{cases}\\
\\
&=x,\quad x\in[0, 1]
\end{align}
$$
</div>

可见，三种函数都是一样的。这个结果是很容易理解的：既然是直线，那么就没有缓入或缓出的过程，即整个过程都是同样的速率，其导数必然为常数。在这里这个求导的常数就是1，对应的结果就是

<div style="font-size: 13px;">
$$
f(x) = g(x) = h(x) = x,\quad x\in[0, 1]
$$
</div>

## 缓动曲线公式和曲线图
### Linear

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = x, \quad x\in[0, 1]
$$
</div>

公式

<div style="font-size: 13px;">
$$
y(x) = x, \quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/linear.svg)


### Sinusoidal

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = 1-\cos(\frac{\pi}{2}\cdot x), \quad x\in[0, 1]
$$
</div>

#### easeInSine

公式

<div style="font-size: 13px;">
$$
y(x) = 1-\cos(\frac{\pi}{2}\cdot x), \quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInSine.svg)

#### easeOutSine

公式

<div style="font-size: 13px;">
$$
y(x) = \sin(\frac{\pi}{2}\cdot x), \quad  x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeOutSine.svg)

#### easeInOutSine

公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
0.5[1-\cos(\pi\cdot x)] & ,x \in [0, 0.5] \\
\\
0.5\{\sin[\pi\cdot(x-0.5)]+1\} & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutSine.svg)

### Quadratic

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = x^2,\quad x\in[0, 1]
$$
</div>

#### easeInQuad

公式

<div style="font-size: 13px;">
$$
y(x) = x^2,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInQuad.svg)

#### easeOutQuad

公式

<div style="font-size: 13px;">
$$
y(x) = 1-(1-x)^2,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeOutQuad.svg)

#### easeInOutQuad

公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
2x^2 & ,x \in [0, 0.5] \\
\\
1-2(1-x)^2 & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutQuad.svg)

### Cubic

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = x^3,\quad x\in[0, 1]
$$
</div>

#### easeInCubic

公式

<div style="font-size: 13px;">
$$
y(x) = x^3,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInCubic.svg)

#### easeOutCubic


公式

<div style="font-size: 13px;">
$$
y(x) = 1-(1-x)^3,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeOutCubic.svg)

#### easeInOutCubic


公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
4x^3 & ,x \in [0, 0.5] \\
\\
1-4(1-x)^3 & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutCubic.svg)

### Quartic

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = x^4,\quad x\in[0, 1]
$$
</div>

#### easeInQuart

公式

<div style="font-size: 13px;">
$$
y(x) = x^4,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInQuart.svg)

#### easeOutQuart


公式

<div style="font-size: 13px;">
$$
y(x) = 1-(1-x)^4,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeOutQuart.svg)

#### easeInOutQuart


公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
8x^4 & ,x \in [0, 0.5] \\
\\
1-8(1-x)^4 & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutQuart.svg)

### Quintic

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = x^5,\quad x\in[0, 1]
$$
</div>

#### easeInQuint

公式

<div style="font-size: 13px;">
$$
y(x) = x^5,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInQuint.svg)

#### easeOutQuint


公式

<div style="font-size: 13px;">
$$
y(x) = 1-(1-x)^5,\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeOutQuint.svg)

#### easeInOutQuint


公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
16x^5 & ,x \in [0, 0.5] \\
\\
1-16(1-x)^5 & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutQuint.svg)

### Exponential

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = 2^{10\cdot(x - 1)},\quad x\in[0, 1]
$$
</div>

#### easeInExpo

公式

<div style="font-size: 13px;">
$$
y(x) = 2^{10\cdot(x - 1)},\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInExpo.svg)

#### easeOutExpo


公式

<div style="font-size: 13px;">
$$
y(x) = 1 - 2^{-10x},\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeOutExpo.svg)

#### easeInOutExpo


公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
2^{10\cdot(2 x - 1) - 1} & ,x \in [0, 0.5] \\
\\
1 - 2^{-10\cdot(2 x - 1) - 1} & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutExpo.svg)

### Circular

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = 1 - \sqrt{1 - x^2},\quad x\in[0, 1]
$$
</div>

#### easeInCirc

公式

<div style="font-size: 13px;">
$$
y(x) = 1 - \sqrt{1 - x^2},\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInCirc.svg)

#### easeOutCirc


公式

<div style="font-size: 13px;">
$$
y(x) = \sqrt{1 - (1 - x)^2},\quad x\in[0, 1]
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeOutCirc.svg)

#### easeInOutCirc


公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
0.5\cdot(1 - \sqrt{1 - 4 x^2}) & ,x \in [0, 0.5] \\
\\
0.5\cdot(1 + \sqrt{1 - 4\cdot(1 - x)^2}) & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutCirc.svg)

------------------------------------------------------------------
接下来的Back和Elastic缓动曲线，需要更多的参数辅助控制曲线的形态。

### Back


基础函数

<div style="font-size: 13px;">
$$
f_b(x) = x^2\cdot[(1 + n)\cdot x - n],\quad x\in[0, 1]
$$
</div>

#### easeInBack

公式

<div style="font-size: 13px;">
$$
y(x) = x^2\cdot[(1 + n)\cdot x - n],\quad x\in[0, 1]
$$
</div>

曲线图

(n = 1.5)

{:.imgcap}
![](/assets/img/2017/08/28/easeInBack1.5.svg)

(n = 2.5)

{:.imgcap}
![](/assets/img/2017/08/28/easeInBack2.5.svg)

#### easeOutBack


公式

<div style="font-size: 13px;">
$$
y(x) = 1 - (1 - x)^2\cdot[(1 + n)\cdot(1 - x) - n],\quad x\in[0, 1]
$$
</div>

曲线图

(n = 1.5)

{:.imgcap}
![](/assets/img/2017/08/28/easeOutBack1.5.svg)

(n = 2.5)

{:.imgcap}
![](/assets/img/2017/08/28/easeOutBack2.5.svg)

#### easeInOutBack


公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
2x^2\cdot[(1 + n)\cdot 2 x - n] & ,x \in [0, 0.5] \\
\\
1 - 2 (1 - x)^2\cdot[(1 + n)\cdot 2 (1 - x) - n] & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

(n = 1.5)

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutBack1.5.svg)

(n = 2.5)

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutBack2.5.svg)

### Elastic

基础函数

<div style="font-size: 13px;">
$$
f_b(x) = 2^{10(x - 1)}\cdot\sin{[(2 n + \frac{1}{2})\pi\cdot x]},\quad x\in[0, 1]
$$
</div>

#### easeInElastic

公式

<div style="font-size: 13px;">
$$
y(x) = 2^{10(x - 1)}\cdot\sin{[(2 n + \frac{1}{2})\pi\cdot x]},\quad x\in[0, 1]
$$
</div>

曲线图

(n = 3)

{:.imgcap}
![](/assets/img/2017/08/28/easeInElastic3.svg)

(n = 5)

{:.imgcap}
![](/assets/img/2017/08/28/easeInElastic5.svg)

(n = 7)

{:.imgcap}
![](/assets/img/2017/08/28/easeInElastic7.svg)

#### easeOutElastic


公式

<div style="font-size: 13px;">
$$
y(x) = 1 - 2^{10 (-x)}\cdot\sin{[(2 n + \frac{1}{2})\pi\cdot (1 - x)]},\quad x\in[0, 1]
$$
</div>

曲线图

(n = 3)

{:.imgcap}
![](/assets/img/2017/08/28/easeOutElastic3.svg)

(n = 5)

{:.imgcap}
![](/assets/img/2017/08/28/easeOutElastic5.svg)

(n = 7)

{:.imgcap}
![](/assets/img/2017/08/28/easeOutElastic7.svg)

#### easeInOutElastic


公式

<div style="font-size: 13px;">
$$
y(x) =
\begin{cases}
0.5\cdot 2^{10\cdot(2 x - 1)}\cdot\sin{[(2 n + \frac{1}{2})\pi\cdot(2x)]} & ,x \in [0, 0.5] \\
\\
0.5\cdot\{2-2^{10\cdot[2 (1 - x) - 1]}\cdot\sin{[(2 n + \frac{1}{2})\pi\cdot 2(1 - x)]}\} & ,x\in(0.5, 1]
\end{cases}
$$
</div>

曲线图

(n = 3)

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutElastic3.svg)

(n = 5)

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutElastic5.svg)

(n = 7)

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutElastic7.svg)

------------------------------------------------------------------

### Bounce
要处理Bounce曲线，我们需要更多的技巧。首先Bounce曲线处处连续，但并非处处可导，不可导的点处在bounce的各个转折点。要构造这样的一个函数，我们就需要一定的技巧。在前面的例子中，基础函数都可以用一个直观的函数表达式来表示。在Back和Elastic曲线中，我们需要引入更多的参数来控制曲线的形态。而在Bounce曲线中，我们也需要两个参数来控制曲线的形态。所不同的是，这两个参数是需要根据自变量的值动态调整的。因此我们需要一个广义的函数。可以借助C语言来定义这个基础函数
```c
float bounce(float progress)
{
    for(float a=0, b=1; 1; a+=b,b/=2.0f) {
        if (progress >= (7 - 4.0f * a) / 11.0f) {
            return -powf((11-6*a-11*progress)/4, 2) + powf(b, 2);
        }
    }
}
```

进一步，我们需要定义easeIn, easeOut和easeInOut函数。这三个函数通过接收基础函数和给定的自变量值来获取函数值。我们可以通过函数指针来实现

```c
typedef float (*curve)(float);
```

有了函数指针，我们的缓动函数就可以声明如下：

```c
float easeIn(curve cv, float x);
float easeOut(curve cv, float x);
float easeInOut(curve cv, float x);
```

使用的时候，把bounce函数传入对应的缓动函数中即可。

#### easeInBounce

函数：
```c
float easeIn(curve cv, float x)
{
    return cv(x);
}
```

曲线图：

{:.imgcap}
![](/assets/img/2017/08/28/easeInBounce.svg)

#### easeOutBounce
函数：
```c
float easeOut(curve cv, float x)
{
    return 1-cv(1-x);
}
```

曲线图：

{:.imgcap}
![](/assets/img/2017/08/28/easeOutBounce.svg)

#### easeInOutBounce
函数：
```c
float easeInOut(curve cv, float x)
{
    if (x <= 0.5f)
        return 0.5f * cv(2.0f * x);
    else
        return (2.0f - cv(2.0f * (1.0f - x))) / 2.0f;
}
```

曲线图：

{:.imgcap}
![](/assets/img/2017/08/28/easeInOutBounce.svg)

## 外部链接

- [GitHub源码](https://github.com/pyericz/EaseCurve)

- [Easing Function](http://easings.net)
