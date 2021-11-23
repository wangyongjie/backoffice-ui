<template>
  <div>
    <el-input
      v-if="item.itemType === 'input' || item.itemType === undefined"
      v-model="model"
      clearable
      :type="item.type || 'text'"
      :placeholder="item.placeholder"
      :disabled="isDisabled"
      @blur="model = $event.target.value.trim()"
    />
    <bo-currency-input
      v-else-if="item.itemType === 'currency'"
      v-model="model"
      clearable
      :placeholder="item.placeholder"
      :disabled="isDisabled"
    ></bo-currency-input>
    <div v-else-if="item.itemType === 'text'">
      {{ model }}
    </div>
    <el-select
      v-else-if="item.itemType === 'select'"
      v-model="model"
      :placeholder="item.placeholder"
      :multiple="item.multiple"
      :disabled="isDisabled"
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
      v-model="model"
      :list="item.options"
      :disabled="isDisabled"
    >
    </bo-select>
    <bo-mult-lang
      v-else-if="item.itemType === 'multLang'"
      v-model="model"
      :langs="item.langs"
      :form="item.form"
      :formItems="item.formItems"
      :disabled="isDisabled"
    >
    </bo-mult-lang>
    <el-date-picker
      v-else-if="item.itemType === 'date'"
      v-model="model"
      type="date"
      :placeholder="item.placeholder"
      clearable
      :picker-options="item.pickerOptions || {}"
      :disabled="isDisabled"
    />
    <el-date-picker
      v-else-if="item.itemType === 'datetime'"
      v-model="model"
      type="datetime"
      :placeholder="item.placeholder"
      :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
      :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
      clearable
      :picker-options="item.pickerOptions || {}"
      :disabled="isDisabled"
    />
    <el-date-picker
      v-else-if="item.itemType === 'monthrange'"
      v-model="model"
      type="monthrange"
      :clearable="false"
      :value-format="item.valueFormat || 'yyyyMM'"
      :picker-options="item.pickerOptions || monthPickerOptions"
      :disabled="isDisabled"
      style="width: 280px"
    />
    <el-date-picker
      v-else-if="item.itemType === 'daterange'"
      v-model="model"
      type="daterange"
      value-format="yyyyMMdd"
      :clearable="false"
      :placeholder="item.placeholder"
      :picker-options="item.pickerOptions || pickerOptions"
      :disabled="isDisabled"
      style="width: 280px"
    />
    <el-switch
      v-else-if="item.itemType === 'switch'"
      v-model="model"
    ></el-switch>
    <el-checkbox-group
      v-else-if="item.itemType === 'checkbox'"
      v-model="model"
      :disabled="isDisabled"
    >
      <el-checkbox
        v-for="(checkbox, checkboxIndex) in item.options"
        :key="checkboxIndex"
        v-bind="checkbox"
      ></el-checkbox>
    </el-checkbox-group>
    <el-radio-group
      v-else-if="item.itemType === 'radio'"
      v-model="model"
      :disabled="isDisabled"
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
      v-model="model"
      :show-word-limit="item.showWordLimit"
      :size="item.size"
      :rows="item.rows"
      :autosize="item.autosize"
      :disabled="isDisabled"
      type="textarea"
      @blur="model = $event.target.value.trim()"
    ></el-input>
    <bo-emoji
      v-else-if="item.itemType === 'emoji'"
      v-model="model"
      :show-word-limit="item.showWordLimit"
      :size="item.size"
      :rows="item.rows"
      :autosize="item.autosize"
      :disabled="isDisabled"
    ></bo-emoji>
    <bo-image-upload
      v-else-if="item.itemType === 'imageUpload'"
      v-model="model"
      :disabled="isDisabled"
    ></bo-image-upload>
    <bo-range-input
      v-else-if="item.itemType === 'rangeInput'"
      :prop.sync="model"
      :rangeProp.sync="model[item.rangeProp]"
      :rangeOptions="item.rangeOptions"
    ></bo-range-input>
    <!-- @slot 可從外部傳入 slot 給 itemType: slot 使用 -->
    <slot
      v-else-if="item.itemType === 'slot'"
      :name="item.slotName"
      :model="formModel"
    ></slot>
    <div class="tips">
      {{ item.tips }}
    </div>
  </div>
</template>

<script>
import BoSelect from "../../BoSelect";
import BoCurrencyInput from "../../BoCurrencyInput";
import BoMultLang from "../../BoMultLang";
import BoEmoji from "../../BoEmoji";
import BoImageUpload from "../../BoImageUpload";
import BoRangeInput from "../../BoRangeInput";

export default {
  name: "BoFormItem",
  components: {
    BoSelect,
    BoCurrencyInput,
    BoMultLang,
    BoEmoji,
    BoImageUpload,
    BoRangeInput,
  },
  props: {
    /**
     * form item
     */
    item: {
      type: Object,
      default: () => ({}),
    },
    /**
     * 除了 form.type= 'add' | 'edit' (當type = add會自動清空model), 其他設定如
     * [Form Attributes](https://element.eleme.io/#/zh-CN/component/form#form-attributes)
     * (model, labelWidth, rules... )`
     */
    form: {
      type: Object,
      default: () => ({}),
    },
    /**
     * form.model for slot
     */
    formModel: {
      type: Object,
      default: () => ({}),
    },
    monthPickerOptions: {
      type: Object,
      default: () => ({}),
    },
    pickerOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * for v-model
     */
    value: {
      default: '',
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    isDisabled() {
      const type = this.form.type;
      const disabledOn = this.item.disabledOn;
      return !!type && !!disabledOn && type === disabledOn;
    },
  },
};
</script>
<style lang="scss" scoped>
.tips {
  color: #ccc;
  font-size: 12px;
}
</style>
