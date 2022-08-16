export default {
    title: 'OpenLayers Demo',
    description: 'OpenLayers',
    lastUpdated: true,
    head: [
        ['link',
            { rel: 'icon', href: '/logo.png' },
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],
    ],
    themeConfig: {
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        logo: "/logo.png",
        nav: [
            { text: "案例", link: "/map-controls/set-background/index" },
        ],
        socialLinks: [{ icon: "github", link: "http://10.10.20.230/architecture/map" }],
        sidebar: getSidebar(),
        lastUpdatedText: '最近更新时间'
    },

};


function getSidebar() {
    return {
        "/map-controls/": [
            {
                text: "地图控件",
                items: [
                    {
                        text: "设置背景",
                        link: "/map-controls/set-background/index.md",
                    },
                    {
                        text: "导航控件",
                        link: "/map-controls/navigation/index.md",
                    },
                    {
                        text: "基本操作",
                        link: "/map-controls/operation/index.md",
                    },
                    {
                        text: "图层控件",
                        link: "/map-controls/layer-control/index.md",
                    },
                    {
                        text: "鼠标位置",
                        link: "/map-controls/mouse-position/index.md",
                    },
                    {
                        text: "比例尺控件",
                        link: "/map-controls/scale-line/index.md",
                    },
                    {
                        text: "鹰眼控件",
                        link: "/map-controls/overview-map/index.md",
                    },
                    {
                        text: "全屏显示控件",
                        link: "/map-controls/full-screen/index.md",
                    },
                ],
            },
        ],
    }
}