title: 让我们的 npm 包同时支持 CommonJS 和 ES modules
date: 2024-03-11 12:53:29
category: 知识备忘
tags: nodejs
---


随着 JavaScript 生态系统的不断发展，ES Modules (ESM) 已经逐渐成为现代 JavaScript 项目的标准模块系统。然而，许多现有的项目仍然依赖于 CommonJS (CJS) 模块系统。为了确保我们的 npm 包能够兼容这两种模块系统，我们需要进行一些配置和代码调整。

本文将详细介绍如何让你的 npm 包同时支持 CommonJS 和 ES Modules。

## 1. 项目结构

首先，让我们来看一下项目的初始结构：

```
my-package/
├── dist/
│   ├── index.cjs
│   ├── index.mjs
├── package.json
├── .gitignore
├── README.md
```

- `dist/index.cjs`：CommonJS 版本的入口文件。
- `dist/index.mjs`：ES Modules 版本的入口文件。
- `package.json`：项目的配置文件。

## 2. 编写代码

### 2.1 CommonJS 版本

在 `dist/index.cjs` 中编写 CommonJS 版本的代码：

```javascript
// dist/index.cjs
module.exports = {
  greet: function (name) {
    return `Hello, ${name}!`;
  }
};
```

### 2.2 ES Modules 版本

在 `dist/index.mjs` 中编写 ES Modules 版本的代码：

```javascript
// dist/index.mjs
export function greet(name) {
  return `Hello, ${name}!`;
}
```

## 3. 配置 `package.json`

为了让 npm 包同时支持 CommonJS 和 ES Modules，我们需要在 `package.json` 中进行一些配置。

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "A package that supports both CommonJS and ES Modules",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "types": "dist/index.d.ts",
  "files": ["dist/"],
  "dependencies": {},
  "devDependencies": {
    "typescript": "^4.5.0"
  }
}
```

### 3.1 主要配置项

- **`main`**：指定 CommonJS 入口文件。
- **`module`**：指定 ES Modules 入口文件。
- **`type`**：设置为 `"module"`，表示整个包默认使用 ES Modules。
- **`scripts`**：定义构建脚本。
- **`types`**：指定 TypeScript 类型定义文件。
- **`files`**：指定包含在发布的包中的文件。

## 4. 使用 TypeScript 进行编译

为了确保代码的一致性和类型安全性，我们可以使用 TypeScript 进行编译。首先，安装 TypeScript：

```sh
npm install typescript --save-dev
```

然后，创建 `tsconfig.json` 文件：

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

### 4.1 编译命令

在 `package.json` 中添加构建脚本：

```json
{
  "scripts": {
    "build": "tsc",
  }
}
```

运行 `npm run build` 将会编译 TypeScript 代码，并生成 `dist` 目录中的 CommonJS 和 ES Modules 文件。

## 5. 测试

为了确保我们的包在不同的模块系统中都能正常工作，我们可以编写一些测试用例。

### 5.1 CommonJS 测试

```javascript
// test/cjs.test.js
const { greet } = require('../dist/index.cjs');

test('greet function works with CommonJS', () => {
  expect(greet('World')).toBe('Hello, World!');
});
```

### 5.2 ES Modules 测试

```javascript
// test/esm.test.mjs
import { greet } from '../dist/index.mjs';

test('greet function works with ES Modules', () => {
  expect(greet('World')).toBe('Hello, World!');
});
```

### 5.3 运行测试

安装测试框架，例如 Jest：

```sh
npm install jest --save-dev
```

在 `package.json` 中添加测试脚本：

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

运行测试：

```sh
npm test
```

## 6. 发布

确保你的 `package.json` 文件中包含所有必要的配置，并且 `dist` 目录中的文件已经生成。然后，发布你的包到 npm：

```sh
npm publish
```

## 7. 总结

通过上述步骤，我们成功地让 npm 包同时支持 CommonJS 和 ES Modules。这样做不仅提高了包的兼容性，还确保了未来的可维护性和扩展性。

希望这篇文章对你有所帮助，如果你有任何问题或建议，请随时留言交流！
