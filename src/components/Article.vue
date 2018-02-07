<template>
  <div class="article">
    <div class="article-content" v-html="body"></div>
  </div>
</template>

<script>
import api from '../api/index';

export default {
  name: 'Article',
  data() {
    return {
      body: '',
      image: '',
      css: '',
    };
  },
  beforeMount() {
    this.fetchContent();
  },
  updated() { // fixme
    this.$nextTick(() => {
      this.addCss(this.css);
      document.querySelector('.article .img-place-holder').style = `background-image: url(${this.image})`;
    });
  },
  methods: {
    fetchContent() {
      const id = this.$route.params.id;

      const url = `https://zhihu-daily.leanapp.cn/api/v1/contents/${id}`;

      if ('caches' in window) {
        caches.match(url).then((res) => {
          console.log(`[Cache] matched with: ${url}`);

          if (res) {
            res.json().then((json) => {
              // console.log(json);
              this.css = json.data.CONTENTS.css[0];
              this.image = json.data.CONTENTS.image;
              this.image = `https://images.weserv.nl/?url=${this.image.replace('https://', '')}`;
              this.body = json.data.CONTENTS.body;
            });
          }
        });
      }

      api.getContentById(id).then((res) => {
        /**
         * TODO
         * 先拿文章的更新时间与本地缓存的文章的更新时间做对比
         * 如果网络上的文章更新时间先于缓存文章的时间，才更新内容
         * (这里的请求返回中没有更新时间字段，故缺少这块功能代码)
         */
        this.css = res.data.CONTENTS && res.data.CONTENTS.css[0];
        this.image = res.data.CONTENTS && res.data.CONTENTS.image;
        this.image = `https://images.weserv.nl/?url=${this.image.replace('https://', '')}`;
        this.body = res.data.CONTENTS && res.data.CONTENTS.body;
      }).catch((err) => {
        console.log(err);
        this.body = '<p>这是离线 mock 数据</p><p>这是离线 mock 数据</p><p>这是离线 mock 数据</p>';
      });
    },
    addCss(fileName) {
      const $content = document.querySelector('.article-content');
      const link = document.createElement('link');

      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = fileName.replace('http:', 'https:');

      $content.appendChild(link);
    },
  },
};
</script>

<style>
.article-content .img-place-holder {
  background-size: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

