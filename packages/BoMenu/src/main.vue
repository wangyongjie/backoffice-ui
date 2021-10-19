<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      class="bo-menu"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(me, index) in menus"
        :key="index"
        :index="me.index"
        >{{ me.label }}</el-menu-item
      >
    </el-menu>

    <div v-for="(me, index) in menus" :key="index">
      <div v-if="activeIndex === me.index" style="margin-top: 20px">
        <!-- @slot 可從外部傳入 stemplate slot name 使用 -->
        <slot :name="me.index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoMenu",
  props: {
    /**
     *  menu switch by index slot name { index, label }
     */
    menus: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      activeIndex: "",
    };
  },
  created() {
    let item = this.menus.find((item) => item.default);
    this.activeIndex = item ? item.index : this.menus[0].index;
    this.setTabFromUrl();
  },
  methods: {
    handleSelect(key) {
      if (this.activeIndex !== key) {
        this.activeIndex = key;
        this.addTabToUri();
      }
    },
    setTabFromUrl() {
      const tab = this.$route.query.tab;
      if (tab) {
        this.activeIndex = tab;
      }
    },
    addTabToUri() {
      const query = { tab: this.activeIndex };
      this.$router.replace({ query });
    },
  },
};
</script>

<style lang="css">
.bo-menu.el-menu--horizontal .el-menu-item {
  height: 54px;
  line-height: 54px;
  font-weight: 500;
}
</style>
