import client from "webpack-theme-color-replacer/client";
import generate from "@ant-design/colors/lib/generate";

function getAntdSerials(color) {
  // 淡化（即less的tint）
  const lightens = new Array(9).fill().map((t, i) => {
    return client.varyColor.lighten(color, i / 10);
  });
  // colorPalette变换得到颜色值
  const colorPalettes = generate(color);
  const rgb = client.varyColor.toNum3(color.replace("#", "")).join(",");
  return lightens.concat(colorPalettes).concat(rgb);
}
function changeColor(newColor) {
  var options = {
    newColors: getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
    changeUrl(cssUrl) {
      return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
    },
  };
  return client.changer.changeColor(options, Promise);
}

// 换算播放量
export const setPlaybackAmount = (count) => {
  const num = String(count);
  if (num.length > 8) {
    return num.slice(0, -8) + " 亿";
  } else if (num.length > 4) {
    return num.slice(0, -4) + " 万";
  } else if (num.length > 3) {
    return num.slice(0, -3) + " 千";
  } else {
    return num;
  }
};

// 换算播放时间
export const durationTrans = (a) => {
  var b = "";
  var h = parseInt(a / 3600),
    m = parseInt((a % 3600) / 60),
    s = parseInt((a % 3600) % 60);
  if (h > 0) {
    h = h < 10 ? "0" + h : h;
    b += h + ":";
  }
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  b += m + ":" + s;
  return b;
};

export default {
  updateTheme(newPrimaryColor) {
    const hideMessage = () => console.log("正在切换主题！", 0);
    changeColor(newPrimaryColor).finally((t) => {
      setTimeout(() => {
        hideMessage();
      });
    });
  },
};
