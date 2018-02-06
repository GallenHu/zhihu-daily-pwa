<template>
  <div id="app">
    <header class="header">
      <span v-if="isHome" class="header-menu" @click="toggle()"></span>
      <span v-else class="header-back" @click="back()"></span>
      <h1>{{ title }}</h1>
      <span class="header-more"></span>
    </header>
    <aside class="aside" :class="{opened: isOpen, visible: isVisible}" @click="toggle()">
      <div class="aside-content">
        <div class="aside-content-header">
          <span><img src="https://placeholdit.co//i/100x100" alt="Avatar"></span>
        </div>
        <ul>
          <li><span>首页</span></li>
          <li v-for="(menu, index) in menuList" :key="index">
            <span>{{ menu.name }}</span>
          </li>
        </ul>
      </div>
    </aside>
    <transition name="fade" mode="out-in">
      <router-view class="main"></router-view>
    </transition>
  </div>
</template>

<script>
import api from './api/index';

export default {
  name: 'App',
  data() {
    return {
      isHome: true,
      title: '知乎日报',
      isOpen: false,
      isVisible: false,
      menuList: [],
    };
  },

  beforeMount() {
    this.fetchThemes();
  },

  updated() {
    this.isHome = this.$route.path === '/home';
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      this.isVisible = !this.isVisible;
    },
    back() {
      this.$router.go(-1);
    },
    fetchThemes() {
      api.getThemes().then((res) => {
        this.menuList = res.data.THEMES && res.data.THEMES.others;
      });
    },
  },
};
</script>

<style>
:root {
  --iconSize: .7rem;
  --mainColor: #222;
  --headerHeight: 1.5rem;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fefefe;
  background: var(--mainColor);
  padding: 0 .5rem;
  height: var(--headerHeight);
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
}
.header h1 { font-size: .6rem; }
.header-menu,
.header-back {
  padding: 0.2rem;
}
.header-menu::before,
.header-back::before {
  display: block;
  content: " ";
  width: var(--iconSize);
  height: var(--iconSize);
  background-image: url('./assets/menu.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.header-back::before {
  background-image: url('./assets/back.png');
}
.header-more { width: 1.1rem; }
.aside {
  position: fixed;
  opacity: 0;
  visibility: hidden;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
  transition: opacity .3s linear;
}
.aside.visible {
  opacity: 1;
  visibility: visible;
}
.aside-content {
  width: 7rem;
  height: 100%;
  background: #f9f9f9;
  transform: translate(-100%);
  transition: transform .3s ease;
  -webkit-overflow-scrolling: touch;
}
.aside.opened .aside-content {
  transform: translate(0);
}
.aside-content-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background: var(--mainColor);
}
.aside-content-header span {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;
}
.aside-content ul {
  overflow-y: auto;
  height: calc(100% - 3rem);
}
.aside-content ul li {
  height: 1.25rem;
  line-height: 1.25rem;
  padding-left: .2rem;
  font-size: .4rem;
}
.main {
  padding-top: var(--headerHeight);
  height: 100%;
}
</style>
