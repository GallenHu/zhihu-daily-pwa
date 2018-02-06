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
      api.getContentById(id).then((res) => {
        this.css = res.data.CONTENTS && res.data.CONTENTS.css[0];
        this.image = res.data.CONTENTS && res.data.CONTENTS.image;
        this.image = `https://images.weserv.nl/?url=${this.image.replace('https://', '')}`;
        this.body = res.data.CONTENTS && res.data.CONTENTS.body;
      });
    },
    addCss(fileName) {
      const $content = document.querySelector('.article-content');
      const link = document.createElement('link');

      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = fileName;

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

