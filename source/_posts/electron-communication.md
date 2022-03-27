title: Electron 通信新思路
date: 2022-03-26 15:35:27
category: 探索发现
tags: electron
---

这里指主进程与渲染进程之间的通信。

就像官方文档说的那样：[Electron Docs -> Best Practices -> Security][1]

> 1. Only load secure content
> 2. Disable the Node.js integration in all renderers that display remote content
> 3. Enable context isolation in all renderers that display remote content

新版本的要求是，渲染进程不再建议开启 `nodeIntegration` 和 `allowRunningInsecureContent` 开关，并且对于外部远程内容，强烈建议打开 `sandbox` 开关。

那么，对于我们日常开发的本地渲染进程，如何优雅地和主进程之间进行通信，就需要我们去另辟蹊径了。

好在，Electron 虽然关上了一扇窗户，但是又打开了另一扇新的窗户，在 `preload` 中预加载的 js 环境中，就给我们留下一条后路，因为在预加载 js 里面，`require('electron')` 是被允许的，而且还提供了一个工具，可以使我们将这个文件里定义好的变量或方法方便地“挪移”到渲染进程的普通 js 环境里去，这个工具就是 —— [contextBridge][2]。

一段官方示例如下：

``` js
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  doThing: () => ipcRenderer.send('do-a-thing')
});
```

在渲染进程里这样使用：

``` js
// Renderer (Main World)
window.electron.doThing()
```

其中，`'electron'` 只是随便起的名称，并不意味着整个 electron 对象“挪移”到了渲染进程。

问题是，现在，虽然可以在渲染进程里调用 `window.electron.doThing()` 进行通信了，但是如果我通信的 `channel` 太多，是不是要一个个地定义 `doXXX()` 方法？岂不太麻烦了！

## 改进一：

一种思路是，将 `ipcRenderer` 对象“挪移”到了渲染进程里，我们试试看

``` js
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipc: ipcRenderer
});
```

然后再渲染进程里：

``` js
// Renderer (Main World)
console.log(window.electron.ipc);
```

发现，这里的 `ipc` ，也有 `invoke`，有 `send`，也有 `sendSync`，就是没有 `on`，使用这种方式，似乎只能进行 `Renderer --> Main` 方向的通信，反之则不可以，距离完成我们的任务还有一半距离，如果说项目只需要这单一方向的通信也就罢了，但是如果想要双向通信的话，就要开始新的尝试了。于是有了：

## 改进二：

我的思路是，既然 `contextBridge` 不给我暴露 `ipcRenderer` 的 `on` 方法，那我就自己写一个，于是有了下面的代码：

``` js
// Preload (Isolated World)
const { contextBridge: bridge, ipcRenderer: ipc } = require('electron');

bridge.exposeInMainWorld('ipc', {
  send: (channel, data) => ipc.send(channel, data),
  on: (channel, fun) => ipc.on(channel, fun),
});
```

渲染进程里：

``` js
// Renderer (Main World)
console.log(window.ipc);
```

发现有 `send` 和 `on` 方法，赶快试试：

主进程：

``` js
// Main
ipc.on('ping', (e, data) => {
  console.log('received', data);
  setTimeout(() => {
    const count = data + 1;
    e.sender.send('pong', count);
    console.log('sent', count);
  }, 2000);
});

// -->
// received 1
// sent 2
```

渲染进程：

``` js
// Renderer (Main World)
document.addEventListener('DOMContentLoaded', () => {
  const ipc = window.ipc;
  ipc.send('ping', 1);
  ipc.on('pong', (e, data) => {
    console.log('received', data);
  });
});

// -->
// received 2
```

至此，成功！

完整的例子，参见我的 [Github Demo][3]

## 题外话

`Isolated World` 与 `Main World`？

ELectron 官方把预加载 js 中的环境称为 `Isolated World`，而把渲染进程中普通 js 中的环境称为 `Main World`，个人揣测是因为其实现方式，预加载 js 的实现方式其实就是将这个文件当作浏览器插件的形式插入到渲染进程的渲染窗口，所以渲染进程中普通 js 为“主”，预加载 js 为“辅”，有了以上称谓。

[1]: (https://www.electronjs.org/zh/docs/latest/tutorial/security#checklist-security-recommendations)
[2]: (https://www.electronjs.org/zh/docs/latest/api/context-bridge)
[3]: (https://github.com/yuhenabc/demo-electron-commutication)