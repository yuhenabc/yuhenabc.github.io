title: 使用 venv 创建 python3 虚拟环境
date: 2019-6-19
category: 知识备忘
tags: python
---

> 之前有篇文章，[《使用 virtualenv 创建 python3 虚拟环境》](../../../../2018/03/10/virtualenv)，现在我们换一款软件来做同样的事情 —— venv。

## 1. 安装 python3

``` bash
brew install python3
```

## 2. 新建虚拟环境

切换到项目根目录

``` bash
cd path/to/myproject
```

新建一个 venv，习惯上命名为 `venv`：

``` bash
python3 -m venv venv
```

没有任何错误提示，表示成功；如果是 Ubuntu 系统可能提示：

``` text
The virtual environment was not created successfully because ensurepip is not
available.  On Debian/Ubuntu systems, you need to install the python3-venv
package using the following command.

    apt-get install python3-venv

You may need to use sudo with that command.  After installing the python3-venv
package, recreate your virtual environment.
```

原因说得很清楚了，把 `python3-venv` 装一下就可以了

## 3. 激活虚拟环境

激活 venv：

``` bash
source venv/bin/activate
```

这时候命令行开头会发生变化， 会多出一个前缀 `(venv)`，表示当前是在虚拟环境中操作。

验证一下：

``` bash
which python
```

会得到：

``` bash
path/to/myproject/venv/bin/python
```

再验证版本：

``` bash
python -V
```

会得到：

``` text
Python 3.6.8
```

发现并不是系统自带的的 python，而是刚刚创建的 `venv` 文件夹中的 python，而且是 3 的版本，这就对了。

查看一下目前都安装了哪些模块：

``` bash
pip list
```

可能得到如下结果：

``` text
Package       Version
------------- -------
pip           9.0.1
pkg-resources 0.0.0
setuptools    39.0.1
```

则表明已安装了基本模块且 pip 可以正常使用。

pip 有时候会有如下提示：

``` text
DEPRECATION: The default format will switch to columns in the future. You can use --format=(legacy|columns) (or define a format=(legacy|columns) in your pip.conf under the [list] section) to disable this warning.
```

你可以在 `venv` 目录下新建一个 `pip.conf` 文件，然后把下面的内容粘贴到 `pip.conf` 中以消除错误提示：

``` toml
[list]
format=columns
```

如果遇到：

``` text
You are using pip version 19.0.3, however version 19.1.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

就执行 `pip install --upgrade pip` 升级 pip 就行了

## 4. 退出虚拟环境

退出 venv：

``` bash
deactivate
```

可以看到命令行的前缀 `(venv)` 消失不见了。
