title: 给公司整理的前端规范
date: 2022-05-17 11:39:18
category: 知识备忘
tags: doc

---
### 一、目录结构规范

普遍地，项目需要有以下几项文件夹或文件：

- `src` - 源代码存放的文件夹
- `package.json` - 包描述文件
- `yarn.lock` - 包管理器 `yarn` 自动生成的版本锁定文件
- `README.md` - 新手上手指南，针对项目的启动命令、环境配置，依赖安装难点等进行描述

其它的目录结构，按照生成项目时使用的脚手架自行决定，推荐的脚手架：

| 框架 | 脚手架 | 创建命令 | 官网 |
|--|--|--|--|
| React | create-react-app | `yarn create react-app my-app` | https://create-react-app.dev/ |
| Vue2 | vue-cli-service | `vue create my-app` | https://cli.vuejs.org/ |
| Vue3 | vite | `yarn create vite my-app` | https://vitejs.dev/ |

在 `src` 目录下，如果脚手架自带的子目录不够使用，可以自己开辟，常见的子目录名称及用法：

- `utils` - 存放工具类函数集合的文件夹
- `emnus` - 存放枚举型变量集合的文件夹
- `assets` / `static` - 存放图片、音视频等静态资源的文件夹
- `components` - 存放全局公共组件的文件夹
- `views` / `pages` - 存放页面级别的业务组件的文件夹

注意：脚手架生成项目完毕，不建议使用 `eject` 等命令将原始构建脚本暴露，因为这样的操作是不可逆的，不方便将来项目对脚手架的升级。如需对 `webpack` 等底层工具进行自定义配置，应该采用脚手架建议的方式去拓展或重写，参考各个脚手架的官方文档。

环境配置，尽量使用 `.env` 文件家族来定义因环境不同而产生的变量，比如 API 访问地址等。

不同环境下的文件命名：

- `development` - 开发环境，可用 `.env.development`、`.env.development.local` 等文件配置环境变量，其中后者仅当前开发者保有，不同步到 Git 代码仓库
- `test` - 测试环境，可用 `.env.test`、`.env.test.local` 等文件配置环境变量
- `production` - 生产环境，可用 `.env.production`、`.env.production.local` 等文件配置环境变量

### 二、文件命名规范

JS：

- 单个单词小写，多个单词小驼峰命名法（lowerCamelCase）命名，如：`routes.js`、`taskMap.js`

React：

- 扩展名用 `.jsx` 作为组件扩展名，但框架如 Next.js 不支持除外。
- 组件命名，采用大驼峰命名法（UpperCamelCase）命名，也可以将文件夹名作为组件名，根组件用 `index.jsx` 命名，如 `TodoList.jsx`、`TodoList/index.jsx`。
- 组件名应该倾向于完整单词而不是缩写，这一点跟 Vue 一样。

Vue：

- 组件名应该始终是多个单词的，这样做可以避免跟现有的以及未来的 HTML 元素相冲突。
- 单文件组件的命名，应采用大驼峰命名法（UpperCamelCase）命名，如 `TodoList.vue`。
- 组件名应该倾向于完整单词而不是缩写，比如 `UserProfileOptions.vue` 不要缩短成 `UProfOpts.vue`。

### 三、变量命名规范

JS：

- 变量声明，使用 `const` 或 `let`，不要使用 `var`。
- 方法名、参数名、成员变量、局部变量命名，采用小写开头的单词或小驼峰命名法（lowerCamelCase）命名，其中 `Boolean` 类型的变量一般要以 `is` 或 `has` 开头，方法名采用 `动词 + 名词` 的动宾形式，如 `toNum`、`onClick` 和 `handleClick`，不要采用动词修饰名词的形式，如 `clickHandler`。
- 类名和构造函数名，采用大写开头的单词或大驼峰命名法（UpperCamelCase）命名
- 不要使用 `that` 或 `_this` 等指代 `this` 变量，而应该寻求使用箭头函数等避免改变 `this` 指向的途径解决。

React：

- 组件 props 名，采用小驼峰命名法（lowerCamelCase）命名，如 `maxLines`、`beginTime`。

Vue：

- 组件 props 名，定义 props 时采用小驼峰命名法（lowerCamelCase），给组件设置 props 时采用串式命名法（kebab-case），如：`props: { greetingText: String }` 定义，`<some-component greating-text="hello"></some-component>` 使用。
- 始终使用 `:`、`@` 和 `#` 等指令缩写代替 `v-bind:`、`v-on:` 和 `v-slot:`。
- 组件名，引入时保持和文件名一致，如 `import MyComponent from './MyComponent.vue'`，使用时最好采用成对的串式命名法（kebab-case）使用，如 `<my-component></my-component>`

CSS：

- 类名如果是多个单词，采用串式命名法（kebab-case），如 `.card-body`

### 四、版本命名规范

前端项目如果有版本发布需求，命名应当参照 npm 官方的命名规范——[semver](https://semver.org/)，即三位数字加上短横线再加自定义部分：`<数字>.<数字>.<数字>-<自定义>.<自定义2>`，按照项目的迭代进度，分为开发版、测试版、线上预览版、试验版和正式版，我们分别采用不同的标识去加以区分，其中正式版不需要标识：

| 版本 | 标识 | 示例 | 说明 |
|--|--|--|--|
| 开发版 | dev | `1.0.0-dev.12` | 该版本用于开发人员打包自测，验证当次的开发迭代是否会对打包流程造成影响 |
| 测试版 | alpha | `1.0.0-alpha.20` | 该版本用于交付测试人员，每次构建都应该升级最末端的小版本号，如 `alpha.20` -> `alpha.21` |
| 线上预览版 | beta | `1.0.0-beta.4` | 该版本使用独立的版本标识，但连接线上的服务器接口，用于测试人员回归测试 |
| 试验版 | canary | `1.0.0-canary.1` | 该版本只对少数终端用户可用，如果新的功能或新的设计没有被很好地接受，那么很容易回滚。 |
| 正式版 | 无 | `1.0.0` | 该版本可以交付给最终用户 |

### 五、代码格式规范

统一使用 [Prettier](https://prettier.io/)，这是一个大部分代码编辑器都支持的格式化工具。

- 在对象，数组括号与文字之间加空格，如 `{ foo: bar }`
- 箭头函数参数只有一个时是否省略小括号，如 `(x) => {}` 省略为 `x => {}`，不要省略
- 超过 120 列换行
- 行末不留分号
- 行结尾模式 LF（Linux 模式）
- 使用单引号
- Tab 键宽度设为 2
- 在对象或数组最后一个元素后面加逗号
- 不读取 `.editorConfig` 作为格式化依据
- 使用空格代替制表符缩进
- JSX 把 `>` 单独放一行
- JSX 中使用单引号代替双引号
- Vue `<script>` 和 `<style>` 标签不要整体缩进

想要做到以上这些，只需要往项目根目录中加入 `.prettierrc` 文件，并且确保编辑器读取文件并且生效，如果使用的是 VS Code 编辑器，则会自动生效。文件内容如下：

``` json
{
  "printWidth": 120,
  "arrowParens": "always",
  "bracketSpacing": true,
  "semi": false,
  "endOfLine": "lf",
  "jsxBracketSameLine": true,
  "jsxSingleQuote": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useEditorConfig": false,
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "withNodeModules": false
}
```

之后就可以使用编辑器的快捷键进行格式化了。

### 六、编程规范

编程规范一般指的是模式、语法上的规范，目前比较统一可靠的工具是 [ESLint](https://eslint.org/)。

ESLint 不限定于特定的编码规则，用户也可以自由地启用或禁用各个编码规则，它是一个可高度定制工具。用户可以通过定义原始规则来灵活地设置自己的编码标准。

前面提到的脚手架，其实在初始化的时候就可以选择自动安装 eslint 依赖，并且生成配置文件；如果初始化项目时并未选择 eslint，可以使用命令 `npx eslint --init` 根据提示生成配置文件，并且向 `package.json` 添加用户命令：

``` json
"scripts": {
  "lint": "eslint src"
}
```

之后每次使用 `yarn eslint` 进行代码校验。

常见的配置文件格式如下：

``` js
// .eslintrc.js

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {},
}
```

其中，`extends` 字段表示继承自哪一套或哪几套规则合集，我们一般使用脚手架设定好的就可以，后期公司可以出一套自己的规则，届时本文档会做相应的修改。

ESLint 是由一系列的规则组合起来的，有些规则是代码格式规则，这一点和 Prettier 重合，注意不要冲突，其它规则则是模式、语法上的。全部的规则参考其[官网](https://eslint.org/)。

ESLint 推荐的规则中，值得强调的有：

| 序号 | 规则 | 说明 |
|--|--|--|
| 1 | object-shorthand | 用对象方法简写 |
| 2 | prefer-destructuring | 尽量用对象的解构赋值来获取和使用对象某个或多个属性值 |
| 3 | prefer-template | 尽量使用模板字符串而不是字符串拼接 |
| 4 | no-loop-func | 不要在非函数块内声明函数 |
| 5 | prefer-rest-params | 不要使用 `arguments`，用收集参数语法 `...` 代替 |
| 6 | default-param-last | 把默认参数赋值放在最后 |
| 7 | no-param-reassign | 不要修改参数或对参数重新赋值 |
| 8 | arrow-parens | 在箭头函数参数两头，总是使用小括号包裹住参数 |
| 9 | class-methods-use-this | 类方法应该使用 `this` |
| 10 | import/first | 把 `import` 放在其他所有语句之前 |
| 11 | import/extensions | import 文件不用包含扩展名 |
| 12 | one-var | 为每个变量声明都用一个 `const` 或 `let ` |
| 13 | eqeqeq | 用 `===` 和 `!==` 而不是 `==` 和 `!=` |
| 14 | no-else-return | 最后的 `return` 不需要 `else` 包裹 |
| 15 | radix | `parseInt` 转换 `string` 应总是带上基数 |
| 16 | no-new-wrappers | 不要使用 `new` 操作符进行类型转化 |

完整的例子：

##### 1. object-shorthand

用对象方法简写。

``` js
// bad
const atom = {
  value: 1,

  // 键 + 匿名方法
  addValue: function (value) {
    return atom.value + value
  },
};

// good
const atom = {
  value: 1,

  // 对象的方法
  addValue(value) {
    return atom.value + value
  },
};
```

##### 2. prefer-destructuring

尽量用对象的解构赋值来获取和使用对象某个或多个属性值。

``` js
// bad
function getFullName(user) {
  const firstName = user.firstName
  const lastName = user.lastName

  return `${firstName} ${lastName}`
}

// good
function getFullName(user) {
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`
}
```

##### 3. prefer-template

尽量使用模板字符串而不是字符串拼接。

``` js
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?'
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join()
}

// bad
function sayHi(name) {
  return `How are you, ${name}?`
}

// good
function sayHi(name) {
  return `How are you, ${name}?`
}
```

##### 4. no-loop-func

不要在非函数块（`if`、`while` 等）内声明函数，浏览器会允许你这样做，但不同浏览器的解析方式不同。

``` js
// bad
if (currentUser) {
  function test() {
    console.log('Nope.')
  }
}

// good
let test
if (currentUser) {
  test = () => {
    console.log('Yup.')
  }
}
```

##### 5. prefer-rest-params

不要使用 `arguments`，用收集参数语法 `...` 代替。

``` js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments)
  return args.join('')
}

// good
function concatenateAll(...args) {
  return args.join('')
}
```

##### 6. default-param-last

把默认参数赋值放在最后。

``` js
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

##### 7. no-param-reassign

不要修改参数或对参数重新赋值。

``` js
// bad
function f1(obj) {
  obj.key = 1
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1
}
```

##### 8. arrow-parens

在箭头函数参数两头，总是使用小括号包裹住参数，这样做使代码更清晰且一致。

``` js
// bad
[1, 2, 3].map(x => {
  const y = x + 1
  return x * y
})

// good
[1, 2, 3].map((x) => {
  const y = x + 1
  return x * y
})
```

##### 9. class-methods-use-this

除非外部库或框架需要使用特定的非静态方法，否则类方法应该使用 `this` 或被写成静态方法。

``` js
// bad
class Foo {
  bar() {
    console.log('bar')
  }
}

// good - this 被使用了
class Foo {
  bar() {
    console.log(this.bar)
  }
}
```

##### 10. import/first

把 `import` 放在其他所有语句之前。

``` js
// bad
import foo from 'foo'
foo.init()

import bar from 'bar'

// good
import foo from 'foo'
import bar from 'bar'

foo.init()
```

##### 11. import/extensions

import 文件不用包含扩展名。

``` js
// bad
import foo from './foo.js'
import bar from './bar.jsx'
import baz from './baz/index.jsx'

// good
import foo from './foo'
import bar from './bar'
import baz from './baz'
```

##### 12. one-var

为每个变量声明都用一个 `const` 或 `let `。

``` js
// bad
const items = getItems(),
  goSportsTeam = true,
  dragonball = 'z'

// good
const items = getItems()
const goSportsTeam = true
const dragonball = 'z'
```

##### 13. eqeqeq

用 `===` 和 `!==` 而不是 `==` 和 `!=`。

##### 14. no-else-return

如果 `if` 语句中每个判断分支总是需要用 `return` 返回，最后的 `return` 就不需要 `else` 包裹了。同时，开发者书写代码时，建议先写最后一行的 `return`，再写 `if` 部分，这样可以保证函数有保底的返回语句。

``` js
// bad
function foo() {
  if (x) {
    return x
  } else {
    return y
  }
}

// good
function foo() {
  if (x) {
    return x
  }
  return y
}
```

##### 15. radix

用 `Number` 做类型转换，`parseInt` 转换 `string` 应总是带上基数。

``` js
// bad
const val = parseInt(inputValue)

// good
const val = Number(inputValue)

// good
const val = parseInt(inputValue, 10)
```

##### 16. no-new-wrappers

不要使用 `new` 操作符进行类型转化。

``` js
const reviewScore = 9
const age = 0

// bad
const totalScore = new String(reviewScore) // typeof totalScore is "object" not "string"
const hasAge = new Boolean(age)

// good
const totalScore = String(this.reviewScore)
const hasAge = Boolean(age)
```
