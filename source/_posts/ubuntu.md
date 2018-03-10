title: 安装 ubuntu 后要做的三件事
date: 2018-3-10
category: 知识备忘
tags: linux
---

## 1. 中文语言支持

安装中文语言包：

``` bash
apt install language-pack-zh-hant language-pack-zh-hans
```

配置相关环境变量：

``` bash
vim /etc/environment
```

在文件中增加语言和编码的设置：

``` text
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"
```

重新设置本地配置：

``` bash
dpkg-reconfigure locales
```

这时候会出来一个选择界面，把默认没有打勾的 `zh_` 开头的语言包打上勾就可以回撤了：

``` text
Generating locales (this might take a while)...
  en_US.UTF-8... done
  zh_CN.UTF-8... done
  zh_HK.UTF-8... done
  zh_SG.UTF-8... done
  zh_TW.UTF-8... done
Generation complete.
```

表示成功。

同样还可以更改一下时区：

``` bash
dpkg-reconfigure tzdata
```

## 2. 新建一个超级用户

新建用户:

``` bash
adduser feng
```

经过设置密码等一系列操作后成功。

接着添加用户到 sudo 分组：

``` bash
usermod -G sudo feng
```

验证分组：

``` bash
groups feng
```

可能得到如下结果：

``` text
feng : feng sudo lxd
```

你会看到已经在 sudo 分组中了，这样用户 feng 就可以使用 sudo 命令了。

额外，我们给新用户生成一下 ssh-key，毕竟这是以后免不了的嘛：

``` bash
ssh-keygen
```

想要让机器可以通过远程访问，可以通过修改 `authorized_keys` 文件来赋予权限：

``` bash
vim authorized_keys
chmod 600 authorized_keys
```

最后一步是改变 `authorized_keys` 文件的访问权限为 600，这是系统规定，只有如此才生效。

## 3. 用更好的命令行提示工具

_注意：为了不影响 root 用户，我们使用上一步创建的超级用户登录来操作。_

系统默认的命令行提示工具是 bash，为了能用上更加生动的 oh-my-zsh（谁用谁知道），我们先安装 zsh：

``` bash
apt install zsh
```

接下来就是 oh-my-zsh 了，官方网站点 [这里](https://github.com/robbyrussell/oh-my-zsh)，文章介绍了好多，只要找到其中一行命令就可以安装了：

``` bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

安装后就可以尽情享受更加人性化和美观的命令提示界面了，还可以使用更简洁的缩写命令，例如用 `ll` 来替代 `ls -la`。
