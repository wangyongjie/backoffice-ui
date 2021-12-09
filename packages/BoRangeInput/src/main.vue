<template>
  <div>
    <el-input
      class="range-input"
      type="number"
      v-model="inputValue"
      clearable
      :placeholder="placeholder"
    >
      <el-select v-model="selectValue" slot="prepend">
        <el-option
          v-for="(option, optionIndex) in options"
          :key="optionIndex + '_local'"
          :value="option"
          :label="option"
        />
      </el-select>
    </el-input>
  </div>
</template>

<script>
/**
 * BoRangeInput 元件
 */
export default {
  name: "BoRangeInput",
  props: {
    /**
     * form.prop
     */
    prop: {
      type: String,
      default: "",
    },
    /**
     * form.rangeProp
     */
    rangeProp: {
      type: String,
      default: "",
    },
    /**
     * form.placeholder
     */
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * Range options
     * default: ['<', '≤', '=', '≥', '>']
     */
    rangeOptions: {
      type: Array,
      default: null,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.prop;
      },
      set(val) {
        this.$emit("update:prop", val);
      },
    },
    selectValue: {
      get() {
        return this.rangeProp;
      },
      set(val) {
        this.$emit("update:rangeProp", val);
      },
    },
    options() {
      return this.rangeOptions || ["<", "≤", "=", "≥", ">"];
    },
  },
  mounted() {
    this.$nextTick(() => {
      // init selectValue
      this.selectValue = this.options[0];
    });
  },
};
</script>

<style lang="scss">
.range-input {
  .el-select .el-input {
    width: 60px;
  }
  .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
