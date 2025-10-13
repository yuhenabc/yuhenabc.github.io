---
title: '使用环境变量实现 npm 换源'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'May 10 2018'
heroImage: 'https://static.yuhenabc.com/blog/blog-placeholder-about.jpg'
---

为什么需要换源？换源是一种不屈的态度，是对自己生命的负责。

---

### 1. 安装普通的第三方模块时

```bash
registry=https://registry.npmmirror.com npm install
```

---

### 2. 安装依赖有 node-sass 时

```bash
sass_binary_site=https://npmmirror.com/mirrors/node-sass npm install
```

---

### 3. 安装依赖有 electron 时

```bash
electron_mirror=https://npmmirror.com/mirrors/electron npm install
```

---

### 4. 合一，将环境变量写到 `~/.npmrc` 里

.npmrc 的内容：

```text
sass_binary_site=https://npmmirror.com/mirrors/node-sass
electron_mirror=https://npmmirror.com/mirrors/electron
registry=https://registry.npmmirror.com
```

以后直接：

```bash
npm install
```

就可以。

---

### 5. 用 nvm 安装 node 时同样有环境变量可用

```bash
NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node nvm install v10.0.0
```
