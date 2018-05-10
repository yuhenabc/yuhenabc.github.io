title: 使用环境变量实现 npm 换源
date: 2018-5-10
category: 知识备忘
tags: npm
---

为什么需要换源？换源是一种不屈的态度，是对自己生命的负责。

### 1. 安装普通的第三方模块时

``` bash
registry=http://registry.npm.taobao.org npm install
```

### 2. 安装依赖有 node-sass 时

``` bash
sass_binary_site=https://npm.taobao.org/mirrors/node-sass npm install
```

### 3. 安装依赖有 electron 时

``` bash
electron_mirror=https://npm.taobao.org/mirrors/electron npm install
```

### 4. 合一，将环境变量写到 ~/.npmrc 里

.npmrc 的内容：

``` text
registry=http://registry.npm.taobao.org/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
electron_mirror=https://npm.taobao.org/mirrors/electron/
```

以后直接：

``` bash
npm install
```

就可以。

### 5. 用 nvm 安装 node 时同样有环境变量可用

``` bash
NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node nvm install v10.0.0
```
