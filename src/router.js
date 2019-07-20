import VueRouter from 'vue-router';
import HomeContainer  from './components/tabbar/HomeContainer.vue';
import MemberContaier from './components/tabbar/MemberContaier.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from  './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/newsList.vue';
import NewsInfo from './components/news/newsInfo.vue';
import PhotoList from './components/photos/photoList.vue'


export default 
    new VueRouter({
        routes: [
            {path: '/', redirect: '/home'},
            { path:'/home', component: HomeContainer},
            {path: '/member', component: MemberContaier},
            {path: '/shopcar', component: ShopcarContainer},
            {path: '/search', component: SearchContainer},
            {path: '/home/newsList', component: NewsList},
            {path: '/home/newsInfo/:id', component: NewsInfo},
            {path: '/home/photoList', component: PhotoList},
        ],
        linkActiveClass: 'mui-active'
    })

