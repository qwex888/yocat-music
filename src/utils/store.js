import Store from "electron-store";
const store = new Store();

export const setStore = (name, value) => {
  return store.set(name, value);
};

export const getStore = (name) => {
  return store.get(name);
};
