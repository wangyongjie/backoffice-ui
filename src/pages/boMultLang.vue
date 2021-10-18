<template>
  <bo-mult-lang
    v-model="value"
    :langs="multLang.langs"
    :form="multLang.form"
    :formItems="multLang.formItems"
    :disabled="true"
  >
  </bo-mult-lang>
</template>

<script>
import BoMultLang from "../../packages/BoMultLang";

export default {
  components: {
    BoMultLang,
  },
  data() {
    return {
      value: {
              'en': { title: 'test', textarea: 'test' },
              'br': { title: 'test1', textarea: 'test1' },
            },
      multLang: {
        langs: [
          { value: 'en', label: 'English' },
          { value: 'br', label: 'Brazie' },
          { value: 'jp', label: 'Japan' },
        ],
        form: {
          model: {
            title: '',
            textarea: '',
          },
          rules: {
            title: [{ required: true, message: "Please check the title.", trigger: "blur" }],
            textarea: [{ required: true, message: "Please check the textarea.", trigger: "blur" }],
          },
        },
        formItems: [
          {
            prop: "title",
            label: "Title",
          },
          {
            prop: "textarea",
            label: "Textarea",
            itemType: "textarea",
            showWordLimit: true,
            rows: 4,
          },
        ],
      }
    };
  },
};
</script>
