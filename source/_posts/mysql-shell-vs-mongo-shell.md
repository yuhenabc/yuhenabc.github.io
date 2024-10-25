title: MySQL 8.0 和 MongoDB 在 NoSQL 方面的差异对比
date: 2024-08-02 22:51:45
category: 探索发现
tags: database

---

MySQL 8.0 开始也支持 NoSQL 了，那么和 MongoDB 相比较，体验是否一样呢？让我们来看一看！

### MySQL 8.0 (使用 MySQL Shell 和 X DevAPI)

#### 1. 创建 Schema

```sh
mysqlsh --uri user@host:33060 --mysqlx
```

```javascript
// 创建一个新的 schema
var demo = session.createSchema('demo');
```

#### 2. 创建 Collection

```javascript
// 创建一个新的 collection
var users = demo.createCollection('users');
```

#### 3. 创建 Document

```javascript
// 插入文档
users
  .add([
    { _id: '1', name: 'John Doe', age: 30 },
    { _id: '2', name: 'Jane Smith', age: 25 }
  ])
  .execute();
```

#### 4. 更新 Document

```javascript
// 更新文档
users.modify('_id = :id').set('age', 31).bind('id', '1').execute();
```

#### 5. 删除 Document

```javascript
// 删除文档
users.remove('_id = :id').bind('id', '1').execute();
```

#### 6. 查询 Document

```javascript
// 查询文档
var result = users.find().execute();
var docs = result.fetchAll();
print(JSON.stringify(docs, null, 2));
```

### MongoDB (使用 Mongo Shell)

#### 1. 连接到 MongoDB 服务器

```sh
mongosh "mongodb://user:password@host:27017"
```

#### 2. 创建 Database (Schema)

在 MongoDB 中，数据库在第一次插入数据时自动创建。

```javascript
use demo;
```

#### 3. 创建 Collection

在 MongoDB 中，集合在第一次插入数据时自动创建。

```javascript
db.createCollection('users');
```

#### 4. 创建 Document

```javascript
// 插入文档
db.users.insertMany([
  { _id: '1', name: 'John Doe', age: 30 },
  { _id: '2', name: 'Jane Smith', age: 25 }
]);
```

#### 5. 更新 Document

```javascript
// 更新文档
db.users.updateOne({ _id: '1' }, { $set: { age: 31 } });
```

#### 6. 删除 Document

```javascript
// 删除文档
db.users.deleteOne({ _id: '1' });
```

#### 7. 查询 Document

```javascript
// 查询文档
var docs = db.users.find().toArray();
printjson(docs);
```

当然，以上这些操作都可以以编程的方式实现，下面是使用 JavaScript 实现的例子：

### MySQL 8.0 (使用 X DevAPI)

首先，确保你已经安装了 `@mysql/xdevapi` 包：

```sh
npm install @mysql/xdevapi
```

然后，编写以下代码：

```javascript
const mysqlx = require('@mysql/xdevapi');

async function main() {
  try {
    // 连接到 MySQL 服务器
    const session = await mysqlx.getSession({
      host: 'localhost',
      port: 33060,
      user: 'user',
      password: 'password'
    });

    // 创建一个新的 schema
    const schema = session.getSchema('demo');
    if (!(await schema.existsInDatabase())) {
      await session.dropSchema('demo');
      await session.createSchema('demo');
    }

    // 创建一个新的 collection
    const collection = schema.getCollection('users');
    if (!(await collection.existsInDatabase())) {
      await schema.createCollection('users');
    }

    // 插入文档
    await collection
      .add([
        { _id: '1', name: 'John Doe', age: 30 },
        { _id: '2', name: 'Jane Smith', age: 25 }
      ])
      .execute();

    // 查询文档
    const result = await collection.find().execute();
    const docs = await result.fetchAll();
    console.log('Inserted Documents:', JSON.stringify(docs, null, 2));

    // 更新文档
    await collection
      .modify('_id = :id')
      .set('age', 31)
      .bind('id', '1')
      .execute();

    // 再次查询文档以验证更新
    const updatedResult = await collection.find().execute();
    const updatedDocs = await updatedResult.fetchAll();
    console.log('Updated Documents:', JSON.stringify(updatedDocs, null, 2));

    // 删除文档
    await collection.remove('_id = :id').bind('id', '1').execute();

    // 再次查询文档以验证删除
    const finalResult = await collection.find().execute();
    const finalDocs = await finalResult.fetchAll();
    console.log('Final Documents:', JSON.stringify(finalDocs, null, 2));

    // 关闭会话
    await session.close();
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
```

### MongoDB (使用 MongoDB Node.js Driver)

首先，确保你已经安装了 `mongodb` 包：

```sh
npm install mongodb
```

然后，编写以下代码：

```javascript
const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://user:password@host:27017';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    // 连接到 MongoDB 服务器
    await client.connect();

    // 选择数据库
    const database = client.db('demo');
    const collection = database.collection('users');

    // 插入文档
    const insertResult = await collection.insertMany([
      { _id: '1', name: 'John Doe', age: 30 },
      { _id: '2', name: 'Jane Smith', age: 25 }
    ]);
    console.log('Inserted Documents:', insertResult.ops);

    // 查询文档
    const docs = await collection.find().toArray();
    console.log('Inserted Documents:', JSON.stringify(docs, null, 2));

    // 更新文档
    const updateResult = await collection.updateOne(
      { _id: '1' },
      { $set: { age: 31 } }
    );
    console.log('Updated Document:', updateResult);

    // 再次查询文档以验证更新
    const updatedDocs = await collection.find().toArray();
    console.log('Updated Documents:', JSON.stringify(updatedDocs, null, 2));

    // 删除文档
    const deleteResult = await collection.deleteOne({ _id: '1' });
    console.log('Deleted Document:', deleteResult);

    // 再次查询文档以验证删除
    const finalDocs = await collection.find().toArray();
    console.log('Final Documents:', JSON.stringify(finalDocs, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // 关闭连接
    await client.close();
  }
}

main();
```

### 对比总结

##### 1. **创建文档**：

- **MySQL**：使用 `add` 方法插入文档。
- **MongoDB**：使用 `insertMany` 方法插入多个文档，或 `insertOne` 方法插入单个文档。

##### 2. **更新文档**：

- **MySQL**：使用 `modify` 和 `set` 方法更新文档。
- **MongoDB**：使用 `updateOne` 方法更新文档。

##### 3. **删除文档**：

- **MySQL**：使用 `remove` 方法删除文档。
- **MongoDB**：使用 `deleteOne` 方法删除文档。

##### 4. **查询文档**：

- **MySQL**：使用 `find` 方法查询文档，并通过 `fetchAll` 获取结果。
- **MongoDB**：使用 `find` 方法查询文档，并通过 `toArray` 获取结果。

希望这些示例和对比能帮助你更好地理解 MySQL 8.0 和 MongoDB 在 NoSQL 操作上的不同。
