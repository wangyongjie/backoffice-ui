<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="dialogWidth"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <transition name="dialog-fade">
      <el-form
        v-if="visible"
        v-bind="form"
        ref="dialogForm"
        :label-width="form.labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <el-form-item
          v-for="(item, i) in formItems"
          :key="`${i}item`"
          v-show="item.showOn ? item.showOn === form.type : true"
          v-bind="item"
        >
          <bo-form-item
            v-model="form.model"
            :item="item"
            :form="form"
            @input="onChange(item)"
          ></bo-form-item>
        </el-form-item>
      </el-form>
    </transition>
    <div slot="footer" v-if="showFooter">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">{{
        confirmTitle
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BoFormItem from "../../BoFormItem/index";
import { pickerOptionsData } from "../../config/picker-options";
import { setFormMsg, setFormItemsMsg } from "../../utils/formDefaultMessage";
/**
 * 預設寬度 50% form 靠左對齊, 600px 以下會改成 寬度 100% form 靠上對齊
 */
export default {
  name: "BoDialog",
  components: {
    BoFormItem,
  },
  computed: {
    title() {
      return this.form.type === "add" ? "Add Form" : "Edit Form";
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        // watch visible & form type to reset form
        if (value && this.form.type === "add") {
          const getDefault = (value) => {
            if (Array.isArray(value)) {
              return [];
            }
            const type = (typeof value).toLowerCase();
            const typeDefault = {
              boolean: false,
              number: 0,
              string: "",
            };
            return typeDefault[type];
          };

          const { formItems } = this.$props;

          Object.keys(this.form.model).forEach((key) => {
            this.form.model[key] =
              pickerOptionsData(formItems).params[key] ||
              getDefault(this.form.model[key]);
          });
        }
      },
    },
    form: {
      immediate: true,
      handler(form) {
        setFormMsg(form, "Please check the configuration.");
      },
    },
    formItems: {
      immediate: true,
      handler(formItems) {
        setFormItemsMsg(formItems, "Please check the configuration.");
      },
    },
  },
  props: {
    /**
     * 除了 form.type= 'add' | 'edit' (當type = add會自動清空form.model), 其他設定如
     * [Form Attributes](https://element.eleme.io/#/zh-CN/component/form#form-attributes)
     * (model, labelWidth, rules... )`
     */
    form: {
      type: Object,
      default: () => ({}),
    },
    /**
     * prop: 與 form.model 對應,
     * label: 顯示在html上,
     * itemType: 預設input, 具体参数看下面说明,
     * 當itemType: 'currency' (輸入為 string 按下confirm後會轉成 number ),
     * change: (value) => { } 當數值改變的時候呼叫
     */
    formItems: {
      type: Array,
      default: () => [],
    },
    /**
     * 是否显示 Dialog，支持 .sync 修饰符
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * confirm 按鈕是否 loading, 支持 .sync 修饰符
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * confirm 按鈕文案
     */
    confirmTitle: {
      type: String,
      default: "Confirm",
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const { formItems } = this.$props;
    return {
      dialogWidth: null,
      labelPosition: null,
      ...pickerOptionsData(formItems),
    };
  },
  methods: {
    confirm() {
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          // pasre itemType: "currency", from string to number
          this.parseCurrencyModel(this.form.model);
          /**
           * 回傳 form.model
           */
          this.$emit("confirm", { ...this.form.model });
        } else {
          this.$message.error("Form validation failed!");
          return false;
        }
      });
    },
    parseCurrencyModel(model) {
      const currencyPropList = this.formItems
        .filter((x) => x.itemType === "currency")
        .map((x) => x.prop);
      currencyPropList.forEach((prop) => {
        model[prop] = parseInt(model[prop]);
      });
    },
    closeDialog() {
      this.$emit("update:visible", false);
      this.$emit("update:loading", false);
    },
    onResize() {
      const defaultWidth = 600;
      if (window.innerWidth < defaultWidth) {
        this.dialogWidth = "100%";
        this.labelPosition = "top";
      } else {
        this.dialogWidth = "50%";
        this.labelPosition = "left";
      }
    },
    // 除了slot 其他都支援on change call formItems.change function
    onChange(item) {
      const value = this.form.model[item.prop];
      if (item.change) {
        item.change(value);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.onResize();
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
