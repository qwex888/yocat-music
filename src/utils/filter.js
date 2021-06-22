export const returnSinger = ({ ar }) => {
  if (ar === undefined || !ar || typeof ar === "string") return "";
  let singer = "";
  ar.forEach((i, s) => {
    singer += i.name + (ar.length - 1 === s ? "" : " / ");
  });
  return singer;
};
