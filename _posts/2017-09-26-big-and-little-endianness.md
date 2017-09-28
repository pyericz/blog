---
layout: post
title: 大小端字节序
date: 2017-09-26
categories: computer
tag: [endian, big, small, byte, sequence]
---

**大端**(**Big-endian**)和**小端**(**Little-endian**)字节序是计算机内存存储数据的两种方式。所谓大端字节序是指字节序列按照**高位在前、低位在后**的方式存储，而小端字节序则是**低位在前、高位在后**。以双字节十六位进制数字```0x1234```为例。该数字的高位字节是```0x12```，低位字节是```0x34```。对大端字节序来说，该数字的存储排列顺序是```12 34```（即第一个字节是```12```，第二个字节是```34```）；而对小端字节序来说，其排列顺序则变为```34 12```。

大小端在内存中的排列方式如下图所示

{:.imgcap}
![](/assets/img/2017/09/26/Big-Endian.svg)

{:.imgcap}
![](/assets/img/2017/09/26/Little-Endian.svg)

那么为什么计算机要区分大端和小端字节序呢？


不同的计算机读取数据的方式不一样，这就跟人说着不同的语言一样。我有时候喜欢把不同的计算机读取数据的方式比作中国古代人和现代人读书的方式。古代人喜欢“从右往左”读书写字，现代人则喜欢“从左往右”读。不同架构的计算机也一样，会在“从左往右”和“从右往左”之间有所偏好。下面引用一段维基百科对计算机如何选用字节序的描述

>Both big and little forms of endianness are widely used in digital electronics. The choice of endianness for a new design is often arbitrary, but later technology revisions and updates perpetuate the existing endianness and many other design attributes to maintain backward compatibility. As examples, the IBM z/Architecture mainframes and the Motorola 68000 series use big-endian while the Intel x86 processors use little-endian. The designers of System/360, the ancestor of z/Architecture, chose its endianness in the 1960s; the designers of the Motorola 68000 and the Intel 8086, the first members of the 68000 and x86 families, chose their endianness in the 1970s.

不同的字节序带来的问题就是如何让同样一份数据在不同的计算机硬件中正确读取出来。解决的方法一般包括两种方式：
- 定义通用格式的数据（比如所有的网络传输的数据都遵循同一种格式）
- 在文件头中描述数据格式
