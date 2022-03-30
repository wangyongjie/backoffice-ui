<template>
  <div class="bo-plus">
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="addItem"
    ></el-button>

    <div class="slot-item" v-for="(slotItem, index) in itemList" :key="index">
      <div class="btn-block" :style="{ visibility: onlyRemoveLast && (index !== itemList.length -1) ? 'hidden' : 'visible' }">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-minus"
          @click="removeItem(index)"
        ></el-button>
      </div>

      <!-- @slot 可從外部傳入 slot 給 bo-plush 使用 -->
      <slot :name="slotName" :item="slotItem" :index="index" :model="model"></slot>
    </div>
  </div>
</template>

<script>
import locale from '../../BoLocale/mixins/locale'

/**
 *  <template v-slot:slotItem="{item, index}" />
 * item: v-for item
 * index: v-for index
 */
export default {
  name: "BoPlus",
  mixins: [locale],
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
    defaultValue: {
      type: Object,
      default: () => ({})
    },
    /**
     * for v-model
     */
    value: {
      type: Array,
      default: () => [],
    },
    onlyRemoveLast: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => ({})
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
          message: this.t('bo.plus.maximumSlotSectionMessage', { maxSlots: this.maxSlots}),
          type: "error",
        });
        return;
      }
      const clonedDefaultValue = JSON.parse(JSON.stringify(this.defaultValue))
      this.itemList = [...this.itemList, clonedDefaultValue];
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
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
