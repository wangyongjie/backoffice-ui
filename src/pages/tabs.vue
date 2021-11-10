<template>
  <bo-page
    :tips="tips"
    :form-options="formOptions"
    :tabs="tabs"
    :loading.sync="loading"
    @search="handleSearch($event)"
    @excel="handleSearch($event, true)"
  >
  </bo-page>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      formOptions: {
        forms: [
          { prop: 'date', label: 'Date:', itemType: 'daterange', dayRange: 7 },
        ],
        autoSearch: true
      },
      tips: [
        '本页面所有的统计单位均为钻石数量（颗）',
        'Total：全服的钻石消耗数量（并非后面所有统计项简单相加）',
        'Gold/Avatar Exchange等：玩家使用钻石兑换Gold/Avatar等的钻石数量。',
        'Other：其他未标明钻石使用渠道和方式，但是却是实际产生消耗的钻石数量。',
        'Country：由产生钻石消耗的玩家的国家归属进行钻石消耗分类和统计。'
      ],
      tabs: [
        {
          label: 'consumption',
          columns: [
            { prop: 'name', label: 'Country' },
            { prop: 'mobile', label: 'Total' },
            { prop: 'num', label: 'Chip Exchange', filter: 'number' },
            { prop: 'sex', label: 'Creating Clan', filter: 'number' },
          ],
          tableOptions: {
            data: [],
            summary: { type: 'avg', precision: 2}
          }
        },
        {
          label: 'source',
          columns: [
            { prop: 'name', label: 'Country' },
            { prop: 'mobile', label: 'Total' },
            { prop: 'num', label: 'Chip Exchange', filter: 'number' },
            { prop: 'sex', label: 'Creating Clan', filter: 'number' },
          ],
          tableOptions: {
            data: [],
            summary: { type: 'avg', precision: 2}
          }
        }
      ]
    }
  },
  methods: {
    async getData() {
      let exec = true
      return async() => {
        if(exec) {
          await setTimeout(() => {
            console.log('get data')
            exec = false
          }, 1000);
        }
      }
    },
    async handleSearch() {
      var getData = await this.getData()
      await getData()

      console.log('fdf')
      await getData()

      setTimeout(() => {
         this.tabs[0].tableOptions.data =  [
          { name: "Sam", mobile: "15299xxxx", num: 1635218799, sex: 0 },
          { name: "Jean", mobile: "13452xxxx", num: 20210111, sex: 1 },
          { name: "Tony", mobile: "187233xxxx", num: 1234567, sex: 0 },
          { name: "Sam", mobile: "15299xxxx", num: 1234567, sex: 0 },
          { name: "Jean", mobile: "13452xxxx", num: 1234567, sex: 1 },
          { name: "Tony", mobile: "187233xxxx", num: 1234567, sex: 0 },
          { name: "Sam", mobile: "15299xxxx", num: 1234567, sex: 0 },
          { name: "Jean", mobile: "13452xxxx", num: 1234567, sex: 1 },
          { name: "Tony", mobile: "187233xxxx", num: 1234567, sex: 0 },
        ]
      }, 2000);

      setTimeout(() => {
        this.tabs[1].tableOptions.data = [
          { name: "Sam", mobile: "15299xxxx", num: 1635218799, sex: 0 },
        ]
      }, 2000);
     
        
    }
  }
}
</script>
