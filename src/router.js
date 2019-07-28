import VueRouter from 'vue-router';
import HomeContainer  from './components/tabbar/HomeContainer.vue';
import MemberContaier from './components/tabbar/MemberContaier.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from  './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/newsList.vue';
import NewsInfo from './components/news/newsInfo.vue';
import PhotoList from './components/photos/photoList.vue';
import PhotoInfo from './components/photos/photosInfo.vue';
import goodsList from './components/goods/goodsList.vue';
import goodsInfo from './components/goods/goodsInfo.vue';
import goodsDesc from './components/goods/goodsDesc.vue';
import goodsComments from './components/goods/goodsComments.vue'


export default 
    new VueRouter({
        routes: [
            {path: '/', redirect: '/home'},
            {path:'/home', component: HomeContainer},
            {path: '/member', component: MemberContaier},
            {path: '/shopcar', component: ShopcarContainer},
            {path: '/search', component: SearchContainer},
            {path: '/home/newsList', component: NewsList},
            {path: '/home/newsInfo/:id', component: NewsInfo},
            {path: '/home/photoList', component: PhotoList},
            {path: '/home/photoInfo/:id', component: PhotoInfo},
            {path: '/home/goodsList', component: goodsList},
            {path: '/home/goodsInfo/:id', component: goodsInfo, name: 'goodsInfo'},
            {path: '/home/goodsdesc/:id', component: goodsDesc, name: 'goodsDesc'},
            {path: '/home/goodscomments/:id', component: goodsComments, name: 'goodsComments'},
        ],
        linkActiveClass: 'mui-active'
    })

