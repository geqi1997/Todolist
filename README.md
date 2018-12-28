# VUE+Koa2+Mysql+JWT实现todolist

## 项目说明：
>作为我学习的练手项目，从0开始构建一个数据通过Koa2提供API的形式获取，页面通过Vue渲染的todolist。学习了Vue构建单页面的一些知识以及前端路由的使用、Koa如何提供API接口，如何进行访问过滤（路由）、验证（JSON-WEB-TOKEN）以及Sequelize操作MySQL数据库的一些知识和技巧


## 项目使用的关键依赖：
 >

 - Vue
 - Koa2
 - axios 
 - mysql
 - sequelize
 - jwt
 - webpack
 - scss


## 使用方法：
### git clone
>git clone https://github.com/geqi1997/Todolist/tree/dev1
### 1.1 安装
>npm install
### 1.2 配置数据库(打开/server/config/db.js）
>修改如下const sequelize = new Sequelize('数据库', '数据库用户名', '数据库密码', {})
### 1.3 项目启动
>由于是前后端分离，所以分别用git 命令启动前台（npm run dev）和后台（node app.js）然后网页打开http://localhost:8080即可放心食用
---
## 项目出现的问题及解决
### 1.1 运用sequelize自动生成表结构
>进入server的目录，执行如下语句sequelize-auto -o "./schema" -d todolist -h 127.0.0.1 -u root -p 3306 -x XXXXX -e mysql，（其中 -o 参数后面的是输出的文件夹目录， -d 参数后面的是数据库名， -h 参数后面是数据库地址， -u 参数后面是数据库用户名， -p 参数后面是端口号， -x 参数后面是数据库密码 -e 参数后面指定数据库为mysql）
---
>当时开开心心的生成了，后面在注册，生成TODO的时候一直报错，如下图:
![图片描述](https://github.com/geqi1997/Todolist/blob/dev1/static/img/2.png)
根据字面意思说的是TODO的Id不能为空，最后发现就是自动生成的表结构中没有 **autoIncrement: true** 
 
### 1.2 Koa2中注意use的位置
>当在用Postman测试接口时，当返回是页面，或者是一条信息时就很凌乱，这个时候就需要检查一下不同use之间的顺序
---
## 下阶段目标及总结
>继续优化，改善界面。
