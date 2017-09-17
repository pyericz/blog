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

在上一篇文章《[伯恩斯坦多项式](/math/2017/09/06/bernstein-polynomial/)》中，我们提到了伯恩斯坦多项式的一般形式

$$
B_n(t) = \sum_{i=0}^{n}\beta_i \cdot b_{i, n}(t)
$$

其中，

$$
b_{i,n}(t) = \binom{n}{i}\cdot t^{i} \cdot (1-t)^{(n-i)}, \quad t\in[0, 1]
$$

是n阶伯恩斯坦基底多项式。而$$\beta_i$$叫做伯恩斯坦系数。当伯恩斯坦系数是二维平面中的一系列固定点时，伯恩斯坦多项式就演变成了本篇要讨论的贝塞尔曲线(Bézier curve)。

我们先来看一个三阶贝塞尔曲线的例子：

<div id="vis" class="vis">
	<script>
	    var points = [
            {x: -120, y: 0},
            {x: -56, y: 177},
            {x: 69,y: 228},
            {x: 120, y: 60},
        ];
		bezierCurveAnimation("#vis", points);
	</script>
</div>

在该例子中，共有四个坐标点（控制点）。读者可以尝试拖动四个控制点，看看贝塞尔曲线的形态变化。



## 推导

结合伯恩斯坦多项式的前几阶展开式，我们可以得到相应的贝塞尔曲线形式。

### 线性曲线
对一阶伯恩斯坦多项式展开，得到如下形式：

$$
B(t) = P_0 \cdot (1-t) + P_1 \cdot t  = P_0 + (P_1 - P_0) \cdot t
$$

从公式可以看出，二阶展开式对应的是介于$$P_0$$和$$P_1$$之间的线性插值点。其动态效果如下：

<div id="vis0" class="vis">
	<script>
        var points = [
            {x: 0, y: 0},
            {x: 60, y: 260},
        ];
		bezierCurveAnimation("#vis0", points);
	</script>
</div>


### 二次方曲线

对二阶伯恩斯坦多项式展开，得到如下形式：

$$
B(t) = P_0 \cdot (1-t)^2 + P_1\cdot 2(1-t)t + P_2 \cdot t^2
$$

$$B(t)$$对$$t$$求导，得到下式：

$$
B'(t) = 2(1-t)\cdot (P_1 - P_0) + 2t\cdot (P_2 - P_1)
$$

把两个端点代入式子中

$$
\begin{align}
B'(0) &= 2 (P_1 - P_0)\\
B'(1) &= 2 (P_2 - P_1)
\end{align}
$$

这个结果显示，位于$$P_0$$和$$P_2$$点的两条切线相交于$$P_1$$点。而当$$t$$从0逐渐变化到1的过程中，$$B(t)$$点处的切线会从$$P_0P_1$$直线逐渐过渡到$$P_1P_2$$直线。其动态效果如下：

<div id="vis1" class="vis">
	<script>
        var points = [
            {x: 0, y: 0},
            {x: 60, y: 181},
            {x: -60,y: 258},
        ];
		bezierCurveAnimation("#vis1", points);
	</script>
</div>

读者可以尝试拖动三个坐标点(**控制点**)看看曲线和切线的形态变化。

### 三次方曲线

和二次方曲线类似，我们先写出展开式:

$$
B(t) = P_0 \cdot (1-t)^3 + P_1\cdot 3(1-t)^2t + P_2 \cdot 3(1-t)t^2 + P_3 \cdot t^3
$$

接着对展开式求导，得到如下结果：

$$
B'(t) = 3(1-t)^2\cdot (P_1 - P_0) + 6(1-t)t\cdot (P_2 - P_1) + 3t^2\cdot(P_3 - P_2)
$$

代入端点值：

$$
\begin{align}
B'(0) &= 3 (P_1 - P_0)\\
B'(1) &= 3 (P_3 - P_2)
\end{align}
$$

结果显示，位于$$P_0$$和$$P_2$$点的两条切线分别相交于$$P_1$$点和$$P_2$$点。而当$$t$$从0逐渐变化到1的过程中，$$B(t)$$点处的切线会从$$P_0P_1$$直线逐渐过渡到$$P_2P_3$$直线。其动态效果如下：

<div id="vis2" class="vis">
	<script>
	    var points = [
            {x: 0, y: 0},
            {x: 60, y: 131},
            {x: 0,y: 258},
            {x: -60, y: 176},
        ];
		bezierCurveAnimation("#vis2", points);
	</script>
</div>

读者同样可以尝试拖动四个坐标点(**控制点**)来看看曲线和切线的形态变化。

----------------------------
四次方曲线和更高次的曲线，我们不做详细的讨论，只做动态曲线演示。其结论的推导方式和三次方、二次方曲线类似。感兴趣的读者可以自己推导。

### 四次方曲线

<div id="vis3" class="vis">
	<script>
	    var points = [
            {x: 0, y: 0},
            {x: 80, y: 131},
            {x: 60,y: 258},
            {x: -80, y: 206},
            {x: -60, y: 80}
        ];
		bezierCurveAnimation("#vis3", points);
	</script>
</div>

### 五次方曲线

<div id="vis4" class="vis">
	<script>
	    var points = [
            {x: 0, y: 0},
            {x: 80, y: 131},
            {x: 0,y: 258},
            {x: -60, y: 206},
            {x: 0, y: 140},
			{x: -30, y: 60}
        ];
		bezierCurveAnimation("#vis4", points);
	</script>
</div>




## 参考

- [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
- [Animated Bézier Curves](https://www.jasondavies.com/animated-bezier/)

