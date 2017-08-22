---
layout: post
title: 旋转矩阵
categories: math
tag: [matrix, rotation, complex]
mathjax: true
author: 张培养
---
* content
{:toc}

旋转矩阵有着广泛的用途。本文试图用复数的概念和几何的概念推导出旋转矩阵。



## 复数推导方式

复数可以看做是在复平面的二维矢量，表示为<br>

$$
z = x + iy
$$

其中，实部$$x$$代表横坐标，虚部$$y$$代表纵坐标。因此，$$P$$在复平面旋转$$\theta$$角度，得到$$P'$$的过程，可以表示为： 

$$
P' = P \cdot e^{i\theta} 
$$

利用欧拉公式，展开可得<br>

$$
\begin{align}
x'+i\cdot y' &= (x+i \cdot y) \cdot (\cos\theta + i\cdot \sin\theta) \\
&= (x \cos\theta-y\sin\theta)+i(x\sin\theta+y\cos\theta)
\end{align}
$$

从而得到<br>

$$
\begin{align}
x'&=(x \cos\theta-y\sin\theta)\\
y'&=(x\sin\theta+y\cos\theta)
\end{align}
$$

用矩阵的形式表示，可得到如下结果<br>

$$\begin{bmatrix}x'\\ y' \end{bmatrix}=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}\begin{bmatrix}x \\ y\end{bmatrix}$$

从而得到旋转矩阵<br>

$$\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$$

## 几何推导方式

点$$P$$的坐标$$(x, y)$$可以表示为：<br>

$$
\begin{align}
x &= r \cdot \cos\alpha\\
y &= r \cdot \sin\alpha \\
\end{align}
$$

旋转$$\theta$$角后，得到点$$P'$$，坐标$$(x', y')$$，表示为：<br>

$$
\begin{align}
x' &= r \cdot \cos(\alpha+\theta) \\
y' &= r \cdot \sin(\alpha+\theta)
\end{align}
$$

展开，得到：

$$
\begin{align}
x' &= r \cdot \cos(\alpha+\theta) \\
&= r \cdot \cos\alpha\cos\theta-r\cdot\sin\alpha\sin\theta\\
&= x\cos\theta - y\sin\theta\\
y' &= r \cdot \sin(\alpha+\theta)\\
&= r\cdot\sin\alpha\cos\theta+r\cdot\cos\alpha\sin\theta\\
&= y\cos\theta + x\sin\theta
\end{align}
$$


用矩阵的形式表示，可得到如下结果<br>

$$\begin{bmatrix}x'\\ y' \end{bmatrix}=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}\begin{bmatrix}x \\ y\end{bmatrix}$$

从而得到旋转矩阵<br>

$$\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$$
