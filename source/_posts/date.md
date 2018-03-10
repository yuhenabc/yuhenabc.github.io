title: Date 对象使用总结
date: 2016-8-1
category: 知识备忘
tags: javascript
---

## 构造函数

当前时间

```
new Date()
```

距离起始时间 `1970年1月1日午夜` 的毫秒数

```
new Date(milliseconds)
```

字符串代表的日期与时间。此字符串可以使用 `Date.parse()` 转换,比如 `"Jannuary 1, 1998 20:13:15"`

```
new Date(dateString)
```

时间数值，可以不用全部写，不写则默认为 `0`

```
new Date(year, month, day, hours, minutes, seconds, microseconds)
```

## 对象的获取类函数

```
getDate()            //返回天数(1-31)
getDay()             //返回星期数(0-6)
getFullYear()        //返回四位数年份
getHours()           //返回小时数(0-23)
getMilliseconds()    //返回毫秒数(0-999)
getMinutes()         //返回分钟数(0-59)
getMonth()           //返回月份数(0-11)
getSeconds()         //返回的秒数(0-59)
getTime()            //返回时间戳表示法(毫秒表示)
getYear()            //返回年份(真实年份减去1900)
```

## 对象的设置类函数

```
setDate()            //设置月份的一天
setFullYear()        //设置的年份，月份和天
setHours()           //设置小时，分钟，秒和毫秒
setMilliseconds()    //设置毫秒数
setMinutes()         //设置分钟，秒，毫秒
setMonth()           //设置月份，天
setSeconds()         //设置月份的一天
setTime()            //使用毫秒数设置对象
setYear()            //设置年份(真实年份减去1900)
```

## 对象的转化显示类函数

```
toLocalString()       //返回本地化字符串表示
toLocaleDateString()  //返回日期部分的本地化字符串
toLocaleTimeString()  //返回时间部分的本地化字符串
toString()            //返回内部表示格式
toDateString()        //返回内部表示格式
toTimeString()        //返回内部表示格式
```

## 日期解析类函数

解析一个日期的字符串，并返回该日期距 `1970年1月1日午夜` 之间的毫秒数

```
Date.parse()
```