<template>
  <div>
    <slot :importFile="importFile" :exportFile="exportFile" />
    <input
      style="display:none"
      ref="fileRef"
      type="file"
      :accept="`.${format}`"
      @change="onFileUpload"
    />
  </div>
</template>
<script>
export default {
  name: "BoFileHandler",
  props: {
    /**
     * import & export format and input accept type
     */
    format: {
      type: String,
      default: "txt",
      validator: function(value) {
        const supportFormat = ["txt", "json"];
        return supportFormat.includes(value);
      },
    },
    /**
     * for v-model, import/export source
     */
    value: {
      type: [Object, Array, String],
    },
    /**
     * for download filename + format
     */
    filename: {
      type: String,
      default: "filename",
    },
  },
  methods: {
    importFile() {
      this.$refs.fileRef.click();
    },
    exportFile() {
      let result = this.value;
      if (this.format === "json") {
        result = JSON.stringify(result);
      }

      const anchor = document.createElement("a");
      const filePrefix = {
        txt: "data:text/plain;charset=utf-8,",
        json: "data:text/json;charset=utf-8,",
      }[this.format];

      anchor.href = filePrefix + encodeURIComponent(result);
      anchor.target = "_blank";
      anchor.download = `${this.filename}.${this.format}`;
      anchor.click();
    },
    onFileUpload(event) {
      const input = event.target.files[0];
      if (!input) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseUploadData(e.target.result);
        // reset input
        this.$refs.fileRef.value = "";
      };
      reader.readAsText(input);
    },
    parseUploadData(text) {
      let result = text;
      if (this.format === "json") {
        result = JSON.parse(result);
      }
      this.$nextTick(() => {
        /**
         * for v-model, import/export source
         */
        this.$emit("input", result);
      });
    },
  },
};
</script>
