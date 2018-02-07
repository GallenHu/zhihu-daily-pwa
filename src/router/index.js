import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Article from '@/components/Article';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/article/:id',
      component: Article,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
});
