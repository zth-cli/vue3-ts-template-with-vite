## CurdViews V2 文档

> CurdViews V2该组件覆盖大多数常规得**表格查询业务**,提供一个简单的配置即可完成大部分表格查询业务,主要使用vue3 $attrs得特性支持所有element-plus组件得属性穿透,前化繁为简, 尽可能减少使用心智负担，同时拓展了一些props属性，提供更多的功能。

> 主要是两个组件 CurdTable 和 CurdSearchForm组成

### 1、CurdTable 属性（CurdTableProps， 继承TableProps）：

> 通过 `v-bind="$attrs"` 通过属性透传将 **CurdTable** 组件属性全部透传到 **el-table** 上，所以支持 **el-table** 的所有 **Props** 属性。同时还扩展了以下 **Props：**

|    属性名    |    类型     | 是否必传 |                默认值                 |                                                      属性描述                                                       |
| :----------: | :---------: | :------: | :-----------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
|   columns    | ColumnProps |    ✅    |                   —                   | CurdTable 组件会根据此字段渲染搜索表单与表格列，详情见 ColumnProps, 后续后续可能非必穿,以适应某些情况完全自定义需求 |
|  requestApi  |  Function   |    ✅    |                   —                   |                                         获取表格数据的请求 API，返回Promise                                         |
| requestAuto  |   Boolean   |    ❌    |                 true                  |                                           表格初始化是否自动执行请求 API                                            |
| dataCallback |  Function   |    ❌    |                   —                   |                                    后台返回数据的回调函数，可对返回数据进行处理                                     |
|  pagination  |   Boolean   |    ❌    |                 true                  |                                                  是否显示分页组件                                                   |
|  initParam   |   Object    |    ❌    |                  {}                   |                                  表格请求的初始化参数，该值变化会自动请求表格数据                                   |
|    rowKey    |   String    |    ❌    |                 'id'                  |                                                  el-table的rowKey                                                   |
|  searchCol   |   Object    |    ❌    | { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } |                                               表格搜索项每列占比配置                                                |

### 2、Column 配置（ColumnProps, 继承TableColumnCtx）：

> 使用 `v-bind="column"` 通过属性透传将每一项 **column** 属性全部透传到 **el-table-column** 上，所以支持 **el-table-column** 的所有 **Props** 属性。同时还扩展了以下 **Props：**

|    属性名    |        类型        | 是否必传 | 默认值 |                                                属性描述                                                 |
| :----------: | :----------------: | :------: | :----: | :-----------------------------------------------------------------------------------------------------: |
|    hidden    |      Boolean       |    ❌    | false  |                                    是否隐藏表格列(只对 prop 列生效)                                     |
|    search    |    SearchProps     |    ❌    |   —    |                                     搜索项配置，详情见 SearchProps                                      |
|     enum     | Object \| Function |    ❌    |   —    | 字典，默认会使用el-tag显示在单元，还可以作为搜索框的下拉选项（字典可以为 API 请求函数，内部会自动执行） |
|  fieldNames  |       Object       |    ❌    |   —    |                                    指定字典 label && value 的 key 值                                    |
| headerRender |      Function      |    ❌    |   —    |                                  自定义表头内容渲染, 支持tsx和渲染函数                                  |
|    render    |      Function      |    ❌    |   —    |                                 自定义单元格内容渲染, 支持tsx和渲染函数                                 |
|  \_children  |    ColumnProps     |    ❌    |   —    |                                                多级表头                                                 |

### 3、条件搜索框 配置（SearchProps）：

> 使用 `v-bind="column.search.props“` 通过属性透传将 **search.props** 属性全部透传到每一项搜索组件上，所以我们支持 **input、select、tree-select、date-packer、time-picker、time-select** 大部分属性，并在其基础上还扩展了以下 **Props：**

|    属性名    |  类型  | 是否必传 | 默认值 |                                                     属性描述                                                     |
| :----------: | :----: | :------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     type     | String |    ✅    |   —    | 当前项搜索框的类型，支持：input、select、select-v2、tree-select、cascader、date-packer、time-picker、time-select |
|    props     | Object |    ❌    |   —    |                            参考 element plus 官方文档来传递，该属性所有值会透传到组件                            |
| defaultValue |  Any   |    ❌    |   —    |                                                   搜索框默认值                                                   |
|     key      | String |    ❌    |   —    |                             参数key值, 默认取ColumnProps得prop值,未定义时，需声明key                             |
|    order     | Number |    ❌    |   —    |                                              搜索框排序（从小到大）                                              |

### 4、CurdTable 事件：

> 通过 `v-bind="$attrs"`穿透，所以支持 **el-table** 的所有事件
>
> [el-table 事件文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)

### 5、CurdTable 方法：

> **CurdTable** 组件暴露了 **el-table** 实例，同时还暴露了以下方法和属性：
>
> [el-table 方法文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)

|     方法名      |                                 描述                                  |
| :-------------: | :-------------------------------------------------------------------: |
|     eltable     | `el-table` 实例，可以通过`eltable.方法名`来调用 `el-table` 的所有方法 |
|    tableData    |                         当前页面所展示的数据                          |
|   searchParam   |                      所有的搜索参数，不包含分页                       |
|   pageParams    |                          当前表格的分页数据                           |
| queryTableData  |               获取、刷新表格数据的方法（携带所有参数）                |
|   resetHandle   |               重置表格查询参数，相当于点击重置搜索按钮                |
| clearSelection  | 清空表格所选择的数据，除此方法之外还可使用 `element.clearSelection()` |
|     enumMap     |              当前表格使用的所有字典数据（Map 数据结构）               |
|   isSelected    |                           表格是否选中数据                            |
|  selectedList   |                          表格选中的数据列表                           |
| selectedListIds |                        表格选中的数据列表的 id                        |

### 6、CurdTable 插槽：

|          插槽名          |                                                                  描述                                                                   |
| :----------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
|            —             |                                        默认插槽，支持直接在 CurdTable 中写 el-table-column 标签                                         |
|       table-header       |                                         自定义表格头部左侧区域的插槽，一般情况该区域放操作按钮                                          |
|        table-tool        |                                                  自定义表格头部左右侧侧功能区域的插槽                                                   |
|          append          | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
|          empty           |                                                      当表格数据为空时自定义的内容                                                       |
|        pagination        |                                                              分页组件插槽                                                               |
|      `column.prop`       |                                          单元格的作用域插槽(直接以column.prop得值传递插槽即可)                                          |
| `column.prop` + "Header" |                                                         表头的作用域插槽(如上)                                                          |
