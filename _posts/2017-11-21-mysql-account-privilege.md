---
layout: post
title: MySQL账号与权限管理
date: 2017-11-21
categories: mysql
tag: [mysql, privilege, account]
---
* content
{:toc}

我们在后端开发的时候通常需要使用数据库。但为了安全起见，登录数据库账户不应是具有最高权限的```root```账户。这就涉及到如何创建新账户，以及如何授权账户权限的问题。



## 账号登录

以非密码形式登录账号
```shell
$ mysql -u [username]
```

以密码形式登录账号
```shell
$ mysql -u [username] -p
```

## 创建账户

以```root```账户登录

```shell
$ mysql -u root -p
```

### 创建账户

```sql
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

### 给账户授权

一般表达式是：
```sql
GRANT [_type_of_permission_] ON [_database_name].[_table_name_] TO '[username]'@'localhost';
```

比如，要给新用户```newuser```所有数据库的所有表完全权限，可以这样输入命令

```sql
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
```

其中，```ALL PRIVILEGES```表示完全权限(full access), 第一个```*```代表所有数据库，第二个```*```代表数据库下的所有表。再比如，如果要给```newuser```授权```test```库的```account```表完全权限，可以这样输入命令

```sql
GRANT ALL PRIVILEGES ON test . account TO 'newuser'@'localhost';
```

可用的权限列表包括：
- ```ALL PRIVILEGES``` 允许用户到指定数据库的完全权限
- ```CREATE``` 允许用户创建新表或新数据库
- ```DROP``` 允许用户删除表或数据库
- ```DELETE``` 允许用户删除行
- ```INSERT``` 允许用户插入行
- ```SELECT``` 允许用户读取数据库
- ```UPDATE``` 允许用户更新数据库
- ```GRANT OPTION``` 允许用户授权或移除其他账户

可以通过如下方式刷新权限

```sql
FLUSH PRIVILEGES;
```

### 回收权限

和给账户授权相对的，是权限的回收。回收权限的一般表达式是：

```sql
REVOKE [_type_of_permission] ON [_database_name_].[_table_name_] FROM '[username]'@'localhost';
```

## 删除账号

```sql
DROP USER '[username]'@'localhost';
```

## 退出账号

```sql
quit
```
