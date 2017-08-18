---
layout: post
title: OpenGL中的透视投影
categories: math
tag: [geometry, opengl, perspective, projection, matrix]
date: 2017-03-19
---

OpenGL使用归一化的设备坐标(Normalized device coordinates, NDC)，设备的中心点在坐标原点$$(0, 0)$$上，沿x轴，左边缘是-1，右边缘是+1；沿y轴，下边缘是-1，上边缘是+1。因OpenGL采用右手系，z轴方向朝屏幕外面。
因此我们需要把投影坐标映射到[-1, 1]的空间中，该空间是齐次裁剪空间(homogeneous clip space)在3D空间的映射。
假设近裁截面的上下左右边缘分别为$$t, b, l, r$$，近裁截面的z方向坐标为$$-n$$，远裁截面的z方向坐标为$$-f$$，那么透视投影矩阵可以表示为

$$
\begin{bmatrix}
\frac{2n}{r-l}&0&\frac{r+l}{r-l}&0\\
0&\frac{2n}{t-b}&\frac{t+b}{t-b}&0\\
0&0&-\frac{f+n}{f-n}&-\frac{2nf}{f-n}\\
0&0&-1&0
\end{bmatrix}
$$

证明过程如下：

假设四维相机空间中的齐次坐标点$$\textbf{P}=(P_x, P_y, P_z, 1)$$处在视锥体(View frustum)中，则该点投影到近裁截面上的点$$(x, y)$$应满足$$l\le x\le r, b\le y \le t$$。映射到$$[-1,1]$$的点$$(x',y')$$可以由如下式子导出

$$
\frac{x'-(-1)}{1-(-1)} = \frac{x-l}{r-l}
$$

即

$$
x'=(x-l)\frac{2}{r-l}-1 \tag{1}\label{eq:1}
$$

同理，

$$
y'=(y-b)\frac{2}{t-b}-1	\tag{2}\label{eq:2}
$$

考虑到$$(P_x, P_y)$$投影到近裁截面的点$$(x, y)$$应满足

$$
x = -\frac{n}{P_z}P_x\\
y = -\frac{n}{P_z}P_y
$$

代入到(1)(2)式中，得到

$$
x' = \frac{2n}{r-l}(-\frac{P_x}{P_z})-\frac{r+l}{r-l} \tag{3}\label{eq:3}
$$

和

$$
y' = \frac{2n}{t-b}(-\frac{P_y}{P_z})-\frac{t+b}{t-b} \tag{4}\label{eq:4}
$$

接下来需要将投影的z坐标映射到[-1, 1]，考虑到点$$\textbf{P}$$在视锥体内部，应满足$$-f\le P_z \le -n$$，且在光栅化处理中z的倒数是做线性插值的，因此可以构建如下的线性方程

$$
z'=\frac{A}{z}+B \tag{5}\label{eq:5}
$$

该方程应该满足$$-n \rightarrow -1, -f \rightarrow 1$$（注意这样的映射翻转了z轴，使之成为左手系），因此

$$
-1=\frac{A}{-n}+B, 
1=\frac{A}{-f}+B \tag{6}\label{eq:6}
$$

解得

$$
A = \frac{2nf}{f-n}, 
B = \frac{f+n}{f-n} \tag{7}\label{eq:7}
$$

代入(5)式，得到

$$
z'=-\frac{2nf}{f-n}(-\frac{1}{P_z}) + \frac{f+n}{f-n} \tag{8}\label{eq:8}
$$

(3)(4)(8)式都包含除数$$-P_z$$。映射到[-1, 1]的点$$(x',y',z')$$等价于四维齐次点（$$w = -P_z$$)

$$
\textbf{P}'= (-x'P_z, -y'P_z, -z'P_z, -P_z) \tag{9}\label{eq:9}
$$

重新整理(3)(4)(8)，得到

$$
-x'P_z = \frac{2n}{r-l}P_x+\frac{r+l}{r-l}P_z \tag{10}\label{eq:10}
$$

$$
-y'P_z = \frac{2n}{t-b}P_y+\frac{t+b}{t-b}P_z \tag{11}\label{eq:11}
$$

$$
-z'P_z=-\frac{f+n}{f-n}P_z - \frac{2nf}{f-n} \tag{12}\label{eq:12}
$$

用矩阵的形式表示

$$
\textbf{P}'=\textbf{M}_{frustum}\textbf{P} = 
\begin{bmatrix}
\frac{2n}{r-l}&0&\frac{r+l}{r-l}&0\\
0&\frac{2n}{t-b}&\frac{t+b}{t-b}&0\\
0&0&-\frac{f+n}{f-n}&-\frac{2nf}{f-n}\\
0&0&-1&0
\end{bmatrix}
\begin{bmatrix}
P_x\\
P_y\\
P_z\\
1
\end{bmatrix}
\tag{13}\label{eq:13}
$$

即可得到透视投影矩阵

$$
\textbf{M}_{frustum} = 
\begin{bmatrix}
\frac{2n}{r-l}&0&\frac{r+l}{r-l}&0\\
0&\frac{2n}{t-b}&\frac{t+b}{t-b}&0\\
0&0&-\frac{f+n}{f-n}&-\frac{2nf}{f-n}\\
0&0&-1&0
\end{bmatrix}
\tag{14}\label{eq:14}
$$

![](/assets/img/opengl-perspective-projection/1.png){: .center-image width="720px" height="469px"}

