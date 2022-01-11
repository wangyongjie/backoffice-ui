<template>
  <div>
    <el-select
      style="width:180px;margin-right:8px;"
      v-model="lang"
      :disabled="disabled"
    >
      <el-option
        v-for="lan in langs"
        :key="lan.value"
        :value="lan.value"
        :label="lan.label"
      ></el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-plus" :disabled="disabled" @click="addTab(editableTabsValue)">
      {{ t('bo.multLang.addLanguageButtonText') }}
    </el-button>

    <el-tabs v-model="editableTabsValue" type="border-card" @tab-remove="removeTab" style="margin-top: 10px;">
      <el-tab-pane
        v-for="(tab, index) in editableTabs"
        :key="tab.name"
        :label="tab.title"
        :name="tab.name"
        :closable="tab.closable || index !== 0"
      >
        <el-form
          v-bind="form"
          :model="content[tab.name]"
          :disabled="disabled"
          @submit.native.prevent
        >
          <el-form-item
            v-for="(item, i) in formItems"
            :key="`${i}item`"
            v-bind="item"
          >
            <bo-form-item
              v-model="content[tab.name][item.prop]"
              :item="item"
              :form="form"
              :formModel="content[tab.name]"
             ></bo-form-item>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import locale from '../../BoLocale/mixins/locale'

export default {
  name: "BoMultLang",
  mixins: [locale],
  components: {
    BoFormItem: () => import('../../BoFormItem/src/main.vue'),
  },
  props: {
    /**
     * 用来记录value值
     */
    value: {
      type: Object,
      default: () => ({})
    },
    /**
     * 用来传入多语言配置
     */
    langs: {
      type: Array,
      default: () => ([])
    },
    /**
     * 配置语言中的form
     */
    form: {
      type: Object,
      default: () => ({})
    },
    /**
     * 配置语言中的formItems
     */
    formItems: {
      type: Array,
      default: () => ([])
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lang: 'en',
      editableTabsValue: 'en',
      editableTabs: [],
      content: {}
    }
  },
  created() {
    const arr = Object.keys(this.value);
    if(arr.length) {
      this.content = { ...this.value }

      arr.forEach(item => {
        const title = (this.langs.find(lan => lan.value === item)).label;
        this.editableTabs.push({
          title,
          name: item
        });
      })
    }else {
      this.content = {
        'en': { ...this.form.model }
      }
      if(this.langs.length) {
        this.editableTabs.push({
          title: this.langs[0].label,
          name: this.langs[0].value
        });
      }
    }
  },
  watch: {
    content: {
      handler(newValue) {
        this.$emit('input', newValue)
      },
      deep: true,
    },
  },
  methods: {
    addTab() {
      const ifExist = this.editableTabs.some(item => item.name === this.lang);
      if(ifExist) {
        this.$message({
          message: this.t('bo.multLang.languageExistMessage'),
          type: 'error'
        });
        return;
      }

      const title = (this.langs.find(item => item.value === this.lang)).label;
      this.$set(this.content, this.lang, { ...this.form.model })
      this.editableTabs.push({
        title,
        name: this.lang,
      });
      this.editableTabsValue = this.lang;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$nextTick(() => {
        delete this.content[targetName]
      })
    }
  }
};
</script>
