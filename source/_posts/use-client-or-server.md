title: "\"use-client\" 和 \"use server\" 的使用场景"
date: 2024-11-25 22:53:11
category: 知识备忘
tags: react

---

在现代前端开发中，特别是在使用 Solid.js 和 Next.js 这样的框架时，`"use server"` 和 `"use client"` 指令用于明确区分服务器端和客户端的代码执行上下文。这些指令帮助开发者更好地管理应用的性能、安全性和用户体验。以下是这两个指令的具体使用场景和详细解释。

### use client

**用途**: 明确指定某个模块或组件仅在客户端执行。

**使用场景**:

- **交互性组件**: 需要直接与用户进行交互的组件，如表单、按钮点击事件等。
- **浏览器特定 API**: 使用浏览器特有的 API，如 `window`, `document`, `localStorage` 等。
- **状态管理**: 使用 React 的状态管理钩子（如 `useState`, `useReducer`）。
- **第三方库**: 使用依赖于浏览器环境的第三方库。
- **动画和过渡效果**: 使用需要浏览器渲染的动画和过渡效果。

**示例**:

```tsx
// MyComponent.client.tsx
'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### use server

**用途**: 明确指定某个模块或组件仅在服务器端执行。

**使用场景**:

- **数据获取**: 在服务器端进行数据获取，减少客户端的数据传输量。
- **敏感操作**: 执行涉及敏感信息的操作，如数据库查询、身份验证等。
- **计算密集型任务**: 进行复杂的计算或处理大量数据，避免阻塞客户端主线程。
- **API 调用**: 直接调用后端 API 或服务，提高安全性。
- **缓存控制**: 控制服务器端缓存策略，优化响应速度。

**示例**:

```tsx
// fetchData.server.ts
'use server';

export async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

### 结合使用 use client 和 use server

在实际项目中，通常会结合使用这两个指令来优化应用性能和安全性。

**示例**:

```tsx
// Page.tsx
'use client';

import { useEffect, useState } from 'react';
import fetchData from './fetchData.server';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    getData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from Server:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### 总结

- **use client**: 适用于需要在客户端运行的交互式组件、状态管理和浏览器特定功能。
- **use server**: 适用于需要在服务器端运行的数据获取、敏感操作和计算密集型任务。

通过合理使用 `use client` 和 `use server`，你可以更好地控制代码的执行环境，提升应用的性能和安全性。以下是一些额外的注意事项：

- **文件命名约定**: 在 Next.js 中，通常将客户端组件命名为 `.client.tsx` 或 `.client.jsx`，服务器端函数命名为 `.server.ts` 或 `.server.js`。这有助于清晰地标识每个文件的作用域。
- **代码分割**: 通过合理的代码分割，确保只有必要的代码在客户端加载和执行，从而优化首屏加载时间。
- **安全性**: 将敏感操作放在服务器端执行，防止泄露敏感信息或遭受攻击。
