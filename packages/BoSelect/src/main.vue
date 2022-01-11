<template>
  <el-select
    :value="ppValue"
    multiple
    filterable
    :collapse-tags="collapseTags"
    @change="handleChange"
    :disabled="disabled"
    :placeholder="t('bo.select.selectPlaceholder')"
  >
    <div v-if="showBtn" style="padding: 4px 15px 8px 15px">
      <el-checkbox
        v-if="showType === 2"
        v-model="isSelectAll"
        @change="handleSelectAll"
        style="padding-left: 5px"
        >
        {{ t('bo.select.allButtonText') }}
      </el-checkbox>
      <el-button
        v-if="showType === 1 && formatList.length > 30"
        type="primary"
        :disabled="ppValue.indexOf('_all_') !== -1"
        @click="reverseAll"
        >
        {{ t('bo.select.excludeButtonText') }}
      </el-button>
    </div>
    <el-option
      v-if="showType === 1"
      :label="'All(' + list.length + ')'"
      value="_all_"
    >
    </el-option>
    <el-option
      v-for="option in formatList"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    ></el-option>
  </el-select>
</template>

<script>
import locale from "../../BoLocale/mixins/locale";

/**
 *  同 [Select multiple](https://element.eleme.io/#/zh-CN/component/select#ji-chu-duo-xuan)
 */
export default {
  name: "BoSelect",
  mixins: [locale],
  props: {
    /**
     * 绑定值
     */
    value: {
      type: Array,
      required: true,
    },
    /**
     * 多選清單 value, label
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * 多选时是否将选中值按文字的形式展示
     */
    collapseTags: {
      type: Boolean,
      default: true,
    },
    /**
     * list value 物件名 
     */
    valueName: {
      type: String,
      default: "value",
    },
    /**
     * list label 物件名 
     */
    labelName: {
      type: String,
      default: "label",
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否顯示按鈕
     */
    showBtn: {
      type: Boolean,
      default: true,
    },
    /**
     * 顯示類型 1: Exclude, 2: All
     */
    showType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isSelectAll: false,
    };
  },
  computed: {
    formatList: function () {
      let _this = this;
      return this.list.map(function (item) {
        if (typeof item !== "object") {
          return { value: item, label: item };
        } else if (
          item instanceof Object &&
          !(item instanceof Array) &&
          !(item instanceof Function)
        ) {
          let valueName = _this.valueName;
          let labelName = _this.labelName;
          return { value: item[valueName], label: item[labelName] };
        } else {
          alert("Invalid list");
          return {};
        }
      });
    },
    ppValue: function () {
      return this.value && this.value.length
        ? this.value
        : this.showType === 1
        ? ["_all_"]
        : [];
    },
  },
  methods: {
    handleChange(options) {
      if (options.length) {
        let newOptions =
          options[options.length - 1] !== "_all_"
            ? options.filter((item) => {
                return item !== "_all_";
              })
            : ["_all_"];
        // v-model upload
        this.$emit("input", newOptions);
      } else {
        let newOptions = [];
        switch (this.showType) {
          case 1:
            newOptions = ["_all_"];
            break;
        }
        // v-model upload
        this.$emit("input", newOptions);
      }
    },
    reverseAll() {
      if (this.ppValue.indexOf("_all_") === -1) {
        this.handleChange(
          this.formatList
            .map((item) => item.value)
            .filter((item) => {
              return this.ppValue.indexOf(item) === -1;
            })
        );
      }
    },
    handleSelectAll(val) {
      if (val) {
        this.handleChange(this.formatList.map((item) => item.value));
      } else {
        this.handleChange([]);
      }
    },
  },
};
</script>
