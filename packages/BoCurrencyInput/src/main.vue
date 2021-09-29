<template>
  <el-input type="text" v-model="displayValue" v-bind="$attrs" />
</template>

<script>
/**
 * 將輸入格式轉為千分位
 */
export default {
  name: "BoCurrencyInput",
  props: {
    value: {
      type: [String, Number]
    }
  },
  computed: {
    displayValue: {
      get() {
        if (this.value) {
          return this.value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        }
        return this.value;
      },
      set(modifiedValue) {
        const newValue = modifiedValue.replace(/[^\d.]/g, "")
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
