<template>
  <div>
    model: {{ model }}
    <bo-section
        v-model="model"
        :maxSections="maxSections"
        :minShowDelete="minShowDelete"
        @input="input"
        @onDefault="onDefault"
    ></bo-section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      "model": [],
      "maxSections": 10,
      "minShowDelete": 3
    };
  },
}
</script>

