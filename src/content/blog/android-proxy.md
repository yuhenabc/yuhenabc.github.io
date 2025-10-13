---
title: 'Android 如何设置全局代理'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Aug 22 2019'
heroImage: 'https://static.yuhenabc.com/blog/blog-placeholder-about.jpg'
---

> 日常生活中，Android 的 http 代理直接使用设置里的 Wi-Fi 设置就够了，但是有些情况下仍然不足，本文给出另外一种解法。这种解法就是通过控制台修改 Android 的全局设置，适用于真机及模拟器。步骤如下：

---

### Step1: 进入控制台

```bash
adb shell
```

---

### Step2: 设置代理

```bash
settings put global http_proxy 127.0.0.1:8888
```

---

### Step3: 移除代理

```bash
settings delete global http_proxy
settings delete global global_http_proxy_host
settings delete global global_http_proxy_port
```
