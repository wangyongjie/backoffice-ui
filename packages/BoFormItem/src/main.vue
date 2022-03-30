<template>
  <div>
    <el-input
      v-if="item.itemType === 'input' || item.itemType === undefined"
      v-model="model"
      :clearable="item.clearable !== undefined ? item.clearable : true"
      :type="item.type || 'text'"
      :placeholder="item.placeholder"
      :style="item.style"
      :disabled="isDisabled"
      @blur="model = $event.target.value.trim()"
      v-bind="item.props"
      v-on="item.events"
    >
      <template v-if="item.prependSlot !== undefined" slot="prepend">{{ item.prependSlot }}</template>
      <template v-if="item.appendSlot !== undefined" slot="append">{{ item.appendSlot }}</template>
    </el-input>
    <bo-currency-input
      v-else-if="item.itemType === 'currency'"
      v-model="model"
      clearable
      :placeholder="item.placeholder"
      :disabled="isDisabled"
      v-bind="item.props"
    ></bo-currency-input>
    <div v-else-if="item.itemType === 'text'">
      {{ model }}
    </div>
    <el-select
      v-else-if="item.itemType === 'select'"
      v-model="model"
      :placeholder="item.placeholder"
      :style="item.style"
      :multiple="item.multiple"
      :disabled="isDisabled"
      :clearable="item.clearable !== undefined ? item.clearable : true"
      :filterable="item.filterable !== undefined ? item.filterable : true"
      v-bind="item.props"
      v-on="item.events"
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
      :showType="item.showType"
      :style="item.style"
      :disabled="isDisabled"
      :isEmpty="item.isEmpty"
      :valueName="item.valueName"
      :labelName="item.labelName"
      :showBtn="item.showBtn"
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
      :format="item.format || 'yyyy-MM-dd'"
      :value-format="form.valueFormat || 'yyyyMMdd'"
      clearable
      :picker-options="item.pickerOptions || {}"
      :disabled="isDisabled"
      :style="item.style"
      v-bind="item.props"
      v-on="item.events"
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
      :style="item.style"
      v-bind="item.props"
      v-on="item.events"
    />
    <el-date-picker
      v-else-if="item.itemType === 'monthrange'"
      v-model="model"
      type="monthrange"
      :clearable="false"
      :value-format="item.valueFormat || 'yyyyMM'"
      :picker-options="item.pickerOptions || monthPickerOptions"
      :disabled="isDisabled"
      :style="item.style || { width: '280px' }"
      v-bind="item.props"
      v-on="item.events"
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
      :style="item.style || { width: '280px' }"
      v-bind="item.props"
      v-on="item.events"
    />
    <el-date-picker
      v-else-if="item.itemType === 'datetimerange'"
      v-model="model"
      type="datetimerange"
      :clearable="false"
      :placeholder="item.placeholder"
      :picker-options="item.pickerOptions"
      :value-format="item.valueFormat || 'timestamp'"
      :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
      :default-time="item.defaultTime"
      :disabled="isDisabled"
      :style="item.style"
      v-bind="item.props"
      v-on="item.events"
    />
    <el-switch
      v-else-if="item.itemType === 'switch'"
      v-model="model"
      v-bind="item.props"
      v-on="item.events"
    ></el-switch>
    <el-checkbox-group
      v-else-if="item.itemType === 'checkbox'"
      v-model="model"
      :disabled="isDisabled"
      v-bind="item.props"
      v-on="item.events"
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
      :style="item.style"
      :disabled="isDisabled"
      v-bind="item.props"
      v-on="item.events"
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
      :placeholder="item.placeholder"
      :style="item.style"
      type="textarea"
      @blur="model = $event.target.value.trim()"
      v-on="item.events"
    ></el-input>
    <bo-emoji
      v-else-if="item.itemType === 'emoji'"
      v-model="model"
      :show-word-limit="item.showWordLimit"
      :rows="item.rows"
      :autosize="item.autosize"
      :disabled="isDisabled"
      :placeholder="item.placeholder"
      v-on="item.events"
    ></bo-emoji>
    <bo-image-upload
      v-else-if="item.itemType === 'imageUpload'"
      v-model="model"
      :disabled="isDisabled"
      :onValid="item.onValid"
    ></bo-image-upload>
    <bo-range-input
      v-else-if="item.itemType === 'rangeInput'"
      :prop.sync="model"
      :rangeProp.sync="formModel[item.rangeProp]"
      :rangeOptions="item.rangeOptions"
    ></bo-range-input>
    <bo-plus
      v-else-if="item.itemType === 'plus'"
      :maxSlots="item.maxSlots"
      :slotName="item.slotName"
      :defaultValue="item.defaultValue"
      v-model="model"
      :style="item.plusStyle"
      :onlyRemoveLast="item.onlyRemoveLast"
      :model="formModel"
    >
      <!-- by pass slot -->
      <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
        ><slot :name="name" v-bind="slotData"
      /></template>
    </bo-plus>

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
import BoPlus from "../../BoPlus"

export default {
  name: "BoFormItem",
  components: {
    BoSelect,
    BoCurrencyInput,
    BoMultLang,
    BoEmoji,
    BoImageUpload,
    BoRangeInput,
    BoPlus,
  },
  props: {
    /**
     * {  
     * prop: form.model 裡的物件名稱  
     * label: form label 顯示用  
     * type: input type  
     * disabledOn: 與 form.type 相等時會自動 disabled  
     * placeholder: input placeholder  
     * props: {} element ui 原生 props  
     * events: {} element ui 原生 events  
     * }
     */
    item: {
      type: Object,
      default: () => ({}),
    },
    /**
     * isDisabled 拿 form.type 判斷 item.disabledOn 是否相等
     */
    form: {
      type: Object,
      default: () => ({}),
    },
    /**
     * itemType = slot, rangeInput 使用
     * 因為兩個地方傳入參數不同所以額外設定一個 prop 傳入 model
     * BoDialog = form.model 
     * BoMultLang = content[tab.name]
     */
    formModel: {
      type: Object,
      default: () => ({}),
    },
    /**
     * itemType:monthrange 使用之預設值
     */
    monthPickerOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * itemType:daterange 使用之預設值
     */
    pickerOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * v-model prop
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
        /**
         * v-model event
         */
        this.$emit("input", value);
      }
    },
    isDisabled() {
      const type = this.form.type;
      const disabledOn = this.item.disabledOn;
      return (!!type && !!disabledOn && type === disabledOn) || (type === "preview") || (this.item.disabled === true);
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
