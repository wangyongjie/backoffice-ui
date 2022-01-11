<template>
  <div class="bo-emoji">
    <el-input
      ref="inputRef"
      :value="value"
      @input="$emit('input', $event)"
      resize="none"
      :show-word-limit="showWordLimit"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      type="textarea"
      @blur="$emit('input', $event.target.value.trim())"
      v-on="$listeners"
    ></el-input>
    <el-popover
      width="325"
      trigger="click"
      placement="top-end"
      popper-class="bo-emoji-popper"
      class="emoji-popper"
    >
      <VEmojiPicker @select="selectEmoji" />
      <el-button
        :disabled="disabled"
        style="padding: 0"
        type="text"
        slot="reference"
      >
        <svg
          style="max-height: 18px"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 106.059 106.059"
          fill="gray"
        >
          <path
            d="M90.544 90.542c20.687-20.684 20.685-54.341.002-75.024-20.688-20.689-54.347-20.689-75.031-.006-20.688 20.687-20.686 54.346.002 75.034 20.682 20.684 54.341 20.684 75.027-.004zM21.302 21.3c17.494-17.493 45.959-17.495 63.457.002 17.494 17.494 17.492 45.963-.002 63.455-17.494 17.494-45.96 17.496-63.455.003-17.498-17.498-17.496-45.966 0-63.46zM27 69.865s-2.958-11.438 6.705-8.874c0 0 17.144 9.295 38.651 0 9.662-2.563 6.705 8.874 6.705 8.874C73.539 86.824 53.03 85.444 53.03 85.444S32.521 86.824 27 69.865zm6.24-31.194a6.202 6.202 0 1 1 12.399.001 6.202 6.202 0 0 1-12.399-.001zm28.117 0a6.202 6.202 0 1 1 12.403.001 6.202 6.202 0 0 1-12.403-.001z"
          ></path>
        </svg>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
/**
 * Lib: https://github.com/joaoeudes7/V-Emoji-Picker
 * Reference: https://www.codenong.com/cs106579577/
 */
import { VEmojiPicker } from "v-emoji-picker";

export default {
  name: "BoEmoji",
  props: {
    /**
     * v-model value
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * [同 elemnent-ui input](https://element.eleme.io/#/en-US/component/input#textarea)
     */
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    /**
     * [同 elemnent-ui input](https://element.eleme.io/#/en-US/component/input#textarea)
     * rows 預設為 1 視同 input
     */
    rows: {
      type: Number,
      default: 1,
    },
    /**
     * [同 elemnent-ui input](https://element.eleme.io/#/en-US/component/input#textarea)
     */
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * [同 elemnent-ui input](https://element.eleme.io/#/en-US/component/input#textarea)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VEmojiPicker,
  },
  methods: {
    selectEmoji(emoji) {
      const changeSelectedText = (obj, str) => {
        if (window.getSelection) {
          // 非IE浏览器
          obj.setRangeText(str);
          // 在未选中文本的情况下，重新设置光标位置
          obj.selectionStart += str.length;
          obj.focus();
        } else if (document.selection) {
          // IE浏览器
          obj.focus();
          const sel = document.selection.createRange();
          sel.text = str;
        }
      };
      // const textArea = this.$slots.default[0].elm.children[0];
      const inputRef = this.$refs.inputRef.$el.children[0];
      changeSelectedText(inputRef, emoji.data);
    },
  },
};
</script>
<style lang="scss" scoped>
.bo-emoji {
  position: relative;

  .emoji-popper {
    position: absolute;
    width: 25px;
    height: 25px;
    bottom: 2px;
    right: 0;
  }
}
</style>
<style lang="scss">
// overwrite element ui popover style
.bo-emoji-popper {
  padding: 0;
  // popper triangle color
  &.el-popper[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #f0f0f0;
  }
}
</style>
