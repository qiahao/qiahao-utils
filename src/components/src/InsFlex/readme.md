# 组件 UIFlex

- UIFlex组件可嵌套使用，默认只有最外层UIFlex拥有属性 `display: flex`
- 子级UIFlex组件拥有属性 `flex: 1`
- 子级UIFlex组件可使用布尔属性 box，强势设置为`display: flex`
- 定制属性align可同时设置justifyContent和alignItems，常用于设置居中
- 其他属性和伸缩盒原生css样式属性一致

## UIFlex

- props
    <!-- 作为flex包裹标签时接收以下属性，作为flex__item使用时忽略以下属性 -->
    - flexFlow:     
      flex-direction flex-wrap 的缩写，控制轴方向和是否换行
      flex-direction: row | row-reverse | column | column-reverse
      flex-wrap: nowrap | wrap | wrap-reverse;
      默认值： row nowrap

    - justifyContent:  
        主轴对齐
        可选值：flex-start | flex-end | center | space-between | space-around; 
        默认值 flex-start

    - alignItems: 
        交叉轴对齐
        可选值：flex-start | flex-end | center | baseline | stretch; 
        默认值 flex-start
        
    - alignContent: 
        多根轴线对齐：flex-wrap 为wrap | wrap-reverse 并出换行情况才有效
        可选值：flex-start | flex-end | center | space-between | space-around | stretch; 
        默认值 flex-start

    - align:
        简化属性，同时传入 justifyContent和alignItems值，使用空格分隔，也可以传入不含空格的字符串
        可选值：start | end | center 或 justifyContent和alignItems有效值组合
        默认值：无

    <!-- 作为flex__item使用时接收以下属性，作为flex包裹标签时忽略以下属性 -->
    - order: 
      设置排序
      默认值：0
        cart__toGoChange
    - flex
      flex-grow, flex-shrink 和 flex-basis的简写
      默认值：0 1 auto
      样式默认设置为 flex: 1;
      
    - alignSelf
      允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
      可选值：auto | flex-start | flex-end | center | baseline | stretch;
      默认值：auto


默认不换行时设置flex__item overflow: hidden


## 示例

常用
```xml
<UIFlex>
  <UIFlex>UIFlex1</UIFlex>
  <UIFlex>UIFlex2</UIFlex>
</UIFlex>
```

方向和换行：flex-flow属性控制方向和换行
```xml
<!-- 横向换行 -->
<UIFlex flex-flow="row wrap" >
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
</UIFlex>

<!-- 纵向不换行 -->
<UIFlex flex-flow="column" >
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
  <UIFlex>UIFlex</UIFlex>
</UIFlex>
```

对齐
```xml
<!-- 使用简化属性align的对齐：支持start end center等的组合使用 -->
<UIFlex align="center">
  <div>UIFlex</div>
  <div>UIFlex</div>
</UIFlex>
<UIFlex align="center start">
  <div>UIFlex</div>
  <div>UIFlex</div>
</UIFlex>

<UIFlex align="start center">
  <div>UIFlex</div>
  <div>UIFlex</div>
</UIFlex>

<UIFlex align="start center">
  <div>UIFlex</div>
  <div>UIFlex</div>
</UIFlex>

<!-- 使用原生属性精细控制 -->
<UIFlex justify-content="center" align-items="center">
  <div>UIFlex</div>
  <div>UIFlex</div>
</UIFlex>
```

使用box熟悉实现多级嵌套
```xml
<UIFlex align="start center">
  <UIFlex>
    <div>UIFlex</div>
    <div>
      <UIFlex box>
        <UIFlex></UIFlex>
      </UIFlex>
    </div>
    <UIFlex box>
      <UIFlex></UIFlex>
    </UIFlex>
  </UIFlex>
  <div>UIFlex</div>
</UIFlex>
```