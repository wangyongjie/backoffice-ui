## Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基本用法


:::demo

```html

<template>
    <bo-table
        v-loading.lock="loading"
        :data="data"
        :height="height"
        border
        :summary="summary"
        :columns="columns"
    >
        <template v-slot:options="{ row }">
            <el-button type="primary">Edit</el-button>
        </template>
    </bo-table>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                height: '300px',
                summary: null,
                columns: [
                    {
                        prop: 'name',
                        label: 'Name',
                        minWidth: 140,
                        align: 'center',
                        sortable: 'custom'
                    },
                    {
                        prop: 'mobile',
                        label: 'Mobile',
                        minWidth: 140,
                        align: 'center',
                        sortable: true
                    },
                    {
                        prop: 'sex',
                        label: 'Sex',
                        minWidth: 140,
                        align: 'center',
                        render: function render(row) {
                            let sex = row.sex
                            return 0 === sex ? 'Male' : 1 === sex ? 'Female' : 'Unknow'
                        }
                    },
                    {
                        label: 'Options',
                        minWidth: 140,
                        align: 'center',
                        slotName: 'options'
                    }
                ],
                data: [
                    {
                        name: 'Sam',
                        mobile: '15299xxxx',
                        sex: 0
                    },
                    {
                        name: 'Jean',
                        mobile: '13452xxxx',
                        sex: 1
                    },
                    {
                        name: 'Tony',
                        mobile: '187233xxxx',
                        sex: 0
                    },
                    {
                        name: 'Sam',
                        mobile: '15299xxxx',
                        sex: 0
                    },
                    {
                        name: 'Jean',
                        mobile: '13452xxxx',
                        sex: 1
                    },
                    {
                        name: 'Tony',
                        mobile: '187233xxxx',
                        sex: 0
                    },
                    {
                        name: 'Sam',
                        mobile: '15299xxxx',
                        sex: 0
                    },
                    {
                        name: 'Jean',
                        mobile: '13452xxxx',
                        sex: 1
                    },
                    {
                        name: 'Tony',
                        mobile: '187233xxxx',
                        sex: 0
                    }
                ]
            }
        },
    }
</script>

```

:::

### 进阶用法

columns的每个物件元素中如果存有以下key名称，则会产生该对应的template模板

:::demo

```html

<template>
    <bo-table
        v-loading.lock="loading"
        :data="data"
        :height="height"
        border
        :summary="summary"
        :columns="columns"
    >
        <template v-slot:imSlotName="{ row }">
            <el-button type="primary">here</el-button>
        </template>
    </bo-table>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                height: '300px',
                summary: null,
                columns: [
                    {
                        label: 'imSlotName',
                        minWidth: 140,
                        align: 'center',
                        slotName: 'imSlotName'
                    },
                    {
                        prop: 'name',
                        label: 'Name',
                        minWidth: 140,
                        align: 'center',
                        html: function render() {
                            return '<pre>Name in pre</pre>'
                        }
                    },
                    {
                        prop: 'sex',
                        label: 'Sex',
                        minWidth: 140,
                        align: 'center',
                        render: function render(row) {
                            let sex = row.sex
                            return 0 === sex ? 'Male' : 1 === sex ? 'Female' : 'Unknow'
                        }
                    },
                    {
                        prop: 'money',
                        label: 'Money',
                        minWidth: 140,
                        align: 'center',
                        filter: 'currency'
                    },
                    {
                        prop: 'date',
                        label: 'Date',
                        minWidth: 140,
                        align: 'center',
                        filter: 'date'
                    },
                    {
                        prop: 'preProp',
                        label: 'Pre',
                        minWidth: 140,
                        align: 'center',
                        pre: 'any'
                    },
                    {
                        prop: 'linkProp',
                        label: 'Link',
                        minWidth: 140,
                        align: 'center',
                        linkPrefix: 'https://element.eleme.io/#/zh-CN/component/'
                    },
                    {
                        prop: 'imageURL',
                        label: 'image',
                        minWidth: 140,
                        align: 'center',
                        image: {
                            style: {width:'100px', height:'100px'},
                            fit: 'cover'
                        }
                    }

                ],
                data: [
                    {
                        name: 'Sam',
                        money: '152991111',
                        sex: 0,
                        date: '20200825',
                        preProp: '' + 
                                '這是一     個會保留空格             跟換行'+
                                '的文本測試'
                    },
                    {
                        name: 'Jean',
                        money: '134522222',
                        sex: 1,
                        date: '20200825',
                        linkProp: 'slider'
                    },
                    {
                        name: 'Tony',
                        money: '187233333',
                        sex: 0,
                        date: '20200825',
                        imageURL: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    }
                ]
            }
        },
    }
</script>

```

:::

### summary:sum

第一列显示各行总和

:::demo

```html

<template>
    <bo-table
        v-loading.lock="loading"
        :data="data"
        :height="height"
        border
        :summary="summary"
        :columns="columns"
    >
        <template v-slot:options="{ row }">
            <el-button type="primary">Edit</el-button>
        </template>
        <template v-slot:option="{ row }">
            <el-button type="primary">Edit2</el-button>
        </template>
    </bo-table>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                height: '300px',
                summary: 'sum',
                columns: [{
                    prop: 'id',
                    label: 'Id'
                },
                    {
                        prop: 'a',
                        label: 'A'
                    },
                    {
                        prop: 'b',
                        label: 'B'
                    },
                    {
                        prop: 'c',
                        label: 'C'
                    }
                ],
                data: [{
                    id: 1,
                    a: 10,
                    b: 'text',
                    c: 15
                },
                    {
                        id: 2,
                        a: 15,
                        b: 'text',
                        c: 5
                    },
                    {
                        id: 3,
                        a: 30,
                        b: 'text',
                        c: 10
                    }
                ]
            };
        },
    }
</script>

```

:::

### summary:avg with excludeProps

排除掉行项a

:::demo

```html

<template>
    <bo-table
            v-loading.lock="loading"
            :data="data"
            :height="height"
            border
            :summary="summary"
            :columns="columns"
    >
        <template v-slot:options="{ row }">
            <el-button type="primary">Edit</el-button>
        </template>
        <template v-slot:option="{ row }">
            <el-button type="primary">Edit2</el-button>
        </template>
    </bo-table>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                height: '300px',
                summary: {
                    type: 'avg',
                    excludeProps: [
                        'a'
                    ]
                },
                columns: [{
                    prop: 'id',
                    label: 'Id'
                },
                    {
                        prop: 'a',
                        label: 'A'
                    },
                    {
                        prop: 'b',
                        label: 'B'
                    },
                    {
                        prop: 'c',
                        label: 'C'
                    }
                ],
                data: [{
                    id: 1,
                    a: 10,
                    b: 'text',
                    c: 15
                },
                    {
                        id: 2,
                        a: 15,
                        b: 'text',
                        c: 5
                    },
                    {
                        id: 3,
                        a: 30,
                        b: 'text',
                        c: 10
                    }
                ]
            };
        },
    }
</script>

```

:::

### summary:avg with precision

范例精准度到小数点第二位

:::demo

```html

<template>
    <bo-table
            v-loading.lock="loading"
            :data="data"
            :height="height"
            border
            :summary="summary"
            :columns="columns"
    >
        <template v-slot:options="{ row }">
            <el-button type="primary">Edit</el-button>
        </template>
        <template v-slot:option="{ row }">
            <el-button type="primary">Edit2</el-button>
        </template>
    </bo-table>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                height: '300px',
                summary: {
                    type: 'avg',
                    precision: 2
                },
                columns: [{
                    prop: 'id',
                    label: 'Id'
                },
                    {
                        prop: 'a',
                        label: 'A'
                    },
                    {
                        prop: 'b',
                        label: 'B'
                    },
                    {
                        prop: 'c',
                        label: 'C'
                    }
                ],
                data: [{
                    id: 1,
                    a: 10,
                    b: 'text',
                    c: 15
                },
                    {
                        id: 2,
                        a: 15,
                        b: 'text',
                        c: 5
                    },
                    {
                        id: 3,
                        a: 30,
                        b: 'text',
                        c: 10
                    }
                ]
            };
        },
    }
</script>

```

:::

### Attributes

| 参数            | 说明                  | 类型    | 可选值 | 默认值       |
| --------------- | ------------------- | ------- | ------ | ---------  |
| data            | 数据资料，每一元素皆使用物件包覆资料，key名称对应置columns的props名称              | Array   | ------ | []         |
| columns         | 每一行类型的细节配置，物件内的key参数设定请参考 [Table-column Attributes](https://element.eleme.io/#/zh-CN/component/table#table-column-attributes/)    | Array   | —      | []         |
| summary         | 配置平均值或总和值      | String, Object  | summary资料细节      | null          |
|                 | 其他设定如 [Table Attributes](https://element.eleme.io/#/zh-CN/component/table#table-column-scoped-slot/)


### columns细节补充

| 参数            | 说明                  | 类型    | 可选值 | 默认值       |
| --------------- | ------------------- | ------- | ------ | ---------  |
| slotName        | 产生对应slot名称的模块  | String  | ------ | \'default'   |
| html            | 输入一段函式回传出要显示之对应模块 | function   | ------  | ------  |
| render          | 输入一段函式回传出要显示的值    | function | ------ | ------  |
| filter          | 输入想要滤换的类型，产生出该类型的显示文本，如果想要经过数次不同类型的滤换可以依序用 '\|' 区隔。 [详细内容请参考](/global/filter.html)   | String | 'number', 'currency', 'date', 'card' | ------  |
| pre             | 将显示文本以style="white-space: pre-wrap"的方式产出 | String   | 任意  | ------  |
| linkPrefix      | 将显示文本以el-link的方式产出。 (输入一段url + 该column的prop值) 作为link的href | String   | 任意  | ------  |
| target          | 需与linkPrefix搭配使用，为\<a>的target参数。 ，target使用方式[请参考](https://www.w3school.com.cn/tags/att_a_target.asp) | String   | ------  | ------  |
| image           | 以el-image的模板来作内容显示，src以prop值为内容，此物件分别含有可选key为style, fit | Object   | ------ | ------  | 
| sortable        | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | Boolean, String   | true, false, 'custom' | false  |

### summary资料细节

可填内容为 'avg' | 'sum' 或 summary: { type: 'avg', excludeProps: \['prop'], precision: 2} 预设第一个栏位会变成 Sum 或 Avg, excludeProps
可排除栏位, precision 精准度到小数第几位 (预设为0)

### Events

| 方法名    | 说明         | 参数                    |
| --------- | ------------ | ----------------------- |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | ------ |

### Methods

无