title: Typescript 泛型的定义和使用范围
date: 2024-04-01 09:29:31
category: 知识备忘
tags: typescript

---

在 TypeScript 中，你可以在定义类型时使用泛型。泛型允许你创建可重用的类型定义，这些类型定义可以根据传入的类型参数进行调整。这使得类型定义更加灵活和强大。

### 泛型类型定义

#### 1. 基本语法

你可以使用 `<T>`（或其他任何标识符）来定义泛型类型参数。例如：

```typescript
type Box<T> = {
  value: T;
};

const boxNumber: Box<number> = { value: 42 };
const boxString: Box<string> = { value: 'hello' };
```

在这个例子中，`Box<T>` 是一个泛型类型，`T` 是类型参数。你可以根据需要传入不同的类型参数来创建不同类型的 `Box`。

#### 2. 多个类型参数

你可以在一个类型定义中使用多个类型参数：

```typescript
type Pair<T, U> = {
  first: T;
  second: U;
};

const pair1: Pair<number, string> = { first: 42, second: 'hello' };
const pair2: Pair<string, boolean> = { first: 'world', second: true };
```

#### 3. 泛型约束

你可以使用 `extends` 关键字来约束泛型参数，确保它们满足某些条件。例如，你可以约束泛型参数必须具有某个属性：

```typescript
type HasId<T extends { id: number }> = T & { name: string };

const obj1: HasId<{ id: number; age: number }> = {
  id: 1,
  age: 30,
  name: 'Alice'
};
// const obj2: HasId<{ age: number }> = { age: 30, name: 'Bob' }; // 错误：缺少 id 属性
```

在这个例子中，`HasId<T>` 要求 `T` 必须包含 `id` 属性。

#### 4. 默认类型参数

你可以为泛型参数提供默认类型，这样在没有显式指定类型参数时会使用默认类型：

```typescript
type Container<T = string> = {
  value: T;
};

const container1: Container = { value: 'default' }; // 使用默认类型 string
const container2: Container<number> = { value: 42 }; // 显式指定类型 number
```

### 泛型函数

你也可以在函数中使用泛型，使得函数可以处理多种类型的参数：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>('hello');
```

### 泛型接口

你还可以在接口中使用泛型：

```typescript
interface Box<T> {
  value: T;
}

const boxNumber: Box<number> = { value: 42 };
const boxString: Box<string> = { value: 'hello' };
```

### 泛型类

在类中使用泛型也很常见，特别是在实现泛型容器类时：

```typescript
class Box<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const boxNumber = new Box<number>(42);
const boxString = new Box<string>('hello');

console.log(boxNumber.getValue()); // 42
console.log(boxString.getValue()); // hello
```

### 总结

通过使用泛型，你可以创建更加灵活和可重用的类型定义。泛型允许你在定义类型、函数、接口和类时使用类型参数，从而根据不同的需求调整类型。
