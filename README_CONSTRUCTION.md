# CONSTRUCTION

## 文件结构

<pre>
|--src
  |--api                                  接口请求相关
  |--assets                               静态文件
  |--components                           项目业务组件，在componentsUI基础之上或自主开发的组件
  |--componentsUI                         对第三方组件的简单封装，一般是非业务组件
  |--config                               静态配置
  |--filters                              项目过滤器
  |--mixins                               项目混宏
  |--pages                                项目页面
  |--router                               项目路由，_tmpConfig根据pages自动生产的路由列表
  |--store                                项目状态管理，包含store2 localStorage存储
  |--styles                               sass公共部分管理
  |--utils                                项目常用工具
</pre>


## api

<pre>
|--api
  |--src                                              
    |--xxxApi.ts                          按模块分api                    
    ...
  |--index.ts                             对外导出api模块，统一使用 `export {xxxApi}` 模式导出api
  |--apiUrl.ts                            接口url统一管理
  |--utilsNet.ts                          请求文件
  |--utilsNetErrHandle.ts                 请求错误处理
</pre>

按模块命名，以`Api`结尾。

**api使用**

```js
import {authApi} from '@/api/index'

authApi.login()

```

## assets

<pre>
|--assets
  |--image                                引用的文件资源
  |--svg                                  存放svg文件：通过UISvg组件使用
</pre>

## components

<pre>
|--config
  |--src                              业务组件
    |--xxx/
      |--index.ts
  |--srcUI                            基础组件||第三放组件：其中基础组件用于后期开发独立的框架
    |--xxx/
      |--index.ts
  |--index.ts                         对外导出：src & srcUI 统一在该文件export
</pre>

## config

<pre>
|--config
  |--index.ts                            对外导出
  |--dictionary.ts                       字典常量
  |--options.ts                          列表常量
  |--static.ts                           其他常量
</pre>

特定的变量，使用命名空间

## directives

<pre>
|--directives
  |--src                                 资源存放文件夹
    |--directives.ts                     其他通用指令
  |--index.ts                            对外导出
</pre>

## filters

<pre>
|--filters
  |--src                                 资源存放文件夹
    |--filterDictionary.ts               对consfig/dictionary.ts的过滤器
    |--filters.ts                        其他通用过滤器
  |--index.ts                            对外导出
</pre>

## jsSdk

<pre>
|--jsSdk
  |--src/                                 资源存放文件
    |--xxx/                               jsSdk模块：多文件的sdk
    |--xxx.ts                             jsSdk文件：单文件sdk
  |--index.ts                             对外导出
</pre>


## pages 路由页面
<pre>
|--pages
  |--xxx/                                 模块
    |--components                         模块的局部组件：请确认该组件只在该模块下使用
    |--index.vue                          模块主页面
    |--detail.vue                         如详情等
    |--xxx.vue                            模块其他页面
</pre>

## router
<pre>
|--router
  |--src/                                 资源存放文件
    |--permission.ts                      路由权限
    |--router.vue                         实例化路由
    |--routes.vue                         路由定义
    |--routesPath.vue                     路由常量：就近维护
  |--index.ts                             对外导出Router
</pre>

## store
<pre>
|--store
  |--src/                                 资源存放文件
    |--xxx/                               模块
      |--state.ts                           steta
      |--actions.ts                         ations
      |--mutations.ts                       mutations
      |--index.ts                           模块主入口
    |--getters.ts                         getters
    |--state.ts                           steta
    |--actions.ts                         ations
    |--mutations.ts                       mutation
    |--index.ts                           vuex主入口
  |--index.ts                             对外导出
  |--store2.ts                            locastorage等存储入口
</pre>

## styles

<pre>
|--styles
  |--commonModules                       项目公共样式模块：在全局引用了
    |--_base.scss                         基础样式 
    ...                                   根据项目实际需求添加
  |--varHelper                            工具集，单独编译不会有输出，所有样式可以引用
    |--_funciton.scss                     sass函数
    |--_mixins.scss                       sass混宏
    |--_utils.scss                        sass Utils
    |--_var.scss                          预定义变量，所有变量使用default，可在_var-custom.scss修改：原则上不做修改
    |--_var-custom.scss                   定制变量，常用于覆盖_var.scss
    |--index.scss                         对外文件，包含上面文件
  |--index.scss                           对外文件，包含`varHelper/index.scss`
</pre>

**styles使用**

```html
<style lang="scss">
/* @imoprt '@/styles/index.scss'; 不需引入，已全局注入 */
@include b(block){} /* 定义模块名和样式 */
@include e(element){} /* 定义模块元素名和样式 */
@include m(modify){} /* 定义模块修饰名和样式 */

</style>
```
---

## utils

<pre>
|--utils.ts 
  |--src                              src文件夹
    |--tools.ts                       其他工具文件
    |--utils-app.ts                   app相关函数提取：常用功能函数入口，使用命名空间 appXxx
    |--utils-xxx.ts                   xxx模块的utils
  |--index.ts                         对外导出：src内工具方法统一在index.ts export
</pre>

**utils使用**

```js
import { appGetToken } from '@/utils'
const token = appGetToken()
```

