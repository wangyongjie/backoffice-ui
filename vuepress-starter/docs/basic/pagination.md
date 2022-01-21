## Pagination 分页

### 基本用法

可配合Table组件使用，操作换页和选择笔数及更新Table资料

:::demo

```html

<template>
    <div>
        <bo-pagination
            :total="total"
            :page.sync="page"
            :limit.sync="limit"
            @pagination="search"
        />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                total: 0,
                page: 1,
                limit: 20,
            };
        },
        methods: {
            search() {
                console.log('update table data')
            }
        }
    }
</script>

```

:::

### Attributes

| 参数             | 说明                         | 类型    | 可选值 | 默认值     |
| --------------- | ----------------------------| ------- | ------ | ---------- |
| total           | 总条目数                     | Number   | —      | 0 |
| page / sync     | 当前页数                     | Number   | —      | 1          |
| limit           | 每页显示个数选择器的选项设置     | Object   | —      | 25          |
| pageSizes       | 每页显示个数选择器的选项设置     | Array    | —      | [20, 25, 50, 100]          |
| layout          | 组件布局，子组件名用逗号分隔     | String   | —      | "total, sizes, prev, pager, next, jumper"         |
| background      | 是否为分页按钮添加背景色        | Boolean  | —      | true          |
| autoScroll      | 切换分页后，是否scroll to top | Boolean   | —      | true          |
| hidden          | (尚未实作)                   | Boolean  | —      | false      |

### Events

| 方法名      | 说明                              | 参数                    |
| ---------- | -------------------------------- | ----------------------- |
| pagination | 切换分页及更换每页笔数时会回调的callback | (暂无) |

### Methods

无
