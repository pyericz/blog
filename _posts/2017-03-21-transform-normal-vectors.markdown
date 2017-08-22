---
layout: post
title: 法线向量的空间变换
date: 2017-03-21
categories: math
tag: [vector, transform]
mathjax: true
author: 张培养
---

3D模型中的顶点一般包含法线向量和切线向量信息，当模型的顶点在空间中做变换时，应同时变换顶点的法线向量和切线向量。本文探讨3D模型顶点法线向量的变换。




因为切线向量和法线向量在平移变换中保持不变，因此，在变换中我们不需要关心平移向量的影响。
假设顶点的法线向量为$$\mathbf{N}$$，切线向量为$$\mathbf{T}$$，顶点变换矩阵为$$\mathbf{M}$$，切线变换矩阵为$$\mathbf{M}'$$，法线的变换矩阵为$$\mathbf{G}$$。另假设相邻的两个点分别为$$\mathbf{P}_1$$和$$\mathbf{P}_2$$，则切线向量和两点之间的关系为：

$$
\mathbf{T} = \mathbf{P}_1 - \mathbf{P}_2
$$

变换后，切线与顶点之间应满足如下关系

$$
\mathbf{M}'\mathbf{T} = \mathbf{M}\mathbf{P}_1 - \mathbf{M}\mathbf{P}_2
$$

整理可得，

$$
\begin{align}
\mathbf{M}'\mathbf{T} &= \mathbf{M}\mathbf{P}_1 - \mathbf{M}\mathbf{P}_2 \\
&= \mathbf{M}(\mathbf{P}_1 - \mathbf{P}_2) \\&
= \mathbf{M}\mathbf{T}
\end{align}
$$

可见，切线向量的变换矩阵和顶点的变换矩阵相同，即

$$
\mathbf{M}' = \mathbf{M}
$$

因为法线和切线满足正交关系

$$
\mathbf{N}\cdot\mathbf{T} = \mathbf{N}^T\mathbf{T} = 0
$$

变换后的法线向量$$\textbf{N}'$$和切线向量$$\textbf{T}'$$也应满足正交关系

$$
\mathbf{N}'\cdot\mathbf{T}' = 0
$$

即，

$$
(\mathbf{GN})\cdot(\mathbf{MT}) = 0
$$

展开

$$
\begin{align}
(\mathbf{GN})\cdot(\mathbf{MT}) &= 
(\mathbf{GN})^T(\mathbf{MT}) \\
&= \mathbf{N}^T\mathbf{G}^T\mathbf{MT} \\
&= 0
\end{align}
$$
 
既然$$\mathbf{N}^T\mathbf{T} = 0$$，那么如果

$$\mathbf{G}^T\mathbf{M} = \mathbf{I} $$

则上式$$\mathbf{N}^T\mathbf{G}^T\mathbf{MT} = 0$$即可得到满足。即法线向量的变换矩阵为

$$
\mathbf{G} = (\mathbf{M}^{-1})^T
$$

*************************


值得注意的是，如果矩阵$$\mathbf{M}$$是正交矩阵，则

$$
\mathbf{M}^{-1} = \mathbf{M}^{T}
$$

代入到法线向量的变换矩阵，得到

$$
\mathbf{G} = (\mathbf{M}^{-1})^T = (\mathbf{M}^{T})^T = \mathbf{M}
$$

可见，在顶点变换矩阵为正交阵时，法线和切线向量的变换矩阵和顶点的变换矩阵相同。
