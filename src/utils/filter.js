// 格式化歌手数组
export const returnSinger = ({ singer }) => {
  if (singer === undefined || !singer || typeof singer === "string") return "";
  let singers = "";
  singer.forEach((i, s) => {
    singers += i.name + (singer.length - 1 === s ? "" : " / ");
  });
  return singers;
};
