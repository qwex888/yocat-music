const fs = require("fs");
const path = require("path");
window.fs = fs;
window.path = path;

const { Notification } = require("electron");

// 断网提示
function showNotification(title, body) {
  new Notification({ title: title, body: body }).show();
}
window.addEventListener("offline", () => {
  showNotification("警告", "监测到网络已断开！");
});
