---
layout: post
title: 贝塞尔曲线
date: 2017-09-07
categories: math
tag: [bezier, curve, bernstein, polynomial]
mathjax: true
---
* content
{:toc}

我们在上一篇文章《[伯恩斯坦多项式](/math/2017/09/06/bernstein-polynomial/)》中，我们提到了伯恩斯坦多项式的一般形式

$$
B_n(t) = \sum_{i=0}^{n}\beta_i \cdot b_{i, n}(t)
$$

其中，

$$
b_{i,n}(t) = \binom{n}{i}\cdot t^{i} \cdot (1-t)^{(n-i)}, \quad t\in[0, 1]
$$

是n阶伯恩斯坦基底多项式。而$$\beta_i$$叫做伯恩斯坦系数。当伯恩斯坦系数是二维平面中的一系列固定点时，伯恩斯坦多项式就演变成了本篇要讨论的贝塞尔曲线(Bézier curve)。



<style>

.curve, .line {
  fill: none;
  stroke-width: 1px;
}
.curve {
  stroke: red;
  stroke-width: 3px;
}
.control {
  fill: #ccc;
  stroke: #000;
  stroke-width: .5px;
	cursor: move;
}
.control.drag, .control:hover {
	fill: #fe0;
}
.controltext {
  font-size: .6em;
}
svg {
  display: inline-block;
}
.vis {
    <!-- border: 1px solid #ddd; -->
}
</style>


<script src="/assets/js/2017/09/07/d3.min.js"></script>
<script src="/assets/js/2017/09/07/control.js"></script>


## 推导

结合伯恩斯坦多项式的前几阶展开式，我们可以得到相应的贝塞尔曲线形式。

### 线性曲线
对二阶伯恩斯坦多项式展开，得到如下形式：

$$
B(t) = P_0 \cdot (1-t) + P_1 \cdot t  = P_0 + (P_1 - P_0) \cdot t
$$

从公式可以看出，二阶展开式对应的是介于$$P_0$$和$$P_1$$之间的线性插值点。

<div id="vis0" class="vis">
	<script>
        var points = [
            {x: 0, y: 346},
            {x: 160, y: 30},
        ];
		start(2, "#vis0", points);
	</script>
</div>


### 二次方曲线

<div id="vis1" class="vis">
	<script>
		start(3, "#vis1");
	</script>
</div>


### 三次方曲线

<div id="vis2" class="vis">
	<script>
		start(4, "#vis2");
	</script>
</div>

### 四次方曲线

<div id="vis3" class="vis">
	<script>
		start(5, "#vis3");
	</script>
</div>






## 参考

- [Animated Bézier Curves](https://www.jasondavies.com/animated-bezier/)
