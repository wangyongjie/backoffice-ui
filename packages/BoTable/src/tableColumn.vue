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
      ></table-column>
    </template>
    
    <template slot-scope="scope">
      <span v-if="column.slotName">
        <!-- Table-column Scoped Slot -->
        <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
      </span>
      <span v-else-if="column.html" v-html="column.html(scope.row)"></span>
      <span v-else-if="column.render">
        {{ column.render(scope.row) }}
      </span>
      <span v-else-if="column.filter">
        {{ scope.row[column.prop] | boFilter(column.filter) }}
      </span>
      <span v-else-if="column.pre" style="white-space: pre-wrap;">
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
          :style="column.image.style || 'width: 70px;'"
          :src="scope.row[column.prop]"
          :fit="column.image.fit || 'fill'"
        ></el-image>
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
};
</script>
