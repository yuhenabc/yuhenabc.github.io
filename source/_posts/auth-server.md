title: 实现一个最简单的单点登录（SSO）系统
date: 2024-06-18 21:54:45
category: 探索发现
tags: nodejs

---

一个最简单的单点登录（SSO）系统，包括认证中心（auth-server）、登录页（login-page）、资源服务端（resource-erver）和客户端（sso-client）四个部分，以下是详细的实现步骤。

### 1. 认证中心（Auth Server）

认证中心负责用户认证，并在成功认证后生成一个 JWT token。

#### 安装依赖

```sh
mkdir auth-server
cd auth-server
npm init -y
npm install express jsonwebtoken
```

#### `auth-server/index.js`

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3001;

app.use(express.json());

const users = {
  user1: 'password1',
  user2: 'password2'
};

const secretKey = 'your-secret-key'; // 请使用环境变量或安全存储

const generateToken = (username) => {
  return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] === password) {
    const token = generateToken(username);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      res.json({ success: true, user: decoded.username });
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ success: false, message: 'No token found' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server listening on port ${PORT}`);
});
```

### 2. 登录页（React）

登录页负责用户输入用户名和密码，并发送请求到认证中心进行认证。

#### 安装依赖

```sh
npx create-react-app login-page
cd login-page
npm install axios
```

#### `login-page/src/App.js`

```javascript
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        window.location.href = '/client'; // 重定向到客户端
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;
```

### 3. 资源服务端（Resource Server）

资源服务端负责验证 JWT token，并提供受保护的资源。

#### 安装依赖

```sh
mkdir resource-server
cd resource-server
npm init -y
npm install express jsonwebtoken
```

#### `resource-server/index.js`

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3002;

app.use(express.json());

const secretKey = 'your-secret-key'; // 请使用环境变量或安全存储

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.username;
  } catch (error) {
    return null;
  }
};

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = validateToken(token);
  if (user) {
    res.json({ message: 'This is protected data', user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.listen(PORT, () => {
  console.log(`Resource server listening on port ${PORT}`);
});
```

### 4. 客户端（React）

客户端负责展示受保护的资源，并处理用户登录状态。

#### 安装依赖

```sh
npx create-react-app sso-client
cd sso-client
npm install axios
```

#### `sso-client/src/App.js`

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [protectedData, setProtectedData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleFetchProtectedData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/protected');
      setProtectedData(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch protected data');
    }
  };

  return (
    <div>
      <h1>SSO Client</h1>
      <div>
        <button onClick={handleFetchProtectedData}>Fetch Protected Data</button>
        {protectedData && (
          <div>
            <h2>Protected Data</h2>
            <pre>{JSON.stringify(protectedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

### 运行项目

##### 1. **启动认证中心**：

   ```sh
   cd auth-server
   node index.js
   ```

##### 2. **启动资源服务端**：

   ```sh
   cd resource-server
   node index.js
   ```

##### 3. **启动登录页**：

   ```sh
   cd login-page
   npm start
   ```

##### 4. **启动客户端**：

   ```sh
   cd sso-client
   npm start
   ```

### 测试

1. 打开浏览器，访问 `http://localhost:3000`（登录页）。
2. 输入用户名和密码（例如 `user1` 和 `password1`），点击登录。
3. 登录成功后，页面会重定向到 `http://localhost:3003`（客户端）。
4. 在客户端页面，点击“Fetch Protected Data”按钮，查看受保护的数据。

### 总结

这个示例展示了如何使用 Node.js 和 Express 实现一个简单的单点登录系统，包括认证中心、登录页、资源服务端和客户端。认证中心负责用户认证并生成 JWT token，资源服务端验证 JWT token 并提供受保护的资源，登录页和客户端分别负责用户登录和展示受保护的资源。按照最常见的情况， token 存储在 `localStorage` 中，并在发送请求时包含在 HTTP 头中。希望这个示例能帮助你理解 SSO 的基本原理和实现方法。
