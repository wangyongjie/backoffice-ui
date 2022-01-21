module.exports = {
    title: 'BackofficeUI',
    description: 'backoffice-ui',
    // base: '/backoffice-ui-docs/',
    plugins: ['demo-container'],
    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },
    themeConfig: {
        nav: [
            { text: '指南', link: '/installation' },
            { text: 'Element', link: 'https://element.eleme.io/#/zh-CN/component/installation' },
        ],
        sidebar: [
            {
                title: '开发指南',
                collapsable: false,
                children: [
                    '/installation',
                    '/changelog',
                    '/internationality'
                ]
            },
            {
                title: '功能组件',
                collapsable: false,
                children: [
                    '/basic/chart',
                    '/basic/copy',
                    '/basic/currency-input',
                    '/basic/emoji',
                    '/basic/form-item',
                    '/basic/image-upload',
                    '/basic/menu',
                    '/basic/mult-lang',
                    '/basic/pagination',
                    '/basic/plus',
                    '/basic/range-input',
                    '/basic/search',
                    '/basic/section',
                    '/basic/select-date',
                    '/basic/select-input',
                    '/basic/select',
                    '/basic/table'
                ]
            },
            {
                title: '页面组件',
                collapsable: false,
                children: [
                    '/advanced/dialog',
                    '/advanced/page'
                ]
            },
            {
                title: '全局方法',
                collapsable: false,
                children: [
                    '/global/filter',
                    '/global/plugin'
                ]
            },
        ],
        sidebarDepth: 0
    }
}