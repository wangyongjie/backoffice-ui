<template>
  <el-table-column
    v-bind="column"
    :align="column.align || 'center'"
    :sortable="column.sortable || false"
  >
    <template v-if="column.children && column.children.length">
      <table-column
        v-for="(child, index) in column.children"
        :key="index"
        :column="child"
      >
        <!-- by pass slot for bo-table -->
        <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
        <template
          v-for="(_, name) in $scopedSlots"
          :slot="name"
          slot-scope="slotData"
          ><slot :name="name" v-bind="slotData"
        /></template>
      </table-column>
    </template>

    <template slot-scope="scope">
      <span v-if="column.slotName">
        <!-- Table-column Scoped Slot -->
        <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
      </span>
      <span v-else-if="column.html" v-html="column.html(scope.row)"></span>
      <span v-else-if="column.render">
        {{ column.render(scope.row) | boFilter(column.filter || "") }}
      </span>
      <span v-else-if="column.filter">
        {{ scope.row[column.prop] | boFilter(column.filter) }}
      </span>
      <span v-else-if="column.pre" style="white-space: pre-wrap">
        {{ scope.row[column.prop] }}
      </span>
      <!-- target: https://www.w3schools.com/tags/att_a_target.asp  -->
      <span v-else-if="column.linkPrefix">
        <el-link
          :href="column.linkPrefix + scope.row[column.prop]"
          type="primary"
          :target="column.target || '_blank'"
        >
          {{ scope.row[column.prop] }}
        </el-link>
      </span>
      <span v-else-if="column.image">
        <el-image
          class="bo-table-image"
          :style="column.image.style || 'width: 70px;height: 70px;'"
          :src="scope.row[column.prop]"
          :fit="column.image.fit || 'contain'"
          @click="toggleImage(scope.row[column.prop])"
        >
          <div v-if="column.errorMsg" slot="error" class="image__error">
            {{ column.errorMsg }}
          </div>
        </el-image>
      </span>
      <span v-else>
        {{ scope.row[column.prop] }}
      </span>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "TableColumn",
  props: {
    column: Object,
    default: () => ({}),
  },
  methods: {
    toggleImage(src) {
      if (!src) {
        return
      }
      this.$emit("toggleImage", src);
    },
  },
};
</script>
<style lang="scss" scoped>
.bo-table-image {
  cursor: pointer;
}
</style>
<style lang="scss">
.bo-table-image {
  .image__error {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #c0c4cc;
    vertical-align: middle;
    background: #f5f7fa;
    padding: 10px 20px;
    white-space: nowrap;
    width: 100%;
    height: 100%;
  }
}
</style>
