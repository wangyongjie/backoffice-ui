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
        v-model.trim="params[form.prop]"
        clearable
        @keyup.enter.native="searchHandler"
        :placeholder="form.placeholder"
      />
      <el-select
        v-else-if="form.itemType === 'select'"
        v-model="params[form.prop]"
        :placeholder="form.placeholder"
        :multiple="form.multiple"
        clearable
      >
        <el-option
          v-for="(option, optionIndex) in form.options"
          :key="optionIndex + '_local'"
          :value="option.value"
          :label="option.label"
        />
      </el-select>

      <bo-select-input
        v-else-if="form.itemType === 'selectInput'"
        :params="params"
        :form="form"
        @onEnter="searchHandler"
      ></bo-select-input>

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
        clearable
        :picker-options="form.pickerOptions || {}"
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
        type="primary"
        icon="el-icon-download"
        @click="excelHandler"
        :loading="loading"
        v-if="showExcel"
      >
        Excel
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
import { pickerOptionsData } from "../../config/picker-options";
import { checkFormPropsDuplicates } from "../..//utils/form"

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
  },
  components: {
    BoSelect,
    BoSelectInput,
  },
  data() {
    const { forms } = this.$props;
    if (checkFormPropsDuplicates(forms)) {
      console.error('BoSearch form has duplicated prop.')
    }

    return {
      ...pickerOptionsData(forms),
    };
  },
  methods: {
    validate(prop, valid, msg) {
      if (!valid) {
        this.$message({
          message: msg,
          type: "error",
        });
      }
    },
    searchHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let temp = { ...this.params };
          if (temp.date) {
            temp.startAt = temp.date[0];
            temp.endAt = temp.date[1];
          }
          this.addParamsToUri(temp);
          delete temp.date;
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          let temp = { ...this.params };
          if (temp.date) {
            temp.startAt = temp.date[0];
            temp.endAt = temp.date[1];
          }
          delete temp.date;
          /**
           * 回傳搜尋資料
           */
          this.$emit("excel", { ...temp });
        } else {
          return false;
        }
      });
    },
    getParamsFromUrl() {
      const params = this.$route.query;
      // parse number
      const isNumeric = (num) => !isNaN(num);
      for (const key in params) {
        const row = this.forms.find((x) => x.prop === key);
        const value = params[key];
        if (row && row.itemType === "multSelect") {
          if (Array.isArray(value)) {
            params[key] = value.map((x) => (isNumeric(x) ? +x : x));
          } else {
            params[key] = [isNumeric(value) ? +value : value];
          }
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
      const query = {
        ...this.$route.query,
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
