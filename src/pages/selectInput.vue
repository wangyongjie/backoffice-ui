<template>
  <div>
    <bo-page
      :formOptions="formOptions"
      :columns="columns"
      :tableOptions="tableOptions"
      @search="searchHandle"
    >
      <template v-slot:options="{ row }">
        <el-button type="primary" @click="editHandle(row)">Edit</el-button>
      </template>
    </bo-page>
    <bo-dialog
      v-bind="editDialog"
      :visible.sync="editDialogVisible"
      @confirm="confirm"
    ></bo-dialog>
  </div>
</template>

<script>
import BoPage from "../../packages/BoPage";
import BoDialog from "../../packages/BoDialog";

export default {
  components: {
    BoPage,
    BoDialog,
  },
  data() {
    return {
      formOptions: {
        submitBtnText: "Search",
        forms: [
          {
            "itemType": "selectInput",
            "selectName": "selectType",
            "prop": "uids",
            "options": [{
                "value": "uids",
                "label": "UID"
              },
              {
                "value": "names",
                "label": "Names"
              }
            ],
            "urlSync": true
          },
        ],
      },
      columns: [
        {
          prop: "name",
          label: "Name",
          sortable: "custom",
        },
        {
          prop: "mobile",
          label: "Mobile",
          sortable: true,
        },
        {
          prop: "sex",
          label: "Sex",
          render: (row) => {
            const { sex } = row;
            return sex === 0 ? "Male" : sex === 1 ? "Female" : "Unknow";
          },
        },
        {
          prop: "sex",
          label: "Sex",
          html: (row) => {
            const { sex } = row;
            return sex === 0 ? '<span style="color:blue">Male</span>' : sex === 1 ? "<span>Female</span>" : "<span>Unknow</span>";
          },
        },
        {
          prop: "num",
          label: "Num",
          filter: 'number'
        },
        {
          label: "Options",
          slotName: "options",
        },
      ],
      tableOptions: {
        data: [
          { name: "Sam", mobile: "15299xxxx", num: 1234567, sex: 0 },
          { name: "Jean", mobile: "13452xxxx", num: 1234567, sex: 1 },
          { name: "Tony", mobile: "187233xxxx", num: 1234567, sex: 0 },
          { name: "Sam", mobile: "15299xxxx", num: 1234567, sex: 0 },
          { name: "Jean", mobile: "13452xxxx", num: 1234567, sex: 1 },
          { name: "Tony", mobile: "187233xxxx", num: 1234567, sex: 0 },
          { name: "Sam", mobile: "15299xxxx", num: 1234567, sex: 0 },
          { name: "Jean", mobile: "13452xxxx", num: 1234567, sex: 1 },
          { name: "Tony", mobile: "187233xxxx", num: 1234567, sex: 0 },
        ],
        spanMethod: ({ rowIndex, columnIndex }) => {
          if (rowIndex % 2 === 0) {
            if (columnIndex === 0) {
              return [1, 2];
            } else if (columnIndex === 1) {
              return [0, 0];
            }
          }
        }
      },

      editDialogVisible: false,
      editDialog: {
        attr: {
          title: "Edit Dialog",
        },
        form: {
          model: {
            name: "",
            mobile: "",
            sex: 0,
          },
          labelWidth: "100px",
        },
        formItems: [
          { prop: "name", label: "Name" },
          { prop: "mobile", label: "Mobile" },
          {
            prop: "sex",
            label: "Sex",
            itemType: "select",
            options: [
              { value: 0, label: "Male" },
              { value: 1, label: "Female" },
            ],
          },
        ],
      },
    };
  },
  methods: {
    searchHandle(params) {
      console.log(params)
      setTimeout(() => {
        this.tableOptions.data = [
          { name: "Sam", mobile: "15299xxxx", sex: 0 },
          { name: "Jean", mobile: "13452xxxx", sex: 1 },
        ];
      }, 2000);
    },
    editHandle() {
      this.editDialogVisible = true;
    },
    confirm() {
    },
  },
};
</script>
