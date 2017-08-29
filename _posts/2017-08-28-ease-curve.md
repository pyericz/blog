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

缓动曲线在UI动画中的应用十分广泛。缓动曲线可以用来控制动画的运动速率，使其按照我们的意愿模拟真实物体的运动规律。
举个例子，当我们往上抛出一个石块时，在不考虑空气阻力的情况下，石块会在重力的作用下，先匀减速上升，直至速度为零。
而后，石块的速度又会从零开始匀加速下降。那么，如何模拟这样的运动过程呢？在高中物理课上，我们已经知道，石块的位移和时间之间满足平方关系：

$$
h(t) = v_0t - \frac{1}{2}gt^2 + h_0
$$

其中，$$h(t)$$是石块在$$t$$时刻的高度，$$v_0$$是石块的初速度，$$g$$是重力加速度，$$h_0$$是石块的初始高度。
从这个式子可以看出，我们需要一条二次方的运动曲线（抛物线）来模拟这样的运动过程。而类似这样的一条曲线，就是本文要讨论的缓动曲线。


总的来说，缓动曲线包含四大类，分别是线性（linear）、慢入（ease in）、慢出（ease out）和慢入慢出（ease in and out）。
除了线性类，其余三大类又可以细分出各种子类，比如二次方缓动曲线（Quadratic）就是其中的一个子类。
以上文提到的石块为例，石块的运动曲线满足二次方缓动曲线，而上升过程满足慢出的过程（速度先快后慢），下降过程则满足慢入过程（速度先慢后快）。
本文将对线性类和缓动类的10种子类共11种类别31种组合情况进行公式化整理，并绘制相应的缓动曲线图，供大家查阅。这11种类别分别为：

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

## Linear

$$
y = x, \quad x\in[0, 1]
$$


{:.imgcap}
![](/assets/img/2017/08/28/linear.svg)

## Sinusoidal
### easeInSine

$$
y = 1-\cos(\frac{\pi}{2}\cdot x), \quad x\in[0, 1]
$$

{:.imgcap}
![](/assets/img/2017/08/28/easeInSine.svg)

### easeOutSine

$$
y(x) = \sin(\frac{\pi}{2}\cdot x), \quad  x\in[0, 1]
$$

{:.imgcap}
![](/assets/img/2017/08/28/easeOutSine.svg)

### easeInOutSine

$$
y(x) =
\begin{cases}
\frac{1}{2}\cdot[1-\cos(\pi\cdot x)] & ,x \in [0, \frac{1}{2}] \\
\\
\frac{1}{2}\cdot\{\sin[\pi\cdot(x-\frac{1}{2})]+1\} & ,x\in(\frac{1}{2}, 1]
\end{cases}
$$


{:.imgcap}
![](/assets/img/2017/08/28/easeInOutSine.svg)


## Quadratic
### easeInQuad
### easeOutQuad
### easeInOutQuad

## Cubic
### easeInCubic
### easeOutCubic
### easeInOutCubic

## Quartic
### easeInQuart
### easeOutQuart
### easeInOutQuart

## Quintic
### easeInQuint
### easeOutQuint
### easeInOutQuint

## Exponential
### easeInExpo
### easeOutExpo
### easeInOutExpo

## Circular
### easeInCirc
### easeOutCirc
### easeInOutCirc

## Back
### easeInBack
### easeOutBack
### easeInOutBack

## Elastic
### easeInElastic
### easeOutElastic
### easeInOutElastic

## Bounce
### easeInBounce
### easeOutBounce
### easeInOutBounce
