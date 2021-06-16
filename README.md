# electron-vue

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn electron:serve
```

### Compiles and minifies for production

```
yarn electron:build
```

### Feature

1. 升级 electron 版本，兼容 mac m1；
2. 添加打包，自动更新相关配置;
3. 通过 preload 使渲染进程拥有使用 node 模块的能力；

### 计划

1. 后期登录实现新增渲染窗口互动
2. 拖拽顶部可以移动窗口
