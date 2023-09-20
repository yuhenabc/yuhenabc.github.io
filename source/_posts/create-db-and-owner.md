title: 初始化数据库必备步骤
date: 2023-09-18 10:47:17
category: 知识备忘
tags: sql
---

我们在创建测试数据库的时候，应该遵循一个数据库一个用户的原则，避免所有数据库都使用 root 来操作，这样可以顺便练习一下赋予权限的操作，合理利用数据库资源。一般会固定的有以下几个步骤：

* 创建新用户
* 创建新数据库
* 赋予该用户对该数据库的使用权限

下面以 dbuser 为新用户，exampledb 为新数据库，给出简单的示例

### postgres

创建新用户：

```sql
CREATE USER dbuser WITH PASSWORD '******';
```

创建新数据库：

```sql
CREATE DATABASE exampledb OWNER dbuser;
```

赋予权限：

```sql
GRANT ALL PRIVILEGES ON DATABASE exampledb TO dbuser;
```

### mysql

创建新用户：

```sql
CREATE USER dbuser IDENTIFIED BY '******';
```

创建新数据库：

```sql
CREATE DATABASE `exampledb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

赋予权限：

```sql
GRANT ALL PRIVILEGES ON exampledb.* TO 'dbuser'@'%';
```

特殊的，mysql 需要执行刷新权限才能使上面的操作生效

```sql
FLUSH PRIVILEGES;
```
