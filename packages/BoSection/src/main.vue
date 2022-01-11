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

      <h4 class="title">
        {{ t("bo.section.popoverTitle") }}
      </h4>
      <el-radio-group v-model="radioValue" @input="radioChange">
        <div class="radios-block" v-for="item in radioList" :key="item">
          <el-radio :label="item">{{ item }}</el-radio>
        </div>
      </el-radio-group>
      <div class="content" v-if="radioValue !== radioList[0]">
        <div
          class="section-block"
          v-for="(item, index) in sectionLength"
          :key="`section${index}`"
        >
          {{ t("bo.section.section") }} {{ index + 1 }}:{{
            index === 0 ? "(" : "["
          }}
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
              v-if="index !== sectionLength - 1"
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
              index === sectionLength - 1 &&
              sectionLength >= minShowDelete
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
          >{{ t("bo.section.addSection") }}</el-button
        >
        <el-button class="default-btn" size="mini" @click="setAsDefault">{{
          t("bo.section.setAsDefault")
        }}</el-button>
      </div>

      <div class="footer">
        <el-button size="mini" @click="visible = false">
          {{ t("bo.section.cancelButtonText") }}
        </el-button>
        <el-button type="primary" size="mini" @click="confirm">
          {{ t("bo.section.confirmButtonText") }}
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
import locale from "../../BoLocale/mixins/locale";

/**
 * 不支援 urlSync
 */
export default {
  name: "BoSection",
  mixins: [locale],
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
      type: [String, Array],
      default: () => [],
    },
  },
  data() {
    const defaultText = this.t("bo.section.default")
    const customText = this.t("bo.section.custom")

    return {
      visible: false,
      defaultText,
      customText,
      inputValue: '',
      radioValue: '',
      radioList: [defaultText, customText],
      clonedValue: [],
    };
  },
  computed: {
    sectionLength() {
      // for loop more than clonedValue.length
      return this.clonedValue.length + 1
    },
  },
  mounted() {
    this.initSetting();
  },
  methods: {
    initSetting() {
      const defaultStr = this.value.length ? this.customText : this.defaultText;
      this.inputValue = defaultStr;
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
      if (this.sectionLength >= this.maxSections) {
        this.$message({
          message: this.t('bo.section.maximumSectionMessage', { maxSections: this.maxSections }),
          type: "error",
        });
        return;
      }
      this.clonedValue = [...this.clonedValue, null];
    },
    adjustRange(index) {
      const currentValue = +this.clonedValue[index];
      const min = index === 0 ? null : +this.clonedValue[index - 1];
      if (min !== null && currentValue < min) {
        this.$message({
          message: this.t('bo.section.sectionValueRangeErrorMessage'),
          type: "error",
        });
      }
    },
    isNotValid() {
      // valid: all clonedValue with number
      const isNotValid = this.clonedValue.some((x, idx) => {
        const isEmpty = x === null || x === ''
        const isNotGreaterThenPrevious = idx > 0 && +x <= +this.clonedValue[idx - 1]
        return isEmpty || isNotGreaterThenPrevious
      });

      if (isNotValid) {
        this.$message({
          message: this.t('bo.section.sectionValueTypeErrorMessage'),
          type: "error",
        });
      }

      return isNotValid;
    },
    setAsDefault() {
      if (this.isNotValid()) {
        return;
      }
      /**
       * click 'Set as Default' button will return current value
       */
      this.$emit("onDefault", this.clonedValue);
    },
    confirm() {
      if (this.isNotValid()) {
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
