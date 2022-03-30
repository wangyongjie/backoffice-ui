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
      <bo-form-item
        v-if="formItemSet.has(form.itemType)"
        v-model="params[form.prop]"
        :item="form"
        :formModel="params"
        :monthPickerOptions="monthPickerOptions"
        :pickerOptions="pickerOptions"
        @input="onChange(form)"
        @keyup.enter.native="searchHandler"
      />

      <bo-select-input
        v-else-if="form.itemType === 'selectInput'"
        v-model="params"
        :form="form"
        :style="form.style"
        :disabled="form.disabled"
        @onEnter="searchHandler"
      ></bo-select-input>

      <bo-select-date
        v-else-if="form.itemType === 'selectDate'"
        :value.sync="params[form.prop]"
        :period.sync="params[form.periodName]"
        :period-range="form.periodRange"
        :disabled="form.disabled"
        :style="form.style"
      ></bo-select-date>

      <bo-section
        v-else-if="form.itemType === 'section'"
        v-model="params[form.prop]"
        :maxSections="form.maxSections"
        :disabled="form.disabled"
        :minShowDelete="form.minShowDelete"
        @input="form.Econfirm"
        @onDefault="form.Edefault"
      ></bo-section>

      <el-date-picker
        v-else-if="form.itemType === 'datetimerange'"
        v-model="params[form.prop]"
        type="datetimerange"
        :clearable="false"
        :placeholder="form.placeholder"
        :picker-options="form.pickerOptions"
        :value-format="form.valueFormat || 'timestamp'"
        :format="form.format || 'yyyy-MM-dd HH:mm:ss'"
        :default-time="form.defaultTime"
        :disabled="form.disabled"
        :style="form.style"
        v-bind="form.props"
        v-on="form.events"
      />
    </el-form-item>
    <el-form-item label="">
      <el-button
        type="primary"
        icon="el-icon-search"
        v-bind="searchBtn"
        @click="searchHandler"
        :loading="loading"
      >
        {{ submitBtnText || t('bo.search.submitButtonText') }}
      </el-button>

      <el-button
        v-bind="exportBtn"
        :type="exportBtn.type || 'primary'"
        icon="el-icon-download"
        @click="excelHandler"
        :loading="loading"
        v-if="showExcel"
      >
        {{ exportBtn.text || t('bo.search.exportButtonText') }}
        <span v-if="exportBtn.percentage">
          (<animationNumber :number="exportBtn.percentage"></animationNumber>%)
        </span>
      </el-button>
    

      <!-- @slot 預設 slot, 擴充按鈕等等 -->
      <slot></slot>
      <!-- @slot 給 tips 使用的 slot -->
      <slot name="tips"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import BoFormItem from "../../BoFormItem"
import BoSelectInput from "../../BoSelectInput";
import BoSelectDate from "../../BoSelectDate";
import BoSection from "../../BoSection";
import { pickerOptionsData } from "../../config/picker-options";
import { checkFormPropsDuplicates } from "../../utils/form";
import locale from '../../BoLocale/mixins/locale'
import { animationNumber } from '../../utils/animation'

export default {
  name: "BoSearch",
  mixins: [locale],
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
    },
    searchBtn: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'animationNumber': animationNumber,
    BoFormItem,
    BoSelectInput,
    BoSelectDate,
    BoSection,
  },
  data() {
    // use BoFormItem set
    const formItemSet = new Set(['input', undefined, 'textarea', 'select', 'radio', 'multSelect', 'date', 'datetime', 'monthrange', 'daterange'])
    const { forms } = this.$props;
    if (checkFormPropsDuplicates(forms)) {
      console.error("BoSearch form has duplicated prop.");
    }
    const { params, pickerOptions, monthPickerOptions } = pickerOptionsData(
      forms
    );
    return {
      formItemSet,
      params,
      pickerOptions,
      monthPickerOptions,
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
          // console.log("dataRanges", diffTime, diffDays);
          if (diffDays > maxRangeDays) {
            isValid = false;
            this.$message({
              message: this.t('bo.search.maximumRangeDaysErrorMessage', { maxRangeDays }),
              type: "error",
            });
          }
        }
      });
      const dataTimeRanges = this.forms.filter(
        (x) => x.itemType === "datetimerange"
      );
      dataTimeRanges.forEach((x) => {
        const rangeDateTime = this.params[x.prop];
        const maxRangeDays = x.maxRangeDays;
        if (maxRangeDays && rangeDateTime && rangeDateTime.length === 2) {
          const diffTime = Math.abs(rangeDateTime[1] - rangeDateTime[0]);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // console.log("dataTimeRanges", diffTime, diffDays);
          if (diffDays > maxRangeDays) {
            isValid = false;
            this.$message({
              message: this.t('bo.search.maximumRangeDaysErrorMessage', { maxRangeDays }),
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
      const urlProp = form && params[form.selectName];
      if (urlProp) {
        form.prop = urlProp;
      }
      // parse number
      const isNumeric = (num) => !isNaN(num);
      const textItemType = ["input", undefined, "selectInput"];
      for (const key in params) {
        const row = this.forms.find((x) => x.prop === key);
        const value = params[key];
        if (row && row.itemType === "multSelect") {
          if (Array.isArray(value)) {
            this.params[key] = value.map((x) => (isNumeric(x) ? +x : x));
          } else {
            this.params[key] = [isNumeric(value) ? +value : value];
          }
        } else if (row && textItemType.includes(row.itemType)) {
          // keep selectInput value be text
          this.params[key] = value;
        } else {
          this.params[key] = isNumeric(value) ? +value : value;
        }
      }
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
        console.error(`urlSync cannot use the 'tab' keyword, it's used by BoMenu.`);
      }

      const filteredParams = {};
      for (const key in params) {
        const value = params[key];
        const hasValue = value === 0 || !!value;
        if (urlSyncList.includes(key) && hasValue) {
          filteredParams[key] = value;
        }
      }

      const tab = this.$route.query.tab;
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