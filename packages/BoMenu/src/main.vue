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

    <div class="container" style="margin-top: 20px">
      <!-- Tree -->
      <div v-if="treeData" class="tree-block">
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="nodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="node.parent.level === 0 && data.children">
              ({{ data.children.length }})
            </span>
          </span>
        </el-tree>
      </div>

      <!-- Page slot -->
      <keep-alive>
        <!-- @slot 可從外部傳入 stemplate slot name 使用 -->
        <slot :name="activeIndex" v-if="keepAlive"></slot>
      </keep-alive>
      <slot :name="activeIndex" v-if="!keepAlive"></slot>
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
      activeIndex: "",
    };
  },
  computed: {
    treeData() {
      const menu = this.menus.find((x) => x.index === this.activeIndex);
      return menu.tree || null
    }
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
    // Tree
    nodeClick(data, node, el) {
      /**
       * 节点被点击时的回调  
       * 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
       */
      this.$emit('node-click', data, node, el)
    }
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
}
</style>

<style lang="css">
.bo-menu.el-menu--horizontal .el-menu-item {
  height: 54px;
  line-height: 54px;
  font-weight: 500;
}
</style>
