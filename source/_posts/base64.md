title: 字符串 Base64 转码解码
date: 2017-2-8
tags: javascript
---

## 什么是 Base64 ?

我不会说 “Base64是一种基于64个可打印字符来表示二进制数据的表示方法”，因为维基百科就摆在那里。

我想说，Base64 只是一种编码方式而已，和它并列的好基友有：hex、utf8、ascii、binary、ucs2，所以经过它编码后，**仍然包含编码之前的全部信息**。

就这么多。

## 为啥要用 Base64 ？

Base64 的使用场景很多，例如 `<img>`、`<canvas>` 等 HTML 对象可以方便的转成 Base64 字符串，以便传输到服务器，但本文只研究字符串转字符串的情形。

像这句话：

``` text
我很高兴学会用 Base64！
```

转换成 Base64 字符串就是：

``` text
5oiR5b6I6auY5YW05a2m5Lya55SoIEJhc2U2NO+8gQ==
```

字符数明显多了不少，但有一个好处是消除了 Unicode 字符，那么你应该猜到，我们使用 Base64 的目的就是**在读取或传输字符串前将中文字符导致乱码的可能性降低为零**，典型案例：

* cookie 中保存中文信息
* 软件注册码包含授权用户信息

注意，我们的仅仅用它来 “防乱码”，而加密的能力是木有的！

## 如果我只想简单实现，怎么办？

如果是 Node.js 环境，好办，因为它有一个非常有爱的对象 —— Buffer，有了这个对象，啥都不叫事儿：

转码可以这样：

```
new Buffer(str).toString('base64');
```

解码可以这样：

``` javascript
new Buffer(str, 'base64').toString();
```

node v5.10.0 以上 Buffer 还提供了 from 方法：

``` javascript
Buffer.from(str, 'base64').toString();
```

写成一个模块就是：

_base64.js:_

``` javascript
module.exports = {
    encode: function(str) {
        return new Buffer(str).toString('base64');
    },
    decode: function(str) {
        if (typeof Buffer.from === "function") {
            return Buffer.from(str, 'base64').toString();
        } else {
            return new Buffer(str, 'base64').toString();
        }
    }
};

```

测试一下：

_test.js_

``` javascript
var Base64 = require('./base64.js');

console.log(Base64.encode('dankogai'));      // ZGFua29nYWk=
console.log(Base64.encode('小飼弾'));         // 5bCP6aO85by+
console.log(Base64.decode('ZGFua29nYWk='));  // dankogai
console.log(Base64.decode('5bCP6aO85by+'));  // 小飼弾

```

好，Node.js 环境的 Base64 转解码就完美解决了，下面请看浏览器环境下怎么搞？！

有人说 window 对象自带的方法 atob 和 btoa (a for ascii, b for base64) 不就可以吗？

但是，很遗憾该方法不能直接作用于 Unicode 字符串，请参看 [这篇][1] 和 [这篇][2] 文章，所幸网友给出了折衷的办法，类比上边写成对象就是：

``` javascript
var Base64 = {
    encode: function(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    },
    decode: function(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }
};

/* 直接测试 */
console.log(Base64.encode('dankogai'));      // ZGFua29nYWk=
console.log(Base64.encode('小飼弾'));         // 5bCP6aO85by+
console.log(Base64.decode('ZGFua29nYWk='));  // dankogai
console.log(Base64.decode('5bCP6aO85by+'));  // 小飼弾
```

完美？

## 彩蛋

在线 Base64 转解码：

``` text
转码：http://base64online.org/encode/
解码：http://base64online.org/decode/
```

Linux 命令行 Base64 转解码：

``` bash
echo '我很高兴学会用 Base64！' | base64     # 转码
echo '5oiR5b6I6auY5YW05a2m5Lya55SoIEJhc2U2NO+8gQo=' | base64 --decode     # 解码
```

推荐的第三方 Base64 库：

``` text
js-base64：https://www.npmjs.com/package/js-base64
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
[2]: https://developer.mozilla.org/en-US/docs/Web/API/window.btoa#Unicode_Strings
