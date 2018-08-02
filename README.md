[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Timson020/Node-Builder.git/pulls)
![GitHub issues](https://img.shields.io/github/issues/Timson020/Node-Builder.svg)

# Node-Builder

quickstart in node with express && ejs && mongodb

## Feature

- [X] ES6
- [X] Hot-Reload

## Root目录说明

- src（项目源码）
- config（webpack配置文件，开发环境，生产环境）
- static（静态资源文件, css, js, lib）
- views（ejs模版文件）
- index.js（入口文件）
- .eslintrc（代码规范配置）
- .eslintignore（规范忽略配置）
- .editorconfig（编辑器配置）
- .gitignore（git忽略配置）
- .babelrc（语法解析配置）

## Src项目源码目录说明
>文件夹统一使用小写

>每个文件夹里面必须有一个index.js 作为导出文件，除了model有点例外

>文件夹里面的文件都必须是大写的，除了index.js以外

|目录名称|文件说明|备注|
|:--:|:--:|:--:|
|config.js|项目第三方的配置文件|存放的是mongodb，redis，或者是其他第三库的配置，一般都是帐号密码，地址，端口的配置|
|api|API接口||
|common|工具类文件夹||
|getter|取回数据的格式化函数||
|logs|日志文件|只有在npm run dev 的时候才会生成，不会上传到git|
|middleware|个人定制化中间件函数库||
|model|mongodb 数据的 collections结构（关系型数据库的开发者可以理解成表结构）||
|redis|redis相关操作可以存放到里面||
|schedule|定时任务|里面有简单的使用说明|

## Usage

```
<!-- 下载 -->
git clone https://github.com/Timson020/Node-Builder.git

<!-- 初始化项目 -->
npm run init

<!-- 本地运行开发环境 -->
npm run dev

<!-- 打包生产环境，注意只会打包node部分，static，views不会被打包 -->
npm run release

```

## Contributors
小生不才!
	
欢迎各位大佬的[PR](https://github.com/Timson020/Node-Builder/pulls)

欢迎各位大佬的[Issues](https://github.com/Timson020/Node-Builder/issues)
