<template>
  <div class="bo-section">
    <el-popover
      popper-class="bo-section-popover"
      placement="bottom"
      width="400"
      v-model="visible"
      @show="initSetting"
    >
      <el-input class="input" slot="reference" :value="inputValue" readonly />

      <h4 class="title">Section Setting</h4>
      <el-radio-group v-model="radioValue" @input="radioChange">
        <div class="radios-block" v-for="item in radioList" :key="item">
          <el-radio :label="item">{{ item }}</el-radio>
        </div>
      </el-radio-group>
      <div class="content" v-if="radioValue !== radioList[0]">
        <div
          class="section-block"
          v-for="(item, index) in sectionList"
          :key="`section${index}`"
        >
          Section {{ index + 1 }}:{{ index === 0 ? "(" : "[" }}
          <span class="input-block">
            <!-- left input -->
            <el-input
              v-if="index > 0"
              :value="clonedValue[index - 1]"
              size="mini"
              disabled
            >
            </el-input>
            <span v-else>- ∞</span>
          </span>
          ,
          <span class="input-block">
            <!-- right input -->
            <el-input
              v-if="index !== sectionList.length - 1"
              type="number"
              v-model="clonedValue[index]"
              @blur="adjustRange(index)"
              size="mini"
            >
            </el-input>
            <span v-else>+ ∞</span>
          </span>

          )
          <span
            v-if="
              index === sectionList.length - 1 &&
              sectionList.length >= minShowDelete
            "
          >
            <el-button
              class="delete-btn"
              icon="el-icon-close"
              type="text"
              @click="removeLastSection"
            ></el-button>
          </span>
        </div>

        <el-button
          icon="el-icon-circle-plus-outline"
          type="text"
          @click="addSection"
          >Add Section</el-button
        >
        <el-button class="default-btn" size="mini" @click="setAsDefault"
          >Set as Default</el-button
        >
      </div>

      <div class="footer">
        <el-button size="mini" @click="visible = false">Cancel</el-button>
        <el-button type="primary" size="mini" @click="confirm"
          >Confirm</el-button
        >
      </div>
    </el-popover>
  </div>
</template>

<script>
/**
 * 不支援 urlSync
 */
export default {
  name: "BoSection",
  props: {
    /**
     * max section number, default 10
     */
    maxSections: {
      type: Number,
      default: 10,
    },
    /**
     * min section number to show delete button, default 3
     */
    minShowDelete: {
      type: Number,
      default: 3,
    },
    /**
     * for v-model, Default: [], confirm 之後才會更新
     */
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      inputValue: "Default",
      radioValue: "Default",
      radioList: ["Default", "Custom"],
      clonedValue: [],
    };
  },
  computed: {
    sectionList: {
      get() {
        // set fakeLastItem for loop more than clonedValue.length
        const fakeLastItem = "fake last item";
        return [...this.clonedValue, fakeLastItem];
      },
    },
  },
  methods: {
    initSetting() {
      // reset radioValue
      this.radioValue = this.inputValue;
      this.radioChange();
    },
    radioChange() {
      // Default return []
      if (this.radioValue === this.radioList[0]) {
        this.clonedValue = [];
      }
      if (this.radioValue === this.radioList[1]) {
        this.clonedValue = this.value.length ? [...this.value] : [null];
      }
    },
    removeLastSection() {
      const lastIndex = this.clonedValue.length - 1;
      this.clonedValue = this.clonedValue.filter(
        (_, index) => index !== lastIndex
      );
    },
    addSection() {
      if (this.sectionList.length >= this.maxSections) {
        this.$message({
          message: `Maximum ${this.maxSections} sections.`,
          type: "error",
        });
        return;
      }
      this.clonedValue = [...this.clonedValue, null];
    },
    adjustRange(index) {
      const currentValue = this.clonedValue[index];
      const min = index === 0 ? null : this.clonedValue[index - 1];
      if (min !== null && currentValue < min) {
        this.$message({
          message:
            "The value must be greater than that of the previous section.",
          type: "error",
        });
      }
    },
    isValid() {
      // valid: all clonedValue with number
      let valid = true;
      this.clonedValue.forEach((x, idx) => {
        // not empty
        if (x === null) {
          valid = false;
        }
        // not greater then previous
        if (idx > 0 && x <= this.clonedValue[idx - 1]) {
          valid = false;
        }
      });

      if (!valid) {
        this.$message({
          message: "Please enter section value, pure numbers only.",
          type: "error",
        });
      }

      return valid;
    },
    setAsDefault() {
      if (!this.isValid()) {
        return;
      }
      /**
       * click 'Set as Default' button will return current value
       */
      this.$emit("onDefault", this.clonedValue);
    },
    confirm() {
      if (!this.isValid()) {
        return;
      }
      this.inputValue = this.radioValue;
      /**
       * for v-model, confirm 之後才會更新
       */
      this.$emit("input", this.clonedValue);
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.bo-section {
  .input {
    width: 160px;
  }
}
.bo-section-popover {
  .title {
    margin: 0;
  }
  .input-block {
    display: inline-block;
    width: 100px;
    margin: 5px 10px;
    text-align: center;
  }
  .radios-block {
    margin-top: 25px;
    margin-bottom: 10px;
  }
  .default-btn {
    float: right;
  }
  .delete-btn {
    color: #ccc;
  }
  .footer {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
// Remove Arrows/Spinners
.bo-section-popover {
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
