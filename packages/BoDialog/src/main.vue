<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="dialogWidth"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
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
        <el-input
          v-if="item.itemType === 'input' || item.itemType === undefined"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          clearable
          :type="item.type || 'text'"
          :placeholder="item.placeholder"
          :disabled="form.type === item.disabledOn"
          @blur="trimOnBlur(item.prop)"
        />
        <bo-currency-input
          v-else-if="item.itemType === 'currency'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          clearable
          :placeholder="item.placeholder"
          :disabled="form.type === item.disabledOn"
        ></bo-currency-input>
        <div v-else-if="item.itemType === 'text'">
          {{ form.model[item.prop] }}
        </div>
        <el-select
          v-else-if="item.itemType === 'select'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          :placeholder="item.placeholder"
          :multiple="item.multiple"
          :disabled="form.type === item.disabledOn"
          clearable
        >
          <el-option
            v-for="(option, optionIndex) in item.options"
            :key="optionIndex + '_local'"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
        <bo-select
          v-else-if="item.itemType === 'multSelect'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          :list="item.options"
          :disabled="form.type === item.disabledOn"
        >
        </bo-select>
        <el-date-picker
          v-else-if="item.itemType === 'date'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          type="date"
          :placeholder="item.placeholder"
          clearable
          :picker-options="item.pickerOptions || {}"
          :disabled="form.type === item.disabledOn"
        />
        <el-date-picker
          v-else-if="item.itemType === 'daterange'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          type="daterange"
          value-format="yyyyMMdd"
          :clearable="false"
          :placeholder="item.placeholder"
          :picker-options="item.pickerOptions || pickerOptions"
          :disabled="form.type === item.disabledOn"
          style="width: 280px"
        />
        <el-switch
          v-else-if="item.itemType === 'switch'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
        ></el-switch>
        <el-checkbox-group
          v-else-if="item.itemType === 'checkbox'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          :disabled="form.type === item.disabledOn"
        >
          <el-checkbox
            v-for="(checkbox, checkboxIndex) in item.options"
            :key="checkboxIndex"
            v-bind="checkbox"
          ></el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          v-else-if="item.itemType === 'radio'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          :disabled="form.type === item.disabledOn"
        >
          <el-radio
            v-for="(radio, radioIndex) in item.options"
            :key="radioIndex"
            :label="radio.value"
            v-bind="radio"
            >{{ radio.label }}</el-radio
          >
        </el-radio-group>
        <el-input
          v-else-if="item.itemType === 'textarea'"
          v-model="form.model[item.prop]"
          @input="onChange(item)"
          :show-word-limit="item.showWordLimit"
          :size="item.size"
          :rows="item.rows"
          :autosize="item.autosize"
          :disabled="form.type === item.disabledOn"
          type="textarea"
          @blur="trimOnBlur(item.prop)"
        ></el-input>
        <!-- @slot 可從外部傳入 slot 給 itemType: slot 使用 -->
        <slot
          v-else-if="item.itemType === 'slot'"
          :name="item.slotName"
          :model="form.model"
        ></slot>
        <div class="tips">
          {{ item.tips }}
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="confirm" :loading="loading"
        >Confirm</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import BoSelect from "../../BoSelect";
import BoCurrencyInput from "../../BoCurrencyInput";
import { pickerOptionsData } from "../../config/picker-options";
import { setFormMsg, setFormItemsMsg } from "../../utils/formDefaultMessage";
/**
 * 預設寬度 50% form 靠左對齊, 600px 以下會改成 寬度 100% form 靠上對齊
 */
export default {
  name: "BoDialog",
  components: {
    BoSelect,
    BoCurrencyInput,
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
          Object.keys(this.form.model).forEach((key) => {
            this.form.model[key] = getDefault(this.form.model[key]);
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
      default: () => {},
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
    trimOnBlur(prop) {
      this.form.model[prop] = this.form.model[prop].trim();
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
<style lang="scss" scoped>
.tips {
  color: #ccc;
  font-size: 12px;
}
</style>
