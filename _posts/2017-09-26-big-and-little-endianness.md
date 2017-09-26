---
layout: post
title: 大小端字节序
date: 2017-09-26
categories: computer
tag: [endian, big, small, byte, sequence]
---

**大端**(**Big-endian**)和**小端**(**Little-endian**)字节序是计算机内存存储数据的两种方式。所谓大端字节序是指字节序列按照**高位在前、低位在后**的方式存储，而小端字节序则是**低位在前、高位在后**。以双字节十六位进制数字```0x1234```为例。该数字的高位字节是```0x12```，低位字节是```0x34```。对大端字节序来说，该数字的存储排列顺序是```12 34```（即第一个字节是```12```，第二个字节是```34```）；而对小端字节序来说，其排列顺序则变为```34 12```。

大小端在内存中的排列方式如下图所示（图片引自[Wikipedia](https://en.wikipedia.org/wiki/Endianness)）

{:.imgcap}
![](/assets/img/2017/09/26/Big-Endian.svg)

{:.imgcap}
![](/assets/img/2017/09/26/Little-Endian.svg)

那么为什么计算机要区分大端和小端字节序呢？


大端字节序是人类读取数值最自然的方式。
