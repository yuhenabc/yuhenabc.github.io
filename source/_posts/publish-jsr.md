title: 怎么发布 jsr 包？有哪些注意点？
date: 2024-07-12 10:46:01
tags: deno
category: 动手能力

---

JavaScript Registry (JSR) 是 JavaScript 和 TypeScript 的现代化软件包仓库。JSR 适用于许多运行时（Node.js、Deno、浏览器等），并且向后兼容 npm。

### 那么，怎么发布 jsr 包？

##### 1. 访问官网并使用 Github 授权登录

```txt
官网：https://jsr.io/
```

##### 2. 通过官网新发布一个包，填写 Scope 和 Package name

![](https://static.yuhenabc.com/blog/jsr.png)

##### 3. 在你的项目中配置 jsr.json (或 deno.json)

```json
{
  "name": "@yuhenabc/bar",
  "version": "1.0.0",
  "exports": "./src/bar.ts",
  "publish": {
    "include": ["LICENSE", "README.md", "src/**/*.ts"]
  }
}
```

因为 jsr 包原生只需要 TypeScript 源码，所以这里限制了下发布文件的范围，即：

```json
{
  "publish": {
    "include": ["LICENSE", "README.md", "src/**/*.ts"]
  }
}
```

建议使用 `include` 的方式，包含 `LICENSE`、`README.md` 和 TypeScript 源码就够了。

##### 4. 发布，执行 `npx jsr publish` （或 `deno publish`）

```sh
npx jsr publish
```

中间会有弹出网站并让你授权的过程，你批准后会有以下打印信息：

```txt
Checking for slow types in the public API...
Visit https://jsr.io/auth?code=WPCV-PSLD to authorize publishing of @yuhenabc/bar
Waiting...
Authorization successful. Authenticated as yuhenabc
Publishing @yuhenabc/bar@1.0.0 ...
Successfully published @yuhenabc/bar@1.0.0
Visit https://jsr.io/@yuhenabc/bar@1.0.0 for details

Completed in 25s
```

这样，你的第一个 jsr 包就发布成功了。

### 那么，有哪些注意点？

##### 1. 写好代码注释文档

```ts
/**
 * Search the database with the given query.
 *
 * @param query This is the query to search with. It should be less than 50 chars to ensure good performance.
 * @param limit The number of items to return. If unspecified, defaults to 20.
 * @returns The array of matched items.
 */
export function search(query: string, limit: number = 20): string[];
```

像上面这样，你的源码的每个 `export` 最好包含注释文档，jsr.io 会根据它自动生成一份在线文档供其他开发者阅读。

注意，这是函数、变量级别的文档，和 `README.md` 整体文档没有冲突，将来会分别在不同的地方展示。

##### 2. 配置好包的描述

![](https://static.yuhenabc.com/blog/jsr-settings-description.png)

在 `Settings` 页面，填写包的描述并保存，它可以在搜索结果页面展示，突出包的功能，方便被选中。

##### 3. 配置好支持的环境

![](https://static.yuhenabc.com/blog/jsr-settings-runtime.png)

同样在 `Settings` 页面，填写包的对 Cloudflare Workers、Node.js、Deno、Bun 和 Browsers 的支持情况并保存，可以友好地告诉其他开发者你的包对不同环境的支持程度。

##### 4. 配置好包在 Github 对应的项目

![](https://static.yuhenabc.com/blog/jsr-settings-github.png)

同样在 `Settings` 页面，填写包在 Github 对应的项目，这样可以在将来利用 GitHub Actions 自动的发布到 jsr.io

做到以上几点，可以提高在 `Score` 页面的分数，同时提高在搜索结果中的排名。
