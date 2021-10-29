<template>
  <el-form
    :model="params"
    :inline="true"
    ref="form"
    :show-message="false"
    @submit.native.prevent
    @validate="validate"
  >
    <el-form-item
      v-for="(form, index) in forms"
      :key="index"
      :prop="form.prop"
      :label="form.label"
      :required="form.required"
      :rules="form.rules || []"
    >
      <el-input
        v-if="form.itemType === 'input' || form.itemType === undefined"
        v-model="params[form.prop]"
        :clearable="(form.clearable !== undefined) ? form.clearable : true"
        @keyup.enter.native="searchHandler"
        :placeholder="form.placeholder"
        @change="onChange(form)"
        @blur="params[form.prop] = $event.target.value.trim()"
      />
      <el-select
        v-else-if="form.itemType === 'select'"
        v-model="params[form.prop]"
        @change="onChange(form)"
        :placeholder="form.placeholder"
        :multiple="form.multiple"
        :clearable="(form.clearable !== undefined) ? form.clearable : true"
      >
        <el-option
          v-for="(option, optionIndex) in form.options"
          :key="optionIndex + '_local'"
          :value="option.value"
          :label="option.label"
        />
      </el-select>

      <el-radio-group
          v-else-if="form.itemType === 'radio'"
          v-model="params[form.prop]"
        >
          <el-radio
            v-for="(radio, radioIndex) in form.options"
            :key="radioIndex"
            :label="radio.value"
            v-bind="radio"
            >{{ radio.label }}</el-radio
          >
        </el-radio-group>

      <bo-select-input
        v-else-if="form.itemType === 'selectInput'"
        v-model="params"
        :form="form"
        @onEnter="searchHandler"
      ></bo-select-input>

      <bo-select-date
        v-else-if="form.itemType === 'selectDate'"
        :value.sync="params[form.prop]"
        :period.sync="params[form.periodName]"
        :period-range="form.periodRange"
      ></bo-select-date>

      <bo-select
        v-else-if="form.itemType === 'multSelect'"
        v-model="params[form.prop]"
        :list="form.options"
      >
      </bo-select>
      <el-date-picker
        v-else-if="form.itemType === 'date'"
        v-model="params[form.prop]"
        type="date"
        :placeholder="form.placeholder"
        :format="form.format || 'yyyy-MM-dd'"
        :value-format="form.valueFormat || 'yyyyMMdd'"
        clearable
        :picker-options="form.pickerOptions || {}"
      />
      <el-date-picker
        v-else-if="form.itemType === 'datetime'"
        v-model="params[form.prop]"
        type="datetime"
        :placeholder="form.placeholder"
        :format="form.format || 'yyyy-MM-dd HH:mm:ss'"
        :value-format="form.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
        clearable
        :picker-options="form.pickerOptions || {}"
      />
      <el-date-picker
        v-else-if="form.itemType === 'monthrange'"
        v-model="params[form.prop]"
        type="monthrange"
        :clearable="false"
        :value-format="form.valueFormat || 'yyyyMM'"
        :picker-options="form.pickerOptions || monthPickerOptions"
        style="width: 280px"
      />
      <el-date-picker
        v-else-if="form.itemType === 'daterange'"
        v-model="params[form.prop]"
        type="daterange"
        value-format="yyyyMMdd"
        :clearable="false"
        :placeholder="form.placeholder"
        :picker-options="pickerOptions"
        style="width: 280px"
      />
    </el-form-item>
    <el-form-item label="">
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchHandler"
        :loading="loading"
      >
        {{ submitBtnText }}
      </el-button>
      <el-button
        v-bind="exportBtn"
        :type="exportBtn.type || 'primary'"
        icon="el-icon-download"
        @click="excelHandler"
        :loading="loading"
        v-if="showExcel"
      >
        {{ exportBtn.text || 'Excel' }}
      </el-button>
      <!-- @slot 預設 slot, 擴充按鈕等等 -->
      <slot></slot>
      <!-- @slot 給 tips 使用的 slot -->
      <slot name="tips"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import BoSelect from "../../BoSelect";
import BoSelectInput from "../../BoSelectInput";
import BoSelectDate from "../../BoSelectDate";
import { pickerOptionsData } from "../../config/picker-options";
import { checkFormPropsDuplicates } from "../../utils/form";

export default {
  name: "BoSearch",
  props: {
    /**
     * Label 寬 （尚未實作）
     */
    labelWidth: String,
    /**
     * form-item 寬 （尚未實作）
     */
    itemWidth: String,
    /**
     * button loading
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * submit button 文字
     */
    submitBtnText: {
      type: String,
      default: "Search",
    },
    /**
     * itemType: 預設input, 具体参数看下面说明,
     * urlSync: 讓 form 參數與 url 同步 (預設紀錄 tab 資訊),
     * 支援 prop, label, required, rules 同[Form-Item Attributes](https://element.eleme.io/#/zh-CN/component/form#form-item-attributes)
     */
    forms: {
      type: Array,
      required: true,
    },
    showExcel: {
      type: Boolean,
      default: true,
    },
    exportBtn: {
      type: Object,
      default: () => ({}),
    }
  },
  components: {
    BoSelect,
    BoSelectInput,
    BoSelectDate,
  },
  data() {
    const { forms } = this.$props;
    if (checkFormPropsDuplicates(forms)) {
      console.error("BoSearch form has duplicated prop.");
    }
    return {
      ...pickerOptionsData(forms),
    };
  },
  methods: {
    onChange(item) {
      const value = this.params[item.prop];
      if (item.change) {
        item.change(value);
      }
    },
    validate(prop, valid, msg) {
      if (!valid) {
        this.$message({
          message: msg,
          type: "error",
        });
      }
    },
    searchHandler() {
      if (!this.validateDateRange()) return;
      this.$refs.form.validate((valid) => {
        if (valid) {
          let temp = { ...this.params };
          if (temp.date && temp.date instanceof Array) {
            temp.startAt = temp.date[0];
            temp.endAt = temp.date[1];
            delete temp.date;
          }
          // stop sync data when search
          // this.addParamsToUri(temp);
          /**
           * 回傳搜尋資料
           */
          this.$emit("search", { ...temp });
        } else {
          return false;
        }
      });
    },
    excelHandler() {
      if (!this.validateDateRange()) return;
      this.$refs.form.validate((valid) => {
        if (valid) {
          let temp = { ...this.params };
          if (temp.date && temp.date instanceof Array) {
            temp.startAt = temp.date[0];
            temp.endAt = temp.date[1];
            delete temp.date;
          }
          /**
           * 回傳搜尋資料
           */
          this.$emit("excel", { ...temp });
        } else {
          return false;
        }
      });
    },
    validateDateRange() {
      let isValid = true;
      const dataRanges = this.forms.filter((x) => x.itemType === "daterange");
      dataRanges.forEach((x) => {
        const rangeDates = this.params[x.prop];
        const maxRangeDays = x.maxRangeDays;
        if (maxRangeDays && rangeDates && rangeDates.length === 2) {
          const formateDate = (str) =>
            new Date(
              `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`
            );
          const diffTime = Math.abs(
            formateDate(rangeDates[1]) - formateDate(rangeDates[0])
          );
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          console.log("dataRanges", diffTime, diffDays);
          if (diffDays > maxRangeDays) {
            isValid = false;
            this.$message({
              message: `Date range should not exceed ${maxRangeDays} days.`,
              type: "error",
            });
          }
        }
      });
      return isValid;
    },
    getParamsFromUrl() {
      const params = this.$route.query;
      // set selectInput
      const form = this.forms.find((x) => x.itemType === "selectInput");      
      const urlProp = form && params[form.selectName]
      if (urlProp) {
        form.prop = urlProp
      }
      // parse number
      const isNumeric = (num) => !isNaN(num);
      const textItemType = ['input', undefined, 'selectInput']
      for (const key in params) {
        const row = this.forms.find((x) => x.prop === key);
        const value = params[key];
        if (row && row.itemType === "multSelect") {
          if (Array.isArray(value)) {
            params[key] = value.map((x) => (isNumeric(x) ? +x : x));
          } else {
            params[key] = [isNumeric(value) ? +value : value];
          }
        } else if (row && textItemType.includes(row.itemType)) {
          // keep selectInput value be text
          params[key] = value       
        } else {
          params[key] = isNumeric(value) ? +value : value;
        }
      }

      this.params = {
        ...this.params,
        ...params,
      };
    },
    addParamsToUri(params) {
      const urlSyncList = this.forms
        .filter((x) => !!x.urlSync)
        .map((x) => x.prop);
      // 对类型为selectDate的添加新的prop
      this.forms.forEach((i) => {
        if (i.itemType === "selectDate" && !!i.urlSync) {
          urlSyncList.push(i.periodName);
        }
      });
      // 对类型为 selectInput 的添加 selectName
      this.forms.forEach((i) => {
        if (i.itemType === "selectInput" && !!i.urlSync) {
          urlSyncList.push(i.selectName);
        }
      });

      if (urlSyncList.includes("tab")) {
        alert(`urlSync cannot use the 'tab' keyword, it's used by BoMenu.`);
      }

      const filteredParams = {};
      for (const key in params) {
        const value = params[key];
        const hasValue = value === 0 || !!value;
        if (urlSyncList.includes(key) && hasValue) {
          filteredParams[key] = value;
        }
      }

      const tab = this.$route.query.tab
      const query = {
        tab,
        ...filteredParams,
      };
      this.$router.replace({ query });
    },
  },
  created() {
    this.getParamsFromUrl();
  },
};
</script>
