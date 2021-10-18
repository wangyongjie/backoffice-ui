<template>
  <div>
    <bo-page
      :formOptions="formOptions"
      :columns="columns"
      :tableOptions="tableOptions"
      @search="searchHandle"
    >
      <template v-slot:extraBtn>
        <el-button type="primary" @click="editHandle('add')">Add 1</el-button>
        <el-button type="primary" @click="editHandle('add')">Add 2</el-button>
      </template>
      <template v-slot:options="{ row }">
        <el-button type="primary" @click="editHandle('edit', row)"
          >Edit</el-button
        >
      </template>
    </bo-page>

    <bo-dialog
      v-bind="editDialog"
      :visible.sync="editDialogVisible"
      :loading.sync="editDialogLoading"
      @confirm="confirm"
    >
      <template v-slot:slotTest="{ model }">
        <el-input v-model="model.slotTest"></el-input>
      </template>
    </bo-dialog>
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
      editDialogVisible: false,
      editDialogLoading: false,
      formOptions: {
        submitBtnText: "Search",
        forms: [
          { prop: "name", label: "Name", urlSync: true },
          { prop: "mobile", label: "Mobile", urlSync: true },
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
      columns: [
        {
          prop: "uid",
          label: "Uid",
          minWidth: 140,
          linkPrefix: "/test-link?uid=",
        },
        {
          prop: "name",
          label: "Name",
          minWidth: 140,
          align: "center",
          // sortable: true, false, 'custom'
          sortable: "custom",
        },
        {
          prop: "mobile",
          label: "Mobile",
          minWidth: 140,
          align: "center",
          sortable: true,
        },
        {
          prop: "sex",
          label: "Sex",
          minWidth: 140,
          align: "center",
          render: (row) => {
            const { sex } = row;
            return sex === 0 ? "Male" : sex === 1 ? "Female" : "Unknow";
          },
        },
        {
          prop: "status",
          label: "Status",
          minWidth: 140,
          align: "center",
          html: (row) => {
            const { status } = row;
            const color = {
              1: "red",
              2: "green",
              3: "blue",
              4: "black",
            }[status];
            const text = {
              1: "Reject",
              2: "Success",
              3: "Confirm",
              4: "Pedding",
            }[status];
            return `<p style="color: ${color}">${text}</p>`;
          },
        },
        {
          prop: "url",
          label: "Image",
          minWidth: 140,
          align: "center",
          image: {
            style: null,
            fit: "",
          },
        },
        {
          prop: "currency",
          label: "Currency",
          minWidth: 140,
          filter: 'number'
        },
        {
          label: "Options",
          minWidth: 140,
          align: "center",
          slotName: "options",
        },
      ],
      tableOptions: {
        // summary: 'sum',
        summary: {
          type: 'sum',
          excludeProps: ['sex', 'status']
        },
        data: [
          {
            uid: "1",
            name: "Sam",
            mobile: "15299xxxx",
            sex: 0,
            status: 1,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "2",
            name: "Jean",
            mobile: "13452xxxx",
            sex: 1,
            status: 2,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "3",
            name: "Tony",
            mobile: "187233xxxx",
            sex: 0,
            status: 3,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "4",
            name: "Sam",
            mobile: "15299xxxx",
            sex: 0,
            status: 4,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "5",
            name: "Jean",
            mobile: "13452xxxx",
            sex: 1,
            status: 4,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "6",
            name: "Tony",
            mobile: "187233xxxx",
            sex: 0,
            status: 4,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "7",
            name: "Sam",
            mobile: "15299xxxx",
            sex: 0,
            status: 4,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "8",
            name: "Jean",
            mobile: "13452xxxx",
            sex: 1,
            status: 4,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
          {
            uid: "9",
            name: "Tony",
            mobile: "187233xxxx",
            sex: 0,
            status: 4,
            currency: 10000000,
            url:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          },
        ],
      },
      editDialog: {
        form: {
          // type: "add" (will auto reset form), "edit"
          type: "add",
          model: {
            id: 1,
            sb: "",
            fee: "",
            roomName: "",
            name: "",
            mobile: "",
            sex: 0,
            region: [],
            date: "",
            daterange: "",
            delivery: false,
            checkbox: [],
            radio: 0,
            resource: "",
            textarea: "",
            multLang: {
              'en': { title: 'test', textarea: 'test' },
              'br': { title: 'test1', textarea: 'test1' },
            },
            slotTest: "",
          },
          labelWidth: "100px",
          rules: {
            sb: [
              {
                required: true,
                trigger: "change",
              },
            ],
            fee: [
              {
                required: true,
                trigger: "change",
              },
            ],
            roomName: [
              {
                required: true,
                message: "Please check the configuration.",
                trigger: "change",
              },
            ],
            // multLang: [
            //   { validator: (rule, value, callback) => {
            //       callback(new Error('Please fill in title and text。'));
            //     }, 
            //     trigger: 'blur'
            //   }
            // ],
            slotTest: [
              {
                required: true,
                message: "Please check the configuration.",
                trigger: "blur",
              },
            ],
          },
        },
        formItems: [
          // type text, only edit
          {
            prop: "id",
            label: "ID",
            type: "number",
            itemType: "text",
            showOn: "edit",
          },
          { prop: "sb", label: "S.B.", itemType: "currency" },
          { prop: "fee", label: "Fee" },
          {
            prop: "roomName",
            label: "RoomName",
            disabledOn: "edit",
            tips: "RootNmae不可重複且不可再次修改",
          },
          {
            prop: "name",
            label: "Name",
            rules: [
              {
                required: true,
                trigger: "blur",
              },
            ],
          },
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
          {
            prop: "region",
            label: "Country",
            itemType: "multSelect",
            options: [
              { value: 0, label: "options1" },
              { value: 1, label: "options2" },
            ],
          },
          {
            prop: "multLang",
            label: "Content",
            itemType: "multLang",
            langs: [
              { value: 'en', label: 'English' },
              { value: 'br', label: 'Brazie' },
              { value: 'jp', label: 'Japan' },
            ],
            form: {
              model: {
                title: '',
                textarea: '',
              },
              rules: {
                title: [{ required: true, message: "Please check the title.", trigger: "blur" }],
                textarea: [{ required: true, message: "Please check the textarea.", trigger: "blur" }],
              },
            },
            formItems: [
              {
                prop: "title",
                label: "Title",
              },
              {
                prop: "textarea",
                label: "Textarea",
                itemType: "textarea",
                showWordLimit: true,
                rows: 4,
              },
            ],
          },
          {
            prop: "date",
            label: "Date:",
            itemType: "date",
            pastDays: 1,
          },
          {
            prop: "daterange",
            label: "Daterange:",
            itemType: "daterange",
            pastDays: 1,
          },
          {
            prop: "delivery",
            label: "Delivery:",
            itemType: "switch",
          },
          {
            prop: "checkbox",
            label: "Checkbox",
            itemType: "checkbox",
            options: [
              { label: "checkbox1" },
              { label: "checkbox2" },
              { label: "checkbox3" },
            ],
          },
          {
            prop: "radio",
            label: "Radio",
            itemType: "radio",
            options: [
              { value: 1, label: "radio1" },
              { value: 2, label: "radio2" },
              { value: 3, label: "radio3" },
            ],
          },
          {
            prop: "textarea",
            label: "Textarea",
            itemType: "textarea",
            showWordLimit: true,
            size: "medium",
            rows: 2,
          },
          {
            prop: "slotTest",
            label: "SlotTest",
            itemType: "slot",
            slotName: "slotTest",
          },
        ],
      },
    };
  },
  methods: {
    searchHandle() {
      setTimeout(() => {
        this.tableOptions.data = [
          { name: "Sam", mobile: "15299xxxx", sex: 0 },
          { name: "Jean", mobile: "13452xxxx", sex: 1 },
        ];
      }, 2000);
    },
    editHandle(type, row) {
      if (type === "edit") {
        this.editDialog.form.model = {
          ...this.editDialog.form.model,
          ...row,
          sb: "123",
          fee: "456",
        };
      }
      this.editDialog.form.type = type;
      this.editDialogVisible = true;
    },
    confirm() {
      this.editDialogLoading = true;

      setTimeout(() => {
        this.editDialogLoading = false;
      }, 2000);
    },
  },
};
</script>
