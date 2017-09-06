---
layout: post
title: 伯恩斯坦多项式
date: 2017-09-06
categories: math
tag: [bernstein, polynomial]
mathjax: true
---
* content
{:toc}

我们在研究贝塞尔曲线的时候，首先遇到的就是伯恩斯坦(Bernstein)多项式，为此，有必要专门开出一篇文章来探讨伯恩斯坦多项式的性质。

从定义出发，伯恩斯坦多项式的第n阶项有如下形式：

$$
b_{i,n}(t) = \binom{n}{i}\cdot t^{i} \cdot (1-t)^{(n-i)}, \quad t\in[0, 1]
$$

其中$$i=0, 1, ..., n$$, 而
 
$$
\binom{n}{i} = \frac{n!}{i!(n-i)!}
$$

是二项式系数。伯恩斯坦n阶多项式可以形成一组n阶指数多项式的基底。一般伯恩斯坦多项式可以表示为：

$$
B_n(t) = \sum_{i=0}^{n}\beta_i \cdot b_{i, n}(t)
$$

其中，$$\beta_i$$叫做伯恩斯坦系数。大家看到这个形式可能一下子就联想到贝塞尔曲线了。是的，这就是贝塞尔曲线的函数形式。
不过，贝塞尔曲线我们会在下一篇文章中去详细论述，本篇只探讨伯恩斯坦多项式的特性。



## 性质

伯恩斯坦多项式满足如下性质：

### 对称性

$$
b_{i,n}(t) = b_{n-i,n}(1-t)
$$

### 正性

$$
b_{i,n}(t) \geqslant 0
$$

### 归一化

$$
\sum_{i=0}^{n}b_{i, n}(t) = 1
$$

## 多项式前几阶结果

### 零阶

$$
\begin{align}
b_{0,0}(t) &= 1
\end{align}
$$

{:.imgcap}
![](/assets/img/2017/09/06/bernstein0.svg)

### 一阶

$$
\begin{align}
b_{0,1}(t) &= 1-t\\
b_{1,1}(t) &= t\\
\end{align}
$$

{:.imgcap}
![](/assets/img/2017/09/06/bernstein1.svg)

### 二阶

$$
\begin{align}
b_{0,2}(t) &= (1-t)^2\\
b_{1,2}(t) &= 2(1-t)t\\
b_{2,2}(t) &= t^2\\
\end{align}
$$

{:.imgcap}
![](/assets/img/2017/09/06/bernstein2.svg)

### 三阶

$$
\begin{align}
b_{0,3}(t) &= (1-t)^3\\
b_{1,3}(t) &= 3(1-t)^2t\\
b_{2,3}(t) &= 3(1-t)t^2\\
b_{3,3}(t) &= t^3\\
\end{align}
$$

{:.imgcap}
![](/assets/img/2017/09/06/bernstein3.svg)

### 四阶

$$
\begin{align}
b_{0, 4}(t) &= (1-t)^4\\
b_{1, 4}(t) &= 4(1-t)^3t\\
b_{2, 4}(t) &= 6(1-t)^2t^2\\
b_{3, 4}(t) &= 4(1-t)t^3\\
b_{4, 4}(t) &= t^4\\
\end{align}
$$

{:.imgcap}
![](/assets/img/2017/09/06/bernstein4.svg)

### 五阶

$$
\begin{align}
b_{0, 5}(t) &= (1-t)^5\\
b_{1, 5}(t) &= 5(1-t)^4t\\
b_{2, 5}(t) &= 10(1-t)^3t^2\\
b_{3, 5}(t) &= 10(1-t)^2t^3\\
b_{4, 5}(t) &= 5(1-t)t^4\\
b_{5, 5}(t) &= t^5\\
\end{align}
$$

{:.imgcap}
![](/assets/img/2017/09/06/bernstein5.svg)

## 参考

- [Wolfram](http://mathworld.wolfram.com/BernsteinPolynomial.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Bernstein_polynomial)
