title: SQL 学习小例子
date: 2019-10-30 14:10:45
category: 知识备忘
tags: sql
---

> 我们的目标是创建一个数据库，包含顾客、商品，以及二者产生关系得到的订单，过程中我们要尽可能地用到关系型数据库的特性，所以还有一些衍生的表单。本文的 SQL 语法遵循 Mysql 的语法。

### step1: 创建表单

使用数据库（假设已有）：

``` sql
USE `hungry`;
```

用户表单：

``` sql
CREATE TABLE `users` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `id_creator` INT(8) unsigned NOT NULL COMMENT '创建者ID',
  `username` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `purse` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '访问口令',
  `role` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

商品表单：

``` sql
CREATE TABLE `goods` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '食物名称',
  `id_type` INT(8) UNSIGNED NOT NULL COMMENT '类型ID',
  `id_creator` INT(8) UNSIGNED NOT NULL COMMENT '创建者ID',
  `current_price` float(8,2) COMMENT '现价',
  `origin_price` float(8,2) COMMENT '原价',
  `rate` float(2,1) COMMENT '折扣（0~10）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

订单表单：

``` sql
CREATE TABLE `orders` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `id_type` INT(8) UNSIGNED NOT NULL COMMENT '类型ID',
  `id_creator` INT(8) UNSIGNED NOT NULL COMMENT '创建者ID',
  `id_goods` INT(8) UNSIGNED NOT NULL COMMENT '商品ID',
  `price_unit` float(8,2) COMMENT '单价',
  `rate` float(2,1) COMMENT '折扣（0~10）',
  `quantity` int(10) COMMENT '数量',
  `price_total` float(12,2) COMMENT '总价',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  `updated` datetime DEFAULT NULL COMMENT '更新时间',
  `status` int(1) DEFAULT 1 COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

商品类型表单：

``` sql
CREATE TABLE `type_of_goods` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

订单类型表单：

``` sql
CREATE TABLE `type_of_orders` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

至此 5 张表单都已经创建完毕。

### step2: 插入数据

下面我们插入一些原始数据。

``` sql
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('super', '123456', 'super', 1);
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('admin', '123456', 'admin', 1);
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('小白', '123456', 'business', 2);
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('小花', '123456', 'business', 2);
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('小亮', '123456', 'business', 2);
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('小明', '123456', 'business', 2);
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('坏蛋', '123456', 'consumer', 2);
INSERT INTO `users` (username, purse, role, id_creator) VALUES ('笨蛋', '123456', 'consumer', 2);

INSERT INTO `goods` (`name`, `id_type`, `id_creator`, `current_price`, `origin_price`, `rate`)
VALUES ('宫爆鸡丁', 1, 4, 12, 15, 8);

INSERT INTO `orders` (`id_type`, `id_creator`, `id_goods`, `price_unit`, `rate`, `quantity`, `price_total`, `created`, `updated`)
VALUES (1, 7, 1, 12, 8, 1, 12, NOW(), NOW());
INSERT INTO `orders` (`id_type`, `id_creator`, `id_goods`, `price_unit`, `rate`, `quantity`, `price_total`, `created`, `updated`)
VALUES (1, 8, 1, 12, 8, 2, 24, NOW(), NOW());

INSERT INTO `type_of_goods` (`description`) VALUES ('菜品');
INSERT INTO `type_of_goods` (`description`) VALUES ('主食');
INSERT INTO `type_of_goods` (`description`) VALUES ('酒水');
INSERT INTO `type_of_goods` (`description`) VALUES ('其它');

INSERT INTO `type_of_orders` (`description`) VALUES ('消费');
INSERT INTO `type_of_orders` (`description`) VALUES ('业务办理');
INSERT INTO `type_of_orders` (`description`) VALUES ('理赔');
```

### step3: 创建索引、外键

为商品创建索引：

``` sql
CREATE INDEX `idx_goods_creator` ON `goods` (`id_creator` ASC);
CREATE INDEX `idx_goods_type` ON `goods` (`id_type` ASC);
```

为商品创建外键：

``` sql
ALTER TABLE `goods`
ADD CONSTRAINT `fk_goods_creator`
  FOREIGN KEY (`id_creator`)
  REFERENCES `users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `goods`
ADD CONSTRAINT `fk_goods_type`
  FOREIGN KEY (`id_type`)
  REFERENCES `type_of_goods` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```

为订单创建索引：

``` sql
CREATE INDEX `idx_orders_type` ON `orders` (`id_type`);
CREATE INDEX `idx_orders_creator` ON `orders` (`id_creator`);
CREATE INDEX `idx_orders_goods` ON `orders` (`id_goods`);
```

为订单创建外键：

``` sql
ALTER TABLE `orders`
ADD CONSTRAINT `fk_orders_type`
  FOREIGN KEY (`id_type`)
  REFERENCES `type_of_orders` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `orders`
ADD CONSTRAINT `fk_orders_creator`
  FOREIGN KEY (`id_creator`)
  REFERENCES `users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `orders`
ADD CONSTRAINT `fk_orders_goods`
  FOREIGN KEY (`id_goods`)
  REFERENCES `goods` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```

### step4: 创建视图

我们最后还要给出一张可供别人直接查询的视图，把订单中的外键转化为更具体的值显示：

``` sql
CREATE VIEW `v_orders` AS
(SELECT O.id, G.name AS 'goods_name', GT.description AS 'goods_type', B.username AS 'goods_creator',
C.username AS 'order_creator', OT.description AS 'order_type', O.price_unit, O.quantity, O.price_total
FROM `orders` AS O INNER JOIN `goods` AS G INNER JOIN `users` AS B INNER JOIN `users` AS C INNER JOIN `type_of_goods` AS GT INNER JOIN `type_of_orders` AS OT
WHERE G.id = O.id_goods AND B.id = G.id_creator AND C.id = O.id_creator AND GT.id = G.id_type AND OT.id = O.id_type
ORDER BY O.id);
```
