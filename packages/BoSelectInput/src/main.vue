<template>
  <div>
    <el-input
      class="select-input"
      type="text"
      v-model="params[form.prop]"
      clearable
      @keyup.enter.native="onEnter"
      :placeholder="form.placeholder"
      @blur="trimOnBlur(form.prop)"
    >
      <el-select
        v-model="form.prop"
        @change="resetSelectInputParams"
        slot="prepend"
      >
        <el-option
          v-for="(option, optionIndex) in form.options"
          :key="optionIndex + '_local'"
          :value="option.value"
          :label="option.label"
        />
      </el-select>
    </el-input>
  </div>
</template>

<script>
/**
 * BoSelectInput 元件
 */
export default {
  name: "BoSelectInput",
  props: {
    /**
     * form params
     */
    value: {
      type: Object,
      default: () => ({}),
    },
    /**
     * itemType: "selectInput"
     * selectName: 變數用來儲存 prop 的數值
     * prop: 當前選擇的 options value
     * options: 多選清單 value, label
     */
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isMounted: false,
      params: {
        ...this.value,
      },
    };
  },
  watch: {
    form: {
      immediate: true,
      handler() {
        this.resetSelectInputParams();
      },
    },
    params: {
      deep: true,
      handler(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.isMounted = true

    // 设置默认值
    this.resetSelectInputParams()
  },
  methods: {
    trimOnBlur(prop) {
      this.params[prop] = this.params[prop].trim();
    },
    resetSelectInputParams() {
      // prevent params.prop delete when form.prop change before mounted
      if (!this.isMounted) {
        return
      }
      // 先抓現有的 prop 資料
      const prop = this.params[this.form.selectName];
      // 如果 params 有舊的資料就刪除
      if (prop) {
        this.$delete(this.params, prop);
      }
      // 設定當前 prop
      this.$set(this.params, this.form.selectName, this.form.prop);
    },
    onEnter() {
      /**
       * @keyup.enter
       */
      this.$emit("onEnter");
    },
  },
};
</script>

<style lang="scss">
.select-input {
  .el-select .el-input {
    width: 110px;
  }
  .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
