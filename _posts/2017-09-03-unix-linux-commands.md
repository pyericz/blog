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
>**list directory contents**
```shell
$ ls
```
列出当前目录的内容
```shell
$ ls -a
```
列出所有文件，包括隐藏文件
```shell
$ ls -l
```
使用长列表格式列出目录 

**cd** 
>**change directory**
```shell
$ cd dir
```
更改目录到dir
```shell
$ cd
```
更改目录到home 


**pwd**
>**print name of current/working directory**
```shell
$ pwd
```
显示当前目录 

**mkdir**
>**make directories**
```shell
$ mkdir dir
```
创建dir目录 

**rm**
>**remove files or directories**
```shell
$ rm file
```
删除file文件 
```shell
$ rm -r dir
```
删除dir目录 
```shell
$ rm -f file
```
强制删除file文件 
```shell
$ rm -rf dir
```
强制删除目录 


**cp**
>**copy files and directories**
```shell
$ cp file1 file2
```
复制file1文件到file2文件 
```shell
$ cp -r dir1 dir2
```
复制dir1目录到dir2目录 

**mv**
>**move (rename) files**
```shell
$ mv file1 file2
```
将file1文件重命名为file2文件; 
如果file2是一个已经存在的目录，则将file1文件移动到该目录下 

**ln -s**
>**make links between files**
```shell
$ ln -s file1 file2
```
创建file1文件的符号链接file2 

**touch**
>**change file timestamps**
```shell
$ touch file
```
如果file文件不存在则创建file文件，如果存在则改变file文件的timestamp

**cat**
>**concatenate files and print on the standard output**
```shell
$ cat file
```
将file文件拼接到标准输出 
```shell
$ cat > file
```
将标准输入添加到file文件

**more**
>**file perusal filter for crt viewing**
```shell
$ more file
```
查看file内容 

**head**
>**output the first part of files**
```shell
$ head file
```
查看file文件的前10行 

**tail**
>**output the last part of files**
```shell
$ tail file
```
查看file文件的后10行 
```shell
$ tail -f file 
```
从后10行开始查看file内容 

## 进程管理

**ps**
>**report a snapshot of the current processes**
```shell
$ ps
```
显示当前的活动进程

**top**
>**display Linux processes**
```shell
$ top
```
显示所有正在运行的进程

**kill**
>**send a signal to a process**
```shell
$ kill pid
```
杀掉id为pid的进程

**killall**
>**kill processes by name**
```shell
$ killall proc
```
杀掉所有名为proc的进程（**请谨慎使用**）


**halt**
>**stopping the system**
```shell
# halt
```
停止系统

**reboot**
>**restarting the system**
```shell
# reboot
```
重启系统

**bg**
>
```shell
$ bg
```
列出已停止或后台的作业

**fg** 
>
```shell
$ fg
```
将最近的作业带到前台
```shell
$ fg n
```
将作业n带到前台



## 文件权限

**chmod**
>**change file mode bits**
```shell
$ chmod 777 file
```
更改file的权限为对所有用户可读、可写、可执行。

```
octal值
4 (100) 读(r) 
2 (010) 写(w)
1 (001) 执行(x)
```


**chown**
>**change file owner and group**
```shell
$ chown owner file
```
更改file文件的所有者为owner

**chgrp**
>**change group**
```shell
$ chgrp group file
```
更改file文件的所有组为group

## SSH

**ssh**
>**OpenSSH SSH client (remote login program)**
```shell
$ ssh user@host
```
以user用户身份连接到host
```shell
$ ssh -p port user@host
```
在端口port以user用户身份连接到host

**ssh-copy-id**
>**use locally available keys to authorise logins on a remote machine**
```shell
$ ssh-copy-id user@host 
```
将密钥添加到host以实现无密码登录

**scp**
>**secure copy (remote file copy program)**
```shell
$ scp user@host:/path/to/files /path/to/destination
```
以user用户身份连接到host，并拷贝host下的/path/to/files文件到本地文件/path/to/destination
```shell
$ scp -r user@host:/path/to/dir /path/to/destination
```
以user用户身份连接到host，并拷贝host下的/path/to/dir目录到本地目录/path/to/destination

## 搜索

**grep**
>**file pattern searcher. (grep, egrep, fgrep, zgrep, zfgrep)**
```shell
$ grep pattern files
```
搜索files中匹配pattern的内容
```shell
$ grep -r pattern dir
```
递归搜索dir中匹配pattern的内容

**command \| grep**
>
```shell
$ command | grep pattern
```
搜索command输出中匹配pattern的内容

**find**
>**walk a file hierarchy**
```shell
$ find / -name test.cpp
```
从根目录开始查找名为test.cpp的文件
```shell
$ find . -name test.cpp
```
从当前目录开始查找名为test.cpp的文件


## 系统信息

**date**
>**print or set the system date and time**
```shell
$ date
```
显示当前日期和时间

**cal**
>**displays a calendar and the date of Easter**
```shell
$ cal
```
显示当月的日历

**uptime**
>**Tell how long the system has been running**
```shell
$ uptime
```
显示系统从开机到现在所运行的时间

**w**
>**Show who is logged on and what they are doing.**
```shell
$ w
```
显示登录的用户

**whoami**
>**print effective userid**
```shell
$ whoami
```
查看你的当前用户名

**last**
>**indicate last logins of users and ttys**
```shell
$ last
```
显示上一个登录的用户和ttys

**uname -a**
>**print system information**
```shell
$ uname -a
```
显示内核信息

**cat /proc/cpuinfo**
>
```shell
$ cat /proc/cpuinfo
```
查看cpu信息

**cat /proc/meminfo**
>
```shell
$ cat /proc/meminfo
```
查看内存信息

**man**
>**format and display the on-line manual pages**
```shell
$ man command
```
显示command的说明手册

**df**
>**report file system disk space usage**
```shell
$ df
```
显示磁盘占用情况

**du**
>**estimate file space usage**
```shell
$ du
```
显示目录空间占用情况

**free**
>**Display amount of free and used memory in the system**
```shell
$ free
```
显示内存及交换区占用情况

## 压缩

**tar**
>**manipulate tape archives**
```shell
$ tar cf file.tar files
```
创建包含files的tar文件file.tar
```shell
$ tar xf file.tar
```
从file.tar提取文件
```shell
$ tar czf file.tar.gz files 
```
使用Gzip压缩创建tar文件
```shell
$ tar xzf file.tar.gz 
```
使用Gzip提取tar文件
```shell
$ tar cjf file.tar.bz2 
```
使用Bzip2压缩创建tar文件
```shell
$ tar xjf file.tar.bz2 
```
使用Bzip2提取tar文件


**gzip**
>**compression/decompression tool using Lempel-Ziv coding (LZ77)**
```shell
$ gzip file
```
压缩file并重命名为file.gz
```shell
$ gzip -d file.gz 
```
将file.gz解压缩为file

## 网络

**ping**
>**send ICMP ECHO_REQUEST packets to network hosts**
```shell
$ ping host
```
ping host并输出结果

**whois**
>**Internet domain name and network number directory service**
```
$ whois domain
```
获取domain的whois信息

**dig**
>**DNS lookup utility**
```
$ dig domain
```
获取domain的DNS信息
```shell
$ dig -x host 
```
逆向查询host


**wget**
>**The non-interactive network downloader.**
```shell
$ wget file
```
下载file文件
```shell
$ wget -c file 
```
断点续传

## 安装

**dpkg**
>**package manager for Debian**
```shell
$ dpkg -i pkg.deb
```
Debian安装pkg.deb包

**rpm**
>**RPM Package Manager**
```shell
$ rpm -Uvh pkg.rpm 
```
RPM安装pkg.rpm包

## 快捷键

**Ctrl+C** 
>停止当前命令


**Ctrl+Z** 
>停止当前命令，并可以用fg恢复

**Ctrl+D** 
>注销当前会话，与exit相似

**Ctrl+W**
>删除当前行中的字

**Ctrl+U** 
>删除整行

**!!** 
>重复上次的命令

**exit** 
>注销当前会话

## 参考

- [Unix/Linux Command Cheat Sheet](https://fosswire.com/post/2007/08/unixlinux-command-cheat-sheet/)
- [How To Find A File In Linux Using The Command Line](https://www.lifewire.com/uses-of-linux-command-find-2201100)
- [Linux permissions: chown, chgrp and chmod](http://www.marksei.com/linux-permissions-chown-chgrp-and-chmod/)
