webpackJsonp([1],{"1t4S":function(t,e){},"7Otq":function(t,e,n){t.exports=n.p+"static/img/logo.ff40a13.png"},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),a=n("mtWM"),s=n.n(a),c="https://zhihu-daily.leanapp.cn",o=function(){return s.a.get(c+"/api/v1/themes")},r=function(){return s.a.get(c+"/api/v1/last-stories")},l=function(t){return s.a.get(c+"/api/v1/contents/"+t)},h=function(t){return s.a.get(c+"/api/v1/themes/"+t)},u=new i.a,d={name:"App",data:function(){return{isHome:!0,title:"知乎日报",isOpen:!1,isVisible:!1,menuList:[]}},beforeMount:function(){this.fetchThemes()},updated:function(){this.isHome="/"===this.$route.path||"/home"===this.$route.path},methods:{toggle:function(){this.isOpen=!this.isOpen,this.isVisible=!this.isVisible},back:function(){this.$router.go(-1)},fetchThemes:function(){var t=this;o().then(function(e){t.menuList=e.data.THEMES&&e.data.THEMES.others})},changeToTheme:function(t){u.$emit("changeToTheme",t.id)}}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("header",{staticClass:"header"},[t.isHome?n("span",{staticClass:"header-menu",on:{click:function(e){t.toggle()}}}):n("span",{staticClass:"header-back",on:{click:function(e){t.back()}}}),t._v(" "),n("h1",[t._v(t._s(t.title))]),t._v(" "),n("span",{staticClass:"header-more"})]),t._v(" "),n("aside",{staticClass:"aside",class:{opened:t.isOpen,visible:t.isVisible},on:{click:function(e){t.toggle()}}},[n("div",{staticClass:"aside-content"},[t._m(0),t._v(" "),n("ul",[n("li",{on:{click:function(e){t.changeToTheme({id:0})}}},[n("span",[t._v("首页")])]),t._v(" "),t._l(t.menuList,function(e,i){return n("li",{key:i,on:{click:function(n){t.changeToTheme(e)}}},[n("span",[t._v(t._s(e.name))])])})],2)])]),t._v(" "),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view",{staticClass:"main"})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"aside-content-header"},[e("span",[e("img",{attrs:{src:n("7Otq"),alt:"Avatar"}})])])}]};var m=n("VU/8")(d,p,!1,function(t){n("ud1k")},null,null).exports,f=n("/ocq"),v={name:"ArticleCard",props:{article:{type:Object}},methods:{go:function(t){this.$router.push({path:"article/"+t})}}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-card",on:{click:function(e){t.go(t.article.id)}}},[t.article.images?n("span",[n("img",{attrs:{src:t.article.images[0].replace("http:","https:"),alt:t.article.title}})]):t._e(),t._v(" "),n("p",[t._v(t._s(t.article.title))])])},staticRenderFns:[]};var T={name:"Home",components:{"article-card":n("VU/8")(v,g,!1,function(t){n("yaun")},"data-v-bbcc6b24",null).exports},data:function(){return{date:"",list:[],isHome:!0}},created:function(){var t=this;u.$on("changeToTheme",function(e){t.fetchThemeContentById(e)})},beforeMount:function(){this.fetchArticles()},methods:{fetchArticles:function(){var t=this,e="https://zhihu-daily.leanapp.cn/api/v1/last-stories";return"caches"in window&&caches.match(e).then(function(n){console.log("[Cache] matched with: "+e),n&&n.json().then(function(e){t.date=e.STORIES.date,t.list=e.STORIES.stories})}),r().then(function(e){var n=e.data.STORIES&&e.data.STORIES.date;n<=t.date||(t.date=n,t.list=e.data.STORIES&&e.data.STORIES.stories)})},fetchThemeContentById:function(t){var e=this;return 0===Number(t)?this.fetchArticles():h(t).then(function(t){e.list=t.data.THEMEDES&&t.data.THEMEDES.stories})}}},E={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"article"},[this._l(this.list,function(t){return e("article-card",{key:t.id,attrs:{article:t}})}),this._v(">\n")],2)},staticRenderFns:[]};var _=n("VU/8")(T,E,!1,function(t){n("1t4S")},"data-v-722983d9",null).exports,C={name:"Article",data:function(){return{body:"",image:"",css:""}},beforeMount:function(){this.fetchContent()},updated:function(){var t=this;this.$nextTick(function(){var e=document.querySelector(".article .img-place-holder");t.addCss(t.css),e&&(e.style="background-image: url("+t.image+")"),document.querySelectorAll(".article img").forEach(function(t){var e=t.getAttribute("src");e.indexOf("http:")>-1&&t.setAttribute("src",e.replace("http:","https:"))})})},methods:{fetchContent:function(){var t=this,e=this.$route.params.id,n="https://zhihu-daily.leanapp.cn/api/v1/contents/"+e;"caches"in window&&caches.match(n).then(function(e){console.log("[Cache] matched with: "+n),e&&e.json().then(function(e){t.css=e.CONTENTS.css[0],t.image=e.CONTENTS.image,t.image&&(t.image="https://images.weserv.nl/?url="+t.image.replace("https://","")),t.body=e.CONTENTS.body})}),l(e).then(function(e){t.css=e.data.CONTENTS&&e.data.CONTENTS.css[0],t.image=e.data.CONTENTS&&e.data.CONTENTS.image,t.image&&(t.image="https://images.weserv.nl/?url="+t.image.replace("https://","")),t.body=e.data.CONTENTS&&e.data.CONTENTS.body}).catch(function(e){console.log(e),t.body="<p>这是离线 mock 数据</p><p>这是离线 mock 数据</p><p>这是离线 mock 数据</p>"})},addCss:function(t){var e=document.querySelector(".article-content"),n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=t.replace("http:","https:"),e.appendChild(n)}}},S={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"article"},[e("div",{staticClass:"article-content",domProps:{innerHTML:this._s(this.body)}})])},staticRenderFns:[]};var b=n("VU/8")(C,S,!1,function(t){n("YDUP")},null,null).exports;i.a.use(f.a);var y=new f.a({routes:[{path:"/home",name:"Home",component:_},{path:"/article/:id",component:b},{path:"/",name:"Home",component:_}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:y,components:{App:m},template:"<App/>"})},YDUP:function(t,e){},ud1k:function(t,e){},yaun:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c040edfa27707c4d93b3.js.map