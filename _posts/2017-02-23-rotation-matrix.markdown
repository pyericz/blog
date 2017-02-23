---
layout: post
title: 旋转矩阵
---

## 复数推导方式

在复平面中，复数$$P$$旋转$$\theta$$角，得到$$P'$$，这一过程可以表示为： 
\begin{equation}
P' = P \cdot e^{i\theta} 
\end{equation}
即<br>
\begin{equation}
\begin{split}
x'+i\cdot y' &= (x+i \cdot y) \cdot (\cos\theta + i\cdot \sin\theta) \\
&= (x \cos\theta-y\sin\theta)+i(x\sin\theta+y\cos\theta)
\end{split}
\end{equation}
即<br>

$$x'=(x \cos\theta-y\sin\theta)$$

$$y'=(x\sin\theta+y\cos\theta)$$

所以，<br>

$$\begin{bmatrix}x'\\ y' \end{bmatrix}=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}\begin{bmatrix}x \\ y\end{bmatrix}$$

从而得到旋转矩阵<br>

$$\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$$

## 几何推导方式
