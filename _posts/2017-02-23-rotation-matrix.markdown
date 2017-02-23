---
layout: post
title: 旋转矩阵
---

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

