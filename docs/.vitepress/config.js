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
    ignoreDeadLinks: true
};
