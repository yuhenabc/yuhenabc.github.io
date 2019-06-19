title: 使用 virtualenv 创建 python3 虚拟环境
date: 2018-3-10
category: 知识备忘
tags: python
---

## 1. 安装 python3

``` bash
brew install python3
```

## 2. 新建虚拟环境

切换到用户根目录

``` bash
cd
```

新建一个 virtualenv：

``` bash
virtualenv -p python3 .env3
```

其中 `.env3` 是虚拟环境即将使用的文件夹，可能得到类似下面的结果，表示成功：

``` text
Running virtualenv with interpreter /usr/local/bin/python3
Using base prefix '/usr/local/Cellar/python/3.6.4_3/Frameworks/Python.framework/Versions/3.6'
New python executable in /Users/feng/.env3/bin/python3.6
Also creating executable in /Users/feng/.env3/bin/python
Installing setuptools, pip, wheel...done.
```

## 3. 激活虚拟环境

激活 virtualenv：

``` bash
source ~/.env3/bin/activate
```

这时候命令行开头会发生变化， 会多出一个前缀 `(.env3)`，表示当前是在虚拟环境中操作。

验证一下：

``` bash
which python
```

会得到：

``` bash
/Users/feng/.env3/bin/python
```

再验证版本：

``` bash
python -V
```

会得到：

``` text
Python 3.6.4
```

发现并不是系统自带的的 python，而是刚刚创建的 `.env` 文件夹中的 python，而且是 3 的版本，这就对了。

查看一下目前都安装了哪些模块：

``` bash
pip list
```

可能得到如下结果：

``` text
Package    Version
---------- -------
pip        9.0.1  
setuptools 38.5.2 
wheel      0.30.0 
```

则表明已安装了基本模块且 pip 可以正常使用。

## 4. 退出虚拟环境

退出 virtualenv：

``` bash
deactivate
```

可以看到命令行的前缀 `(.env3)` 消失不见了。
