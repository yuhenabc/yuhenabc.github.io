title: corepack
category: 探索发现
tags: nodejs
---

在我的 Mac 电脑上运行以下命令：

```bash
➜ which npm
/usr/local/opt/node@18/bin/npm
➜ which yarn
/usr/local/bin/yarn
➜ which pnpm
/usr/local/bin/pnpm
```

```bash
➜ ls -l /usr/local/opt/node@18/bin
lrwxr-xr-x ... corepack -> ../lib/node_modules/corepack/dist/corepack.js
-r-xr-xr-x ... node
lrwxr-xr-x ... npm -> ../lib/node_modules/npm/bin/npm-cli.js
lrwxr-xr-x ... npx -> ../lib/node_modules/npm/bin/npx-cli.js
```

那是因为我的 yarn 和 pnpm 版本是固定的，反而 node 会因项目而切换版本

最近，遇到一个 pnpm 项目，它的 `package.json` 中有这么一行：

```json
{
  "packageManager": "pnpm@9.1.0"
}
```

随意运行一个用户脚本 —— `pnpm dev`，得到：

```text
ERR_PNPM_BAD_PM_VERSION  This project is configured to use v9.1.0 of pnpm. Your current pnpm is v9.1.2

If you want to bypass this version check, you can set the "package-manager-strict" configuration to "false" or set the "COREPACK_ENABLE_STRICT" environment variable to "0"
```

是说，项目配置的 pnpm 版本是 v9.1.0，但当前版本是 v9.1.2，解决办法之一是关闭严格版本检查，但是今天讨论开启 corepack 来解决：

```bash
corepack enable
```

开启 corepack 之后，我的三个包管理工具的位置变成了：

```bash
➜ which npm
/usr/local/opt/node@18/bin/npm
➜ which yarn
/usr/local/opt/node@18/bin/yarn
➜ which pnpm
/usr/local/opt/node@18/bin/pnpm
```

仔细一看：

```bash
➜ ls -l /usr/local/opt/node@18/bin
lrwxr-xr-x ... corepack -> ../lib/node_modules/corepack/dist/corepack.js
-r-xr-xr-x ... node
lrwxr-xr-x ... npm -> ../lib/node_modules/npm/bin/npm-cli.js
lrwxr-xr-x ... npx -> ../lib/node_modules/npm/bin/npx-cli.js
lrwxr-xr-x ... pnpm -> ../lib/node_modules/corepack/dist/pnpm.js
lrwxr-xr-x ... pnpx -> ../lib/node_modules/corepack/dist/pnpx.js
lrwxr-xr-x ... yarn -> ../lib/node_modules/corepack/dist/yarn.js
lrwxr-xr-x ... yarnpkg -> ../lib/node_modules/corepack/dist/yarnpkg.js
```