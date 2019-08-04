title: 都什么年代了，Node.js 支持 ES6 模块了吗？
date: 2019-08-04 19:53:14
category: 探索发现
tags: nodejs
---

## 结论

能用，但是有限制：

1. 要加开启实验性功能的参数
2. 脚本必须使用 `.mjs` 作为后缀
3. 一但用了 ES6 模块，就不要想着再用 CommonJs 模块了（不可混用）

## 证明

截止到我写这篇文章，Node.js 的最新版本为 `12.7.0`，先写一段我们以前耳熟能详，现在看起来老眼昏花的代码：

``` javascript
// commonjs/funs.js

exports.a = function a() { return 'a' }
exports.b = function b() { return 'b' }
```
另一个文件，调用上面的模块：

``` javascript
// commonjs/use_funs.js

const funs = require('./funs.js')

console.log(funs.a())
console.log(funs.b())
```

当我们用 `node` 命令执行它的时候，是完全没有问题的：

``` text
~ node commonjs/use_funs.js 
a
b
```

现在换作我们最喜欢的 ES6 模块，实现差不多的代码：

``` javascript
// es6/funs.mjs

export function a() { return 'a' }
export function b() { return 'b' }
```

调用上面的模块：

``` javascript
// es6/use_funs.mjs

import * as funs from './funs.mjs'

console.log(funs.a())
console.log(funs.b())
```

命令行执行：

``` text
~ node --experimental-modules es6/use_funs.mjs
(node:44970) ExperimentalWarning: The ESM module loader is experimental.
a
b
```
注意，`node` 后面的 `--experimental-modules` 参数必须要加，而且文件必须要使用 `.mjs` 后缀，两个条件缺少任意一个都会失败！

## What can we do?

Just wait ...

Or use [Babel](https://babeljs.io) cutely ^_^
