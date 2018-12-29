title: Mac 终端开启和关闭代理的方法
date: 2018-12-29
category: 知识备忘
tags: shell
---

## 简单命令

假如你的代理机是你的本机（127.0.0.1），代理的端口为 7070，

开启代理很简单，就是用 export 命令设置全局变量 https_proxy 和 http_proxy：

``` bash
export https_proxy="http://127.0.0.1:7070"
export http_proxy="http://127.0.0.1:7070"
```

关闭代理就是用 unset 命令把全局变量清空：

``` bash
unset http_proxy
unset https_proxy
```

## 自定义命令

程序员不喜欢 repeat (him/her/it)self，所以。。。

首先，创建两个文件，`openproxy.sh` 和 `closeproxy.sh`，

openproxy.sh

``` bash
export https_proxy="http://127.0.0.1:7070"
export http_proxy="http://127.0.0.1:7070"

echo "already open proxy with 127.0.0.1:7070"
```

closeproxy.sh

``` bash
unset http_proxy
unset https_proxy

echo "already close proxy"
```

接着，在你的用户根目录新建一个 `.command` 文件夹，然后存放这两个文件，

然后，修改你的 `.bzshrc` 或者 `.zshrc`，在合适的地方添加如下别名（alias）命令，

``` bash
alias openproxy="source ~/.command/openproxy.sh"
alias closeproxy="source ~/.command/closeproxy.sh"
```

# 用途

从此以后，再也不用担心通过命令行安装一些依赖的关键时刻因为“墙”的原因而卡壳，命令举例：

``` bash
# homebrew 安装 node
brew install node

# homebrew 安装 yarn
brew install yarn

# wget 下载国外资源
wget https://<some_url>
```

等等。

