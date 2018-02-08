<template>
  <div class="article">
    <article-card v-for="article in list" :key="article.id" :article="article" />
  </div>
</template>

<script>
import api from '../api/index';
import ArticleCard from './ArticleCard';
import eventBus from '../utils/eventBus';

export default {
  name: 'Home',
  components: { 'article-card': ArticleCard },
  data() {
    return {
      date: '',
      list: [],
      isHome: true,
    };
  },
  created() {
    eventBus.$on('changeToTheme', (themeId) => {
      this.fetchThemeContentById(themeId);
    });
  },
  beforeMount() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      const url = 'https://zhihu-daily.leanapp.cn/api/v1/last-stories';

      if ('caches' in window) {
        caches.match(url).then((response) => {
          console.log(`[Cache] matched with: ${url}`);

          if (response) {
            response.json().then((json) => {
              // console.log('====================================');
              // console.log(json);
              // console.log('====================================');
              this.date = json.STORIES.date;
              this.list = json.STORIES.stories;
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
    fetchThemeContentById(id) {
      if (Number(id) === 0) return this.fetchArticles(); // homepage
      return api.getThemeContentById(id).then((res) => {
        this.list = res.data.THEMEDES && res.data.THEMEDES.stories;
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
</style>
