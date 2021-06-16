"use strict";
const electron = require("electron");
const path = require("path");
// 引用缓存
const Store = require("electron-store");
const store = new Store();
let appTray = null;
import { app, protocol, BrowserWindow, ipcMain } from "electron";
import {
  createProtocol,
  // installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";
// 自动更新设置
import { autoUpdater } from "electron-updater";

// 快捷键设置
const globalShortcut = electron.globalShortcut;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minHeight: 600,
    minWidth: 800,
    center: true,
    frame: true,
    skipTaskbar: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      // 通过preload让渲染进程拥有使用node模块的能力
      preload: path.join(app.getAppPath(), "../public/preload.js"),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    autoUpdater.checkForUpdates();
  }

  win.on("closed", () => {
    win = null;
  });
}

//系统托盘图标目录
let trayMenuTemplate = [
  {
    label: "退出",
    click: function() {
      app.quit();
    },
  },
];
function setTray() {
  // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
  //  ，通常被添加到一个 context menu 上
  const Menu = electron.Menu;
  const Tray = electron.Tray;
  // 系统托盘右键菜单
  let trayMenuTemplate = [
    {
      // 系统托盘图标目录
      label: "退出",
      click: function() {
        app.quit();
      },
    },
  ];
  // 当前目录下的app.ico图标
  let iconPath = path.join(__dirname, "../public/favicon.ico");
  appTray = new Tray(iconPath);
  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  // 隐藏主窗口
  win.hide();
  // 设置托盘悬浮提示
  appTray.setToolTip("优享音乐");
  // 设置托盘菜单
  appTray.setContextMenu(contextMenu);
  // 单击托盘小图标显示应用
  appTray.on("click", function() {
    // 显示主程序
    win.show();
    // 关闭托盘显示
    appTray.destroy();
  });
}
let isMaximize = false;
//窗口操作
ipcMain.on("control", function(event, type) {
  if (type === "isRemember") {
    if (store.get("userConfig.closeConfirm.remember")) {
      event.reply("close-onfirm", store.get("userConfig.closeConfirm.value"));
    } else {
      event.reply("close-onfirm", "open");
    }
  } else if (type === "hide") {
    // 最小化
    win.minimize();
  } else if (type === "mize") {
    // 全屏/默认
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  } else if (type === "reside") {
    // 最小化到托盘
    setTray();
  } else if (type === "close") {
    // 关闭
    win.close();
  } else if (type === "chche-reside") {
    // 记住最小化到托盘
    store.set("userConfig.closeConfirm.remember", true);
    store.set("userConfig.closeConfirm.value", "reside");
    setTray();
  } else if (type === "chche-close") {
    // 关闭
    store.set("userConfig.closeConfirm.remember", true);
    store.set("userConfig.closeConfirm.value", "close");
    win.close();
  }
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  // 可以随时调起控制台方便调试
  globalShortcut.register("CommandOrControl+K", function() {
    win.webContents.openDevTools();
  });
  createWindow();
});

autoUpdater.on("checking-for-update", () => {});
autoUpdater.on("update-available", (info) => {
  console.log(info);
  dialog.showMessageBox({
    title: "新版本发布",
    message: "有新内容更新，稍后将重新为您安装",
    buttons: ["确定"],
    type: "info",
    noLink: true,
  });
});

autoUpdater.on("update-downloaded", (info) => {
  console.log(info);
  autoUpdater.quitAndInstall();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
