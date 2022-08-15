export default {
    title: 'OpenLayers Demo',
    description: 'OpenLayers',
    head: [
        ['link',
            { rel: 'icon', href: '/logo.png' },
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],
    ],
    themeConfig: {
        siteTitle: false,
        logo: "/logo.png",
        nav: [
            { text: "案例", link: "/map-controls/set-background" },
        ],
        socialLinks: [{ icon: "github", link: "http://10.10.20.230/architecture/map" }],
        sidebar: {
            "/map-controls/": [
                {
                    text: "地图控件",
                    items: [
                        {
                            text: "设置背景",
                            link: "/map-controls/set-background",
                        },
                    ],
                },
            ],
        },
    },
    markdown: {
        config: (md) => {
            const {
                demoBlockPlugin
            } = require('vitepress-theme-demoblock')
            md.use(demoBlockPlugin, {
                scriptImports: [
                    "import * as ElementPlus from 'element-plus'",
                    "import * as Ol from 'ol'",
                    "import * as Proj from 'ol/proj'",
                    "import * as Layer from 'ol/layer'",
                    "import * as Source from 'ol/source'",
                    "import * as Extent from 'ol/extent'",
                ],
                scriptReplaces: [
                    {
                        searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
                        replaceValue: 'const { defineComponent: _defineComponent } = Vue'
                    },
                    {
                        searchValue: /import ({.*}) from 'element-plus'/g,
                        replaceValue: (s, s1) => `const ${s1} = ElementPlus`
                    },
                    {
                        searchValue: /import ({.*}) from 'ol'/g,
                        replaceValue: (s, s1) => `const ${s1} = Ol`
                    },
                    {
                        searchValue: /import ({.*}) from 'ol\/proj'/g,
                        replaceValue: (s, s1) => `const ${s1} = Proj`
                    },
                    {
                        searchValue: /import ({.*}) from 'ol\/layer'/g,
                        replaceValue: (s, s1) => `const ${s1} = Layer`
                    },
                    {
                        searchValue: /import ({.*}) from 'ol\/source'/g,
                        replaceValue: (s, s1) => `const ${s1} = Source`
                    },
                    {
                        searchValue: /import ({.*}) from 'ol\/extent'/g,
                        replaceValue: (s, s1) => `const ${s1} = Extent`
                    }
                ]
            })
        },
    }
};
