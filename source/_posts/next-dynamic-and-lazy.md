title: Next 项目中 dynamic 和 lazy 选哪个？
date: 2025-07-09 16:43:04
category: 探索发现
tags: nextjs

---

在 Next.js 项目中，`next/dynamic` 和 React 原生的 `React.lazy()` 都能实现组件的懒加载（或称代码分割），但它们在功能和使用场景上有着关键的区别。简单来说，**`next/dynamic` 是 `React.lazy()` 在 Next.js 环境下的增强版，尤其优化了服务器端渲染 (SSR) 的场景**。

### React.lazy() 和 Suspense

这是 React 提供的核心懒加载机制。

**定义方式：**

```jsx
import React, { lazy, Suspense } from 'react'

// 定义一个懒加载组件
const MyLazyComponent = lazy(() => import('./MyActualComponent'))

function MyPage() {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <MyLazyComponent />
    </Suspense>
  )
}
```

**工作原理：**

- `React.lazy()` 接收一个函数作为参数，该函数必须动态导入一个模块（通常是一个 React 组件）。
- 当 `MyLazyComponent` 被渲染时，它会触发 `import()` 加载对应的 JavaScript chunk。
- 在 chunk 加载完成之前，`Suspense` 组件会渲染其 `fallback` prop 定义的 UI。

**主要特点：**

- **客户端懒加载：** `React.lazy()` 仅在**客户端**工作。这意味着被 `lazy` 包裹的组件，其代码和渲染只会在浏览器端发生。
- **不支持 SSR：** `React.lazy()` 不直接支持服务器端渲染。如果你在服务器端渲染的组件树中使用了 `React.lazy()`，会报错，因为它无法在服务器上“等待”模块的加载。你需要确保这些懒加载组件只在客户端渲染。

### next/dynamic

`next/dynamic` 是 Next.js 对 `React.lazy()` 的一个封装和扩展，它解决了 `React.lazy()` 在 SSR 环境下的局限性，并提供了更多控制选项。

**定义方式：**

```jsx
import dynamic from 'next/dynamic'

// 定义一个动态加载组件
const MyDynamicComponent = dynamic(() => import('../components/MyActualComponent'), {
  loading: () => <div>Loading (from dynamic)...</div>, // 可选：自定义加载组件
  ssr: false, // 可选：控制是否在 SSR 时包含此组件
  // suspense: true // React 18: 可选，内部自动使用 Suspense
})

function MyPage() {
  return (
    // 如果没有设置 suspense: true，仍然需要 Suspense 包裹
    <MyDynamicComponent />
  )
}
```

**工作原理：**

- 它也是基于动态 `import()` 来实现代码分割。
- 它在构建时和运行时都与 Next.js 的 SSR 机制深度集成。

**主要特点：**

- **同时支持客户端和服务器端懒加载（按需）或禁用 SSR：**
  - 默认情况下 (`ssr: true`)，`next/dynamic` 会尝试在服务器端预加载并渲染组件。这对于 SSR 的初始加载性能很重要。
  - 通过设置 `ssr: false`，你可以明确地告诉 Next.js **只在客户端加载和渲染**这个组件。这对于依赖浏览器 `window` 或 `document` 对象的库（如图表库、播放器等）至关重要，因为它们在服务器端执行时会报错。
- **提供 `loading` 选项：** 类似于 `Suspense` 的 `fallback`，你可以通过 `loading` 选项为动态加载的组件指定一个加载状态显示的 React 组件。
- **集成 `Suspense` (可选，React 18+)：** 引入 `suspense: true` 选项后，`next/dynamic` 可以在内部自动包裹 `Suspense`，省去了手动添加 `<Suspense>` 标签的麻烦。`loading` 选项将作为 `Suspense` 的 `fallback`。

---

### 关键区别总结

| 特性             | `React.lazy()`                                  | `next/dynamic`                                                                    |
| :--------------- | :---------------------------------------------- | :-------------------------------------------------------------------------------- |
| **SSR 支持**     | **不支持** (默认只在客户端工作)                 | **支持** (默认 `ssr: true`)，可选择禁用 (`ssr: false`)                            |
| **加载回退 UI**  | 通过 **`<Suspense fallback={...}>`** 提供       | 通过 `loading` 选项或 `suspense: true` 内置                                       |
| **用法位置**     | 可以在任何 React 项目中使用                     | Next.js 特有，与 Next.js SSR 紧密集成                                             |
| **控制粒度**     | 较少，只关注客户端加载                          | 更多，可控制 SSR 行为、自定义加载组件等                                           |
| **典型使用场景** | 仅在客户端渲染的组件，或者在不需要 SSR 的应用中 | **所有 Next.js 项目**，特别是处理依赖浏览器 API 的组件或需要精细控制 SSR 行为时。 |

---

### 何时使用哪个？

在 Next.js 项目中：

**推荐使用 `next/dynamic`：**

- 当你需要懒加载组件时，**几乎总是应该优先考虑 `next/dynamic`**。
- 它提供了对 SSR 的控制，这是 `React.lazy()` 无法做到的。
- 特别是当你的组件**依赖浏览器特有的 API**（如 `window`, `document`, `localStorage` 等）时，你必须使用 `next/dynamic` 并设置 `ssr: false` 来避免在服务器端渲染时出错。
- 它还提供了一个方便的 `loading` 选项来处理加载状态。

**很少直接使用 `React.lazy()`：**

- 在 Next.js 中，你很少会直接使用 `React.lazy()`，因为它没有 `next/dynamic` 提供的 SSR 兼容性和控制能力。
- 如果你在 Next.js 的客户端组件（即 `use client` 的组件）中偶然遇到一个非常简单的客户端懒加载场景，并且你明确知道这个组件永远不需要 SSR，那么理论上你可以使用 `React.lazy()`，但 `next/dynamic` 仍然是更统一和强大的选择。

**结论：** 在 Next.js 应用中，`next/dynamic` 是进行组件懒加载的**首选工具**，它为你提供了必要的控制，以确保你的应用在 SSR 和客户端加载方面都能高效、稳定地运行。
