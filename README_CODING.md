# CODING

## 代码风格

继承自规则 'plugin:vue/essential', 'eslint:recommended', '@vue/typescript'

**eslint中约定的规则**

- js&ts中 使用单引号
- 语句结束使用封号
- 对象最后1个键值对后面不添加逗号
- 数组最后1个元素后不添加逗号
- 保持一致缩进：1个tab（2个空格）
- 不定义未使用变量
- 关键词前后添加1个空格
- 函数调用，函数名和括号间不留空格
- 对象键值对‘:’前不留空格，‘:’后留1个空格，
- 单行注释符号和内容间保留1个空格
- 操作符前后保留1个空格
- 箭头函数，箭头前后保留1个空格

**其他代码约定**

- html：标签属性值使用双引号
- html：标签属性名使用‘-’连接
- html：标签保持规律的缩进
- html：尽可能使用语义化标签
- 样式：使用公共样式或公共变量
- 样式：使用一致的缩进：1个tab（2个空格）
- 样式：样式名和括号间保留1个空格
- 样式：组件中的样式名尽可能包含上下文关系，注意样式覆盖
- [j|t]s：使用有意义的变量名
- [j|t]s：变量名使用驼峰式
- [j|t]s：常量使用大写
- [j|t]s：变量使用最小的作用域
- 使用有意义的文件名

## 其他约定

- 编写清晰、高效的代码
- 编写逻辑简单、直接的代码
- 编写必要注释
- 编写符合eslint规则的代码
- 不提交无效代码：功能已删除，代码未删除
- 不提交调试代码：无用的console
- 不提交未审查代码：commit和pr前端阅读代码、删除无效代码，
- 不只是写业务逻辑：考虑UI交互、扩展和维护
- 清楚每行代码的作用

## 注意事项

- vscode使用插件Eslint、Vetur、Beautify、Vue2 Snippets


## 样式

使用[bem](https://bemcss.com/)风格。

实例
```scss
@include b(blockName) {
  color: #333;
  @include when(status){
    color: #666;
  }
  @include m(modifyName){
    color: #999;
  }
  @include e(elementName){
    @include m(modifyName){
      color: #eee;
    }
  }
}
```

编译后

```css
.ins-blockName{
  color: #333;
}
.ins-blockName.is-status{
  color: #666;
}
.ins-blockName--modifyName{
  color: #999;
}
.ins-blockName__elementName--modifyName{
  color: #eee;
}
```

## api请求

常用request.get, request.post, request.put, request.del发送请求。

以上四个方法使用一致的参数格式，`request.get(url, params?, option?, app?)`


请求示例：
```js
// post请求 params参数作为url查询参数时, 
// isQuery 只对post 请求有效， 
// 其他方式 params默认为url查询参数格式，不需要处理
// 其他方式需要传body请在option中添加属性body
request.post(url, params, { isQuery: true })

// post请求 params参数作为body时
request.post(url, params)

// post请求 需要传url参数 + body参数时
request.post(url, params, {isQuery: true, body: body})

// 需要删除空值属性时{p: null, p: undefined}
request.post(url, params, { isRemoveEmpty: true })

```