<template>
  <el-dialog
    :title="formTitle"
    :visible="visible"
    :width="dialogWidth"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <transition name="dialog-fade">
      <el-form
        v-if="visible"
        v-bind="form"
        :disabled="isPreview ? true : form.disabled"
        ref="dialogForm"
        :label-width="form.labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <template v-for="(item, i) in formItems">
          <el-form-item
            :key="`${i}item`"
            v-if="item.isExist !== undefined ? item.isExist : true"
            v-show="item.showOn ? item.showOn === form.type : true"
            v-bind="item"
          >
            <bo-form-item
              v-model="form.model[item.prop]"
              :item="item"
              :form="form"
              :formModel="form.model"
              :monthPickerOptions="monthPickerOptions"
              :pickerOptions="pickerOptions"
              @input="onChange(item)"
            >
              <!-- by pass slot for bo-table -->
              <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
              <template
                v-for="(_, name) in $scopedSlots"
                :slot="name"
                slot-scope="slotData"
                ><slot :name="name" v-bind="slotData"
              /></template>
            </bo-form-item>
          </el-form-item>
        </template>
      </el-form>
    </transition>
    <div slot="footer" v-if="showFooter">
      <!-- preview footer  -->
      <div v-if="isPreview">
        <el-button @click="closeDialog">Ok</el-button>
      </div>
      <!-- others footer  -->
      <div v-else>
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="confirm" :loading="loading">{{
          confirmTitle
        }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import BoFormItem from "../../BoFormItem/index";
import { pickerOptionsData } from "../../config/picker-options";
import { setFormMsg, setFormItemsMsg } from "../../utils/formDefaultMessage";
import {
  resetForm,
  parseCurrencyModel,
  resetNotExistModel,
} from "../../utils/form";
/**
 * 預設寬度 50% form 靠左對齊, 600px 以下會改成 寬度 100% form 靠上對齊
 */
export default {
  name: "BoDialog",
  components: {
    BoFormItem,
  },
  computed: {
    formTitle() {
      const titleByFormType = {
        add: "Add Form",
        edit: "Edit Form",
        preview: "Preview Form",
      }[this.form.type];
      return this.title || titleByFormType;
    },
    isPreview() {
      return this.form.type === "preview";
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        // default: true
        const resetOnAdd =
          this.form.resetOnAdd !== undefined ? this.form.resetOnAdd : true;
        // watch visible & form type to reset form
        if (resetOnAdd && value && this.form.type === "add") {
          const { formItems } = this.$props;
          resetForm(this.form.model, formItems, pickerOptionsData);
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
        resetNotExistModel(this.form.model, formItems);
      },
    },
  },
  props: {
    /**
     * 設定 title 後，依據 form.type 切換 title 的功能會失效
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * 除了 form.type= 'add' | 'edit' | 'preview' (當type = add會自動清空form.model), 
     * form.type = 'preview' 預設會 disabled form 表單
     * 其他設定如 [Form Attributes](https://element.eleme.io/#/zh-CN/component/form#form-attributes)
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
          parseCurrencyModel(this.form.model, this.formItems);
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
