title: Hexo 常用命令
date: 2024-01-14 08:51:16
category: 知识备忘
tags: tools
---


Hexo 是一个快速、简单且功能强大的博客框架，使用 Node.js 编写。以下是一些常用的 Hexo 命令，帮助你管理和发布你的博客。

### 1. 初始化新博客

```sh
hexo init <folder>
cd <folder>
npm install
```

- `hexo init <folder>`：在指定的文件夹中初始化一个新的 Hexo 博客。
- `cd <folder>`：进入初始化的文件夹。
- `npm install`：安装 Hexo 及其依赖。

### 2. 生成静态文件

```sh
hexo generate
```

- `hexo generate`：生成静态文件到 `public` 目录。

### 3. 启动本地服务器

```sh
hexo server
```

- `hexo server`：启动本地服务器，默认地址为 `http://localhost:4000`。
- 你可以使用 `--port` 参数指定端口，例如 `hexo server --port 4001`。

### 4. 清空缓存

```sh
hexo clean
```

- `hexo clean`：清空 `public` 和 `database` 文件夹，通常在生成新的静态文件之前使用。

### 5. 发布文章

#### 新建文章

```sh
hexo new "My New Post"
```

- `hexo new "My New Post"`：创建一篇新文章，文件保存在 `source/_posts` 目录下。

#### 新建草稿

```sh
hexo new draft "My Draft"
```

- `hexo new draft "My Draft"`：创建一篇新草稿，文件保存在 `source/_drafts` 目录下。

#### 列出文章 & 草稿

```sh
hexo list post
```

#### 发布草稿

```sh
hexo publish "My Draft"
```

- `hexo publish "My Draft"`：将草稿发布为文章，移动到 `source/_posts` 目录下。

### 6. 部署博客

```sh
hexo deploy
```

- `hexo deploy`：将生成的静态文件部署到配置的远程仓库或服务器。部署配置在 `_config.yml` 文件中。

### 7. 查看帮助

```sh
hexo help
```

- `hexo help`：显示所有可用的 Hexo 命令及其简要说明。

### 8. 更新 Hexo

```sh
npm update hexo -g
```

- `npm update hexo -g`：全局更新 Hexo 到最新版本。

### 9. 安装插件

```sh
npm install <plugin-name> --save
```

- `npm install <plugin-name> --save`：安装指定的 Hexo 插件，并将其添加到 `package.json` 文件中。

### 10. 卸载插件

```sh
npm uninstall <plugin-name> --save
```

- `npm uninstall <plugin-name> --save`：卸载指定的 Hexo 插件，并从 `package.json` 文件中移除。

### 11. 生成并部署

```sh
hexo generate --deploy
```

- `hexo generate --deploy`：生成静态文件并立即部署。

### 12. 生成并启动服务器

```sh
hexo generate --server
```

- `hexo generate --server`：生成静态文件并启动本地服务器。

### 13. 生成并清理缓存

```sh
hexo clean --generate
```

- `hexo clean --generate`：清空缓存并生成静态文件。

### 14. 查看版本

```sh
hexo version
```

- `hexo version`：查看当前安装的 Hexo 及其依赖的版本信息。

### 总结

这些命令涵盖了 Hexo 的基本操作。通过这些命令，你可以轻松地管理和维护你的 Hexo 博客。
