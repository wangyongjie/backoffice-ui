## Menu 菜单

用来切换不同大群类时，使用此寻览列组件来进行切换

### 基本用法

横向可根据需求自订不同群类的寻览标签

:::demo

```html

<template>
    <div>
        <bo-menu :menus="menus">
            <!-- Default -->
            <template #banner>
                banner
            </template>
            <template #seo>
                seo
            </template>
            <template #form>
                form
            </template>
        </bo-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menus: [
                    {
                        index: "banner",
                        label: "Banner",
                    },
                    {
                        index: "seo",
                        label: "SEO",
                    },
                    {
                        index: "form",
                        label: "Form",
                        default: true
                    }
                ]
            };
        },
    }
</script>

```

:::

### 直式巢狀導覽列

直向可在标签下设置子标签建立巢状寻览列

:::demo

```html

<template>
    <div>
        <bo-menu :menus="menus">
            <!-- Default -->
            <template #banner_portrait>
                banner
            </template>
            <template #seo_portrait>
                seo
            </template>
            <template #form_portrait>
                form
            </template>
            <template #section_portrait>
                section
            </template>
            <template #trend_portrait>
                trend
            </template>
        </bo-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menus: [
                    {
                        index: "banner_portrait",
                        label: "Banner",
                        children: [
                            {
                                label: "Activity",
                                children: [
                                    {
                                        label: "Hands",
                                        children: [
                                            {
                                                label: "Section",
                                                index: "section_portrait",
                                            },
                                            {
                                                label: "Trend",
                                                index: "trend_portrait",
                                                default: true
                                            },
                                        ],
                                    },
                                    {
                                        label: "Non-match Hands",
                                    },
                                    {
                                        label: "Matches",
                                    },
                                    {
                                        label: "Days Played",
                                    },
                                    {
                                        label: "Time played",
                                    },
                                    {
                                        label: "Game TO",
                                    },
                                    {
                                        label: "Player RW",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        index: "seo_portrait",
                        label: "SEO",
                    },
                    {
                        index: "form_portrait",
                        label: "Form",
                    }
                ]
            };
        },
    }
</script>

```

:::

### URL跳轉說明

可利用URL网址輸入 (?tab= 加上目标页签的index名称)，直接展开到目标页签  
例如:更动URL为 http://localhost:8083/basic/menu.html?tab=seo  
则到达该页面并直接展开至seo标签。 点击目标页签时 根据页签的index索引 URL会新增(?tab= 加上目标页签index名称)

### Attributes

| 参数             | 说明                | 类型    | 可选值 | 默认值     |
| --------------- | ----------------    | -------| ------ | ---------- |
| menus           | 页签根据index更新页面  | Array  | —  | []         |
| keepAlive       | 默认为false，如果配置true，menu互相切换时，旧的页面会缓存，不会重置数据   | Boolean | —      | false          |

### menus參數細節

| 参数             | 说明                | 类型    | 可选值 | 默认值     |
| --------------- | ----------------    | -------| ------ | ---------- |
| label           | 页签显示的文字        | String  | —  | —      |
| index           | 辨识template的id，需与配对的template id相等   | String  | —  | —      |
| default         | 默认为false，如果配置true，当初始化当前页面时会自动展开此到此页签   | Boolean | —      | false |

### Events

无

### Methods

| 方法名        | 说明                              | 参数                    |
| ----------   | -------------------------------- | ----------------------- |
| handleSelect | url的tab切换至目标页签的index值    | 输入目标页签的index索引值   |