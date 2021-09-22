// https://github.com/beautify-web/js-beautify
const beautify = require('js-beautify')
const beautifyOptions = {
    indent_size: 2,
}

export const parseDocsSourceCode = (html, args) => {
    const data = JSON.stringify(args, function (key, value) {
        if (typeof value === 'function') {
            return value.toString();
        } else {
            return value;
        }
    }, 2);

    const script = beautify(`export default {
        data() {
        return ${data};
        },
    }`, beautifyOptions)

    return {
        docs: {
            source: {
                // https://storybook.js.org/docs/react/writing-docs/doc-blocks#mdx-2
                language: 'html',
                code: `<template>
${html}
</template>
<script>
${script}
</script>
`
            }
        }
    }
}