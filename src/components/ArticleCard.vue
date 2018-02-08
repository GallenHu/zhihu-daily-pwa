<template>
  <div class="article-card" @click="go(article.id)">
    <span v-if="article.images"><img :src="article.images[0].replace('http:', 'https:')" :alt="article.title"></span>
    <p>{{ article.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: { type: Object },
  },
  methods: {
    go(id) {
      this.$router.push({
        path: `article/${id}`,
      });
    },
  },
};
</script>

<style scoped>
.article-card {
  display: flex;
  align-items: center;
  width: 96%;
  margin: 0.2rem auto 0;
  min-height: 1.68rem;
  background: #fff;
  padding: 0.35rem;
  border-radius: 0.133rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
.article-card img {
  display: block;
  width: 1.867rem;
  height: 1.867rem;
}
.article-card p {
  margin-left: 0.2rem;
  font-size: 0.45rem;
  color: #333;
}
</style>
