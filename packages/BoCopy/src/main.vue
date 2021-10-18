<template>
  <div class="bo-copy">
    <slot></slot>
    <el-button
      style="margin-left:3px;"
      type="primary"
      icon="el-icon-copy-document"
      size="mini"
      circle
      @click="copy"
    ></el-button>
  </div>
</template>

<script>
/**
 * 複製文字元件
 */
export default {
  name: "BoCopy",
  methods: {
    copy() {
      const text = this.$slots.default[0].text;
      const input = document.createElement("input");
      input.setAttribute("value", text);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input); 
    },
  },
};
</script>
<style lang="scss">
.bo-copy {
  display: inline-block;
  .el-button--mini.is-circle {
    padding: 4px;
  }
}
</style>
