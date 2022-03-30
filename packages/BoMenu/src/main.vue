<template>
  <div>
    <el-menu
      :default-active="rootIndex"
      mode="horizontal"
      class="bo-menu"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(me, index) in menus"
        :key="index"
        :index="me.index || me.label"
        >{{ me.label }}</el-menu-item
      >
    </el-menu>

    <div class="container" style="margin-top: 20px">
      <!-- Tree -->
      <div v-if="treeData" class="tree-block">
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          @node-click="nodeClick"
        >
          <span
            class="custom-tree-node"
            :class="{ active: activeIndex && activeIndex === data.index }"
            slot-scope="{ node, data }"
          >
            <span>{{ node.label }}</span>
            <span v-if="node.parent.level === 0 && data.children">
              ({{ data.children.length }})
            </span>
          </span>
        </el-tree>
      </div>

      <div class="page">
        <!-- Page slot -->
        <!-- @slot 可從外部傳入 stemplate slot name 使用 -->
        <keep-alive>
          <slot :name="activeIndex" v-if="keepAlive"></slot>
        </keep-alive>
        <slot :name="activeIndex" v-if="!keepAlive"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { dfs } from "../../utils/menu";

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
    /**
     *  默认为false，如果配置true，menu互相切换时，旧的页面会缓存，不会重置数据
     */
    keepAlive: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // rootIndex = label: (tab with tree) or index: (only tab)
      rootIndex: "",
      activeIndex: "",
    };
  },
  computed: {
    treeData() {
      const menu = this.menus.find(
        (x) => (x.index || x.label) === this.rootIndex
      );
      return menu.children || null;
    },
  },
  created() {
    this.setTabFromUrl();
    this.setActiveIndex();
  },
  methods: {
    setActiveIndex(menu = this.menus) {
      let result = null;
      if (this.activeIndex) {
        result = dfs((x) => x.index === this.activeIndex, menu);
      }
      if (!result) {
        // get first default or index
        result = dfs((x) => x.default, menu) || dfs((x) => !!x.index, menu);
      }
      this.rootIndex = result.rootKey;
      this.activeIndex = result.index;

      this.addTabToUri(true);
    },
    handleSelect(key) {
      const currentMenu = this.menus.find((x) => (x.index || x.label) === key);
      this.setActiveIndex([currentMenu]);
    },
    setTabFromUrl() {
      const tab = this.$route.query.tab;
      if (tab) {
        this.activeIndex = tab;
      }
    },
    addTabToUri(merge) {
      let query = { tab: this.activeIndex };
      // fixed router replace issues when create
      if (merge) {
        query = {
          ...this.$route.query,
          ...query
        }
      }
      this.$router.replace({ query });
    },
    // Tree
    nodeClick(data) {
      if (data.index) {
        this.activeIndex = data.index;
        this.addTabToUri();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;

  .tree-block {
    margin-right: 20px;
    padding: 10px;
    background-color: white;
  }

  .page {
    width: 100%
  }

  .custom-tree-node {
    &.active {
      color: #409eff;
    }
  }
}
</style>

<style lang="css">
.bo-menu.el-menu--horizontal .el-menu-item {
  height: 54px;
  line-height: 54px;
  font-weight: 500;
}
</style>
