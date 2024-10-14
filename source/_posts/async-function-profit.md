title: async 函数哪些地方优于 Promise？
date: 2024-02-14 21:14:11
category: 原创讨论
tags: js

---

`async` 函数是 JavaScript 中处理异步操作的一种高级语法糖，它基于 `Promise`，但提供了更简洁和易读的语法。以下是我在工作过程中总结的 `async` 函数相对于 `Promise` 的一些优势：

## 1. 串联地执行多个异步操作

```js
async function getArticleList() {
  const articles = []
  let i = 0
  while (i++ < 100) {
    // 假设为了减轻服务端并行压力，接口要依次请求
    articles.push(await axios.get({'/api/article', params: { id: i }}))
  }
  return articles
}
```

## 2. 多个异步操作统一 catch

```js
async function doSomething() {
  try {
    const response1 = await fetch(url1); // 1
    const data1 = await response1.json(); // 2

    const response2 = await fetch(url2); // 3
    const data2 = await response2.json(); // 4

    console.log(data1, data2);
  } catch (error) {
    // 这里将 1～4 四处可能产生的异常统一处理
    console.error('Error:', error);
  }
}
```

## 3. 结合 switch 将多个异或关系的异步操作的 then 集中在一处

```ts
const mode: ref<'create' | 'update'>;

const handleFormConfirm = async (form) => {
  switch (mode.value) {
    case 'create':
      await createCreature(form);
      break;
    case 'update':
      await updateCreature(form);
      break;
  }
  // 这里相当于 createCreature 或 updateCreature 共同的 then
};
```

以上就是我总结的一些特殊案例，如果使用 Promise，几乎难以达到同样目的同时代码仍简洁易读。大家还能想到哪些？欢迎补充！
