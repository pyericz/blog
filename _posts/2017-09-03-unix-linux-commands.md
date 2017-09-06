---
layout: post
title: Unix/Linux常用命令整理
date: 2017-09-03
categories: linux
tag: [linux, unix, shell, command]
---
* content
{:toc}

本文罗列整理Unix/Linux的常用命令，方便查询。



## 文件命令

**ls**
```
list directory contents
列出目录 
```

**ls \-a**
```
do not ignore entries starting with `.`
列出所有文件，包括隐藏文件
```

**ls \-l**  
```
use a long listing format
使用长列表格式列出目录 
```

**cd** dir
```
change directory
更改目录到dir
```

**cd**

```
更改目录到home 
```

**pwd**
```
print name of current/working directory
显示当前目录 
```

**mkdir** dir
```
make directories
创建dir目录 
```

**rm** file
```
remove files or directories 
删除file文件 
```

**rm -r** dir
```
删除dir目录 
```

**rm -f** file
```
强制删除file文件 
```

**rm -rf** dir
```
强制删除目录 
```

**cp** file1 file2
```
copy files and directories
复制file1文件到file2文件 
```

**cp -r** dir1 dir2
```
复制dir1目录到dir2目录 
```

**mv** file1 file2
```
move (rename) files
将file1文件重命名为file2文件; 
如果file2是一个已经存在的目录，则将file1文件移动到该目录下 
```

**ln -s** file1 file2
```
make links between files
创建file1文件的符号链接file2 
```

**touch** file
```
change file timestamps
创建file文件 
```

**cat** file
```
concatenate files and print on the standard output
将file文件拼接到标准输出 
```

**cat >** file
```
将标准输入添加到file文件 
```

**more** file
```
file perusal filter for crt viewing
查看file内容 
```

**head** file  
```
output the first part of files
查看file文件的前10行 
```

**tail** file
```
output the last part of files
查看file文件的后10行 
```

**tail -f** file 
```
从后10行开始查看file内容 
```

## 进程管理

**ps**
```
report a snapshot of the current processes
显示当前的活动进程
```

**top**
```
display Linux processes
显示所有正在运行的进程
```

**kill** pid
```
send a signal to a process
杀掉id为pid的进程
```

**killall** proc
```
kill processes by name
杀掉所有名为proc的进程
```

**bg** 
```
列出已停止或后台的作业
```

**fg** 
```
将最近的作业带到前台
```

**fg** n
```
将作业n带到前台
```


## 文件权限

**chmod** octal file 
```
change file mode bits
更改file的权限. octal值:
4 (100) 读(r)
2 (010) 写(w)
1 (001) 执行(x)
```

**chown** owner file
```
change file owner and group
更改file文件的所有者为owner
```

**chgrp** group file
```
change group
更改file文件的所有组为group
```

## SSH

**ssh** user@host
```
以user用户身份连接到host
```

**ssh -p** port user@host
```
在端口port以user用户身份连接到host
```

**ssh-copy-id** user@host 
```
将密钥添加到host以实现无密码登录
```

**scp** user@host:/path/to/files /path/to/destination
```
secure copy (remote file copy program)
远程安全拷贝。以user用户身份连接到host，并拷贝host下的/path/to/files文件到本地/path/to/destination
```

## 搜索

**grep** pattern files
```
file pattern searcher. 
搜索files中匹配pattern的内容
另参考：egrep, fgrep, zgrep, zfgrep
```


**grep -r** pattern dir
```
递归搜索dir中匹配pattern的内容
```

**command \| grep** pattern
```
搜索command输出中匹配pattern的内容
```

**find** dir options term
```
walk a file hierarchy
文件查找
```

**find /** dir options term
```
从根目录开始查找。举例
$ find / -name test.cpp
```

**find .** dir options term
```
从当前目录开始查找。举例：
$ find . -name test.cpp
```


## 系统信息

**date**
```
print or set the system date and time
显示当前日期和时间
```

**cal**
```
displays a calendar and the date of Easter
显示当月的日历
```

**uptime**
```
Tell how long the system has been running
显示系统从开机到现在所运行的时间
```

**w**
```
Show who is logged on and what they are doing.
显示登录的用户
```

**whoami**
```
print effective userid
查看你的当前用户名
```

**uname -a**
```
print system information
显示内核信息
```

**cat /proc/cpuinfo**
```
查看cpu信息
```

**cat /proc/meminfo** 
```
查看内存信息
```

**man** command
```
显示command的说明手册
```

**df**
```
report file system disk space usage
显示磁盘占用情况
```

**du**
```
estimate file space usage
显示目录空间占用情况
```

**free**
```
Display amount of free and used memory in the system
显示内存及交换区占用情况
```

## 压缩

**tar cf** file.tar files
```
创建包含files的tar文件file.tar
```

**tar xf** file.tar
```
从file.tar提取文件
```

**tar czf** file.tar.gz files 
```
使用Gzip压缩创建tar文件
```

**tar xzf** file.tar.gz 
```
使用Gzip提取tar文件
```

**tar cjf** file.tar.bz2 
```
使用Bzip2压缩创建tar文件
```

**tar xjf** file.tar.bz2 
```
使用Bzip2提取tar文件
```

**gzip** file
```
压缩file并重命名为file.gz
```

**gzip -d** file.gz 
```
将file.gz解压缩为file
```

## 网络

**ping** host
```
ping host并输出结果
```

**whois** domain
```
获取domain的whois信息
```

**dig** domain 
```
获取domain的DNS信息
```

**dig -x** host 
```
逆向查询host
```

**wget** file 
```
下载file文件
```

**wget -c** file 
```
断点续传
```

## 安装

**dpkg -i** pkg.deb 
```
Debian安装包
```

**rpm -Uvh** pkg.rpm 
```
RPM安装包
```

## 快捷键

**Ctrl+C** 
```
停止当前命令
```

**Ctrl+Z** 
```
停止当前命令，并可以用fg恢复
```

**Ctrl+D** 
```
注销当前会话，与exit相似
```

**Ctrl+W**
```
删除当前行中的字
```

**Ctrl+U** 
```
删除整行
```

**!!** 
```
重复上次的命令
```

**exit** 
```
注销当前会话
```

## 参考

- [Unix/Linux Command Cheat Sheet](https://fosswire.com/post/2007/08/unixlinux-command-cheat-sheet/)
- [How To Find A File In Linux Using The Command Line](https://www.lifewire.com/uses-of-linux-command-find-2201100)
- [Linux permissions: chown, chgrp and chmod](http://www.marksei.com/linux-permissions-chown-chgrp-and-chmod/)
