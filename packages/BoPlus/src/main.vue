<template>
  <div class="bo-plus">
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="addItem"
    ></el-button>

    <div class="slot-item" v-for="(slotItem, index) in itemList">
      <div class="btn-block">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-minus"
          @click="removeItem(index)"
        ></el-button>
      </div>

      <!-- @slot 可從外部傳入 slot 給 bo-plush 使用 -->
      <slot :name="slotName" :item="slotItem" :index="index"></slot>
    </div>
  </div>
</template>

<script>
/**
 *  <template v-slot:slotItem="{item, index}" />
 * item: v-for item
 * index: v-for index
 */
export default {
  name: "BoPlus",
  props: {
    /**
     * max slot number
     */
    maxSlots: {
      type: Number,
      default: 10,
    },
    /**
     * slotName
     */
    slotName: {
      type: String,
      default: "",
    },
    /**
     * for v-model
     */
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    itemList: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    removeItem(index) {
      this.itemList = this.itemList.filter((_, idx) => idx !== index);
    },
    addItem() {
      if (this.itemList.length >= this.maxSlots) {
        this.$message({
          message: `Maximum ${this.maxSlots} sections.`,
          type: "error",
        });
        return;
      }
      this.itemList = [...this.itemList, {}];
    },
  },
};
</script>
<style lang="scss" scoped>
.mt {
  margin-top: 20px;
}
.slot-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  .btn-block {
    padding: 10px;
  }
}
</style>
