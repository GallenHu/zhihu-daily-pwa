# zhihu-daily-pwa

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 说明
此应用只是简单的体验 PWA 技术，仿照[您的第一个 Progressive Web App](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=zh-cn) 在 `static` 文件夹下添加了 `service-worker.js` 文件，并在根目录的 `index.html` 文件中注入。

注：`service-worker.js` 中的 `filesToCache` 需要手动配置，并且本地和生产环境路径不同，需要手动修改。`cacheFiles.sh` 可能会帮到你。
