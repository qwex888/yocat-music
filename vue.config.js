const createThemeColorReplacerPlugin = require("./src/utils/plugin.config");
module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "", //appid
        productName: "优享音乐", //软件名称
        publish: ["github"],
        win: {
          icon: ""
        },
        mac: {
          target: "dmg",
          icon: ""
        },
        dmg: {
          title: "", //安装包名
          icon: "", //icon路径
          contents: [
            {
              x: 110,
              y: 150
            },
            {
              x: 240,
              y: 150,
              type: "link",
              path: "/Applications"
            }
          ],
          window: {
            x: 400,
            y: 400
          }
        },
        nsis: {
          oneClick: false, // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装
          allowToChangeInstallationDirectory: true // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            //注意：此处不能给默认值，否则会导致主题色动态配置失败
            // less vars，customize ant design theme
            //'primary-color': '#2f54eb',
            //'link-color': '#2f54eb',
            //'border-radius-base': '4px'
          },
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true
        },
        additionalData: `@import "@/styles/theme/index.less";`
      }
    }
  },
  configureWebpack: {
    plugins: [createThemeColorReplacerPlugin()]
  },
  assetsDir: "static"
};
