title: Typescript 中 Type 和 Interface 的区别
date: 2024-04-30 18:58:59
category: 知识备忘
tags: typescript

---

在 TypeScript 中，`interface` 和 `type` 都可以用来定义类型，但它们有一些关键的区别。了解这些区别有助于你在不同的场景中选择合适的方式。

### 1. 基本语法

#### Interface

```typescript
interface Person {
  name: string;
  age: number;
}
```

#### Type

```typescript
type Person = {
  name: string;
  age: number;
};
```

### 2. 扩展和合并

#### Interface

`interface` 支持声明合并，即多个同名的 `interface` 会自动合并成一个。

```typescript
interface Person {
  name: string;
}

interface Person {
  age: number;
}

// 等价于
interface Person {
  name: string;
  age: number;
}
```

#### Type

`type` 不支持声明合并。如果你尝试定义多个同名的 `type`，编译器会报错。

```typescript
type Person = {
  name: string;
};

// 编译错误：Duplicate identifier 'Person'.
type Person = {
  age: number;
};
```

### 3. 继承和交叉类型

#### Interface

`interface` 可以继承其他 `interface`，支持多重继承。

```typescript
interface Named {
  name: string;
}

interface Person extends Named {
  age: number;
}

const p: Person = { name: 'Alice', age: 30 };
```

#### Type

`type` 可以使用交叉类型 (`&`) 来模拟继承。

```typescript
type Named = {
  name: string;
};

type Person = Named & {
  age: number;
};

const p: Person = { name: 'Alice', age: 30 };
```

### 4. 泛型

#### Interface

`interface` 可以定义泛型。

```typescript
interface Box<T> {
  value: T;
}

const box: Box<number> = { value: 42 };
```

#### Type

`type` 也可以定义泛型。

```typescript
type Box<T> = {
  value: T;
};

const box: Box<number> = { value: 42 };
```

### 5. 联合类型和元组

#### Type

`type` 更适合定义联合类型和元组。

```typescript
type Message = string | number;

type Coordinates = [number, number];
```

### 6. 计算属性和映射类型

#### Type

`type` 支持计算属性和映射类型，这在某些高级类型操作中非常有用。

```typescript
type EventHandlers = {
  [K in 'onOpen' | 'onClose']: () => void;
};

const handlers: EventHandlers = {
  onOpen: () => console.log('Opened'),
  onClose: () => console.log('Closed')
};
```

### 7. 枚举和命名空间

#### Interface

`interface` 不能直接用于枚举和命名空间。

#### Type

`type` 也不能直接用于枚举和命名空间，但可以用于定义枚举和命名空间中的类型。

```typescript
enum Status {
  Open,
  Closed
}

type StatusType = keyof typeof Status;
```

### 总结

- **Interface**：
  - 支持声明合并。
  - 支持继承。
  - 适用于定义对象形状和接口。
- **Type**：
  - 不支持声明合并。
  - 适用于定义联合类型、元组、计算属性和映射类型。
  - 适用于更复杂的类型操作。

通过了解这些区别，你可以根据具体的需求选择合适的类型定义方式。
