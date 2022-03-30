## Select 多选下拉框

当选项过多时，使用下拉菜单展示并进行多选内容。

### 基本用法

可自订选项内容，进行复数项目选择和全选

:::demo

```html

<template>
    <bo-select
            v-model="model"
            :list="list"
            :collapseTags="collapseTags"
            :disabled="disabled"
            :showBtn="showBtn"
            :showType="showType"
    >
    </bo-select>
</template>

<script>
    export default {
        data() {
            return {
                "model": [],
                "list": [
                    {
                        value: 0,
                        label: "Male"
                    },
                    {
                        value: 1,
                        label: "Female"
                    }
                ],
                "collapseTags": true,
                "disabled": false,
                "showBtn": true,
                "showType": 1
            }
        }
    }
</script>

```

:::

### 使用反向選擇功能類型

当选项数量大于30将自动出现反向选择按钮

:::demo

```html

<template>
    <bo-select
            v-model="model"
            :list="list"
            :collapseTags="collapseTags"
            :disabled="disabled"
            :showBtn="showBtn"
            :showType="showType"
    >
    </bo-select>
</template>

<script>
    export default {
        data() {
            return {
                model: [],
                list: [
                    {
                        value: 0,
                        label: 'T0'
                    },
                    {
                        value: 1,
                        label: 'T1'
                    },
                    {
                        value: 2,
                        label: 'T2'
                    },
                    {
                        value: 3,
                        label: 'T3'
                    },
                    {
                        value: 4,
                        label: 'T4'
                    },
                    {
                        value: 5,
                        label: 'T5'
                    },
                    {
                        value: 6,
                        label: 'T6'
                    },
                    {
                        value: 7,
                        label: 'T7'
                    },
                    {
                        value: 8,
                        label: 'T8'
                    },
                    {
                        value: 9,
                        label: 'T9'
                    },
                    {
                        value: 10,
                        label: 'T10'
                    },
                    {
                        value: 11,
                        label: 'T11'
                    },
                    {
                        value: 12,
                        label: 'T2'
                    },
                    {
                        value: 13,
                        label: 'T13'
                    },
                    {
                        value: 14,
                        label: 'T14'
                    },
                    {
                        value: 15,
                        label: 'T15'
                    },
                    {
                        value: 16,
                        label: 'T16'
                    },
                    {
                        value: 17,
                        label: 'T17'
                    },
                    {
                        value: 18,
                        label: 'T18'
                    },
                    {
                        value: 19,
                        label: 'T19'
                    },
                    {
                        value: 20,
                        label: 'T20'
                    },
                    {
                        value: 21,
                        label: 'T21'
                    },
                    {
                        value: 22,
                        label: 'T22'
                    },
                    {
                        value: 23,
                        label: 'T23'
                    },
                    {
                        value: 24,
                        label: 'T24'
                    },
                    {
                        value: 25,
                        label: 'T25'
                    },
                    {
                        value: 26,
                        label: 'T26'
                    },
                    {
                        value: 27,
                        label: 'T27'
                    },
                    {
                        value: 28,
                        label: 'T28'
                    },
                    {
                        value: 29,
                        label: 'T29'
                    },
                    {
                        value: 30,
                        label: 'T30'
                    },
                    {
                        value: 31,
                        label: 'T31'
                    },
                    {
                        value: 32,
                        label: 'T32'
                    }
                ],
                collapseTags: true,
                disabled: false,
                showBtn: true,
                showType: 1
            }
        }
    }
</script>

```

:::

### 全选时资料选取全选项类型

全选的预设值为空数组，当使用此类型时点选全选，绑定之数组资料会确实产生全部选项的资料

:::demo

```html

<template>
    <bo-select
        v-model="model"
        :list="list"
        :collapseTags="collapseTags"
        :disabled="disabled"
        :showBtn="showBtn"
        :showType="showType"
    >
    </bo-select>
</template>

<script>
    export default {
        data() {
            return {
                model: [],
                list: [
                    {
                        value: 0,
                        label: 'T0'
                    },
                    {
                        value: 1,
                        label: 'T1'
                    },
                    {
                        value: 2,
                        label: 'T2'
                    },
                    {
                        value: 3,
                        label: 'T3'
                    },
                    {
                        value: 4,
                        label: 'T4'
                    },
                    {
                        value: 5,
                        label: 'T5'
                    },
                    {
                        value: 6,
                        label: 'T6'
                    },
                    {
                        value: 7,
                        label: 'T7'
                    },
                    {
                        value: 8,
                        label: 'T8'
                    },
                    {
                        value: 9,
                        label: 'T9'
                    },
                    {
                        value: 10,
                        label: 'T10'
                    }
                ],
                collapseTags: false,
                disabled: false,
                showBtn: true,
                showType: 2
            }
        }
    }
</script>

```

:::

### Attributes

| 参数             | 说明                                | 类型            | 可选值 | 默认值     |
| --------------- | ---------------------------------- | --------------- | ------ | -------- |
| value / v-model | 绑定值                              | Array           | —      | \['\_all_']|
| list            | 选择用的所有选项列表                   | Array           | —      | []       |
| collapseTags    | 已选中多个选项时是否将所有选项接完整展示   | Boolean        | —       | true     |
| valueName       | 自订义给予的选项列的每个物件中的值名称    | String          | —       | 'value'  |
| labelName       | 自订义给予的选项列的每个物件中的标签显示名称  | String       | —       | 'label'  |
| disabled        | 是否禁用                            | Boolean         | —       | false    |
| showBtn         | 是否显示按钮                         | Boolean         | —       | false    |
| showType        | 显示类型 1: Exclude, 2: All         | Number          | 1, 2    | 1        |
| isEmpty         | 选择全选默认值是否为空数组[],或维持默认值 \['\_all_']     | Boolean        | —  | false        |

### list參數細節

| 参数             | 说明                | 类型    | 可选值 | 默认值     |
| --------------- | ----------------    | -------| ------ | ---------- |
| label           | 标签显示名称          | String  | —  | —      |
| value           | 标签所代表的值        | String  | —  | —      |

### Events

无

### Methods

| 方法名        | 说明                              | 参数                    |
| ----------   | -------------------------------- | ----------------------- |
| handleChange | 输入数组来直接指定选择到的项目         | 输入数组其中每个元素分别为各标签的值   |