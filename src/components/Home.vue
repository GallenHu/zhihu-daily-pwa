<template>
  <div class="article">
    <div class="article-card" v-for="article in list" :key="article.id" @click="go(article.id)">
      <span><img :src="article.images[0]" :alt="article.title"></span>
      <p>{{ article.title }}</p>
    </div>
  </div>
</template>

<script>
import api from '../api/index';

export default {
  name: 'Home',
  data() {
    return {
      date: '',
      list: [],
      isHome: true,
    };
  },
  beforeMount() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      const url = `https://zhihu-daily.leanapp.cn/api/v1/last-stories`;

      if ('caches' in window) {
        caches.match(url).then((res) => {
          console.log(`[Cache] matched with: ${url}`);

          if (res) {
            res.json().then((json) => {
              // console.log(json);
              this.date = json.data.STORIES.date;
              this.list = json.data.STORIES.stories;
            });
          }
        });
      }

      return api.getLastArticles().then((res) => {
        const date = res.data.STORIES && res.data.STORIES.date;

        if (date <= this.date) return;

        this.date = date;
        this.list = res.data.STORIES && res.data.STORIES.stories;
      });
    },
    go(id) {
      this.$router.push({
        path: `article/${id}`,
      });
    },
  },
};
</script>

<style scoped>
.article {
  position: absolute;
  z-index: 1;
  overflow-y: auto;
}
.article-card {
  display: flex;
  align-items: center;
  width: 96%;
  margin: .2rem auto 0;
  min-height: 1.68rem;
  background: #fff;
  padding: .35rem;
  border-radius: .133rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.19);
  cursor: pointer;
}
.article-card img {
  display: block;
  width: 1.867rem;
  height: 1.867rem;
}
.article-card p {
  margin-left: .2rem;
  font-size: .45rem;
  color: #333;
}
</style>
