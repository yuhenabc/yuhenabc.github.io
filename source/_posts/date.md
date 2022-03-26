title: Date 对象使用总结
date: 2016-8-1
category: 知识备忘
tags: javascript
---

## 构造函数

当前时间：

``` js
const date = new Date()
```

距离起始时间 `1970年1月1日午夜` 的毫秒数：

``` js
const date = new Date(milliseconds)
```

字符串代表的日期与时间，比如 `"Jannuary 1, 1998 20:13:15"`：

``` js
const date = new Date(dateString)
```

时间数值，可以不用全部写，不写则默认为 `0`：

``` js
const date = new Date(year, month, day, hours, minutes, seconds, microseconds)
```

## 对象的获取类函数

``` js
date.getDate()            // 返回天数(1-31)
date.getDay()             // 返回星期数(0-6)
date.getFullYear()        // 返回四位数年份
date.getHours()           // 返回小时数(0-23)
date.getMilliseconds()    // 返回毫秒数(0-999)
date.getMinutes()         // 返回分钟数(0-59)
date.getMonth()           // 返回月份数(0-11)
date.getSeconds()         // 返回的秒数(0-59)
date.getTime()            // 返回时间戳表示法(毫秒表示)
date.getYear()            // 返回年份(真实年份减去1900)
```

## 对象的设置类函数

``` js
date.setDate()            // 设置月份的一天
date.setFullYear()        // 设置的年份，月份和天
date.setHours()           // 设置小时，分钟，秒和毫秒
date.setMilliseconds()    // 设置毫秒数
date.setMinutes()         // 设置分钟，秒，毫秒
date.setMonth()           // 设置月份，天
date.setSeconds()         // 设置月份的一天
date.setTime()            // 使用毫秒数设置对象
date.setYear()            // 设置年份(真实年份减去1900)
```

## 对象的转化显示类函数

``` js
date.toLocalString()       // 返回本地化字符串表示，比如 '2022/3/26'
date.toLocaleDateString()  // 返回日期部分的本地化字符串表示，比如 '2022/3/26 23:31:41'
date.toLocaleTimeString()  // 返回时间部分的本地化字符串表示，比如 '23:31:41'
date.toString()            // 返回内部表示格式，比如 'Sat Mar 26 2022 23:31:41 GMT+0800 (中国标准时间)'
date.toDateString()        // 返回内部表示格式，比如 'Sat Mar 26 2022'
date.toTimeString()        // 返回内部表示格式，比如 '23:31:41 GMT+0800 (中国标准时间)'
```

对比不难发现，`date.toString() === date.toDateString() + ' ' + date.toTimeString()`。

## 静态方法

解析一个日期的字符串，并返回该日期距 `1970年1月1日午夜` 之间的毫秒数：

``` js
Date.parse()
```

获取当前时间的时间戳（毫秒数）：

``` js
Date.now()
```
