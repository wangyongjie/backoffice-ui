<template>
  <div class="bo-image-uploader">
    <el-upload
      action="#"
      drag
      :multiple="false"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="uploadImage"
      :disabled="disabled"
    >
      <el-image v-if="image && image.src" :fit="'contain'" :src="image.src" class="image" />
      <i v-else class="el-icon-plus bo-image-uploader-icon" />
    </el-upload>
    <el-button v-if="image && image.src && !disabled" class="clear-img" size="mini" icon="el-icon-close" round @click="resetImage" />
  </div>
</template>

<script>

export default {
  name: 'BoImageUpload',
  props: {
    /**
     * disabled 
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * v-model value 
     * {
     *  src: image url
     *  file: image file
     * }
     */
    value: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    image: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    resetImage() {
      this.image = {
        src: '',
        file: null
      }
    },
    uploadImage(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.image = {
        src: URL.createObjectURL(file.raw),
        file: file.raw
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bo-image-uploader {
  position: relative;
  width: fit-content;
  height: fit-content;

  .image {
    width: 178px;
    height: 178px;
    display: block;
  }
  .clear-img {
    position: absolute;
    right: -5px;
    top: -3px;
    padding: 5px;
  }
}
</style>
<style>
  div.el-upload-dragger {
    width: auto;
    height: auto;
  }
  .bo-image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bo-image-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .bo-image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px!important;
    text-align: center;
  }
</style>
