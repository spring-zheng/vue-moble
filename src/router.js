import VueRouter from 'vue-router';
import HomeContainer  from './components/tabbar/HomeContainer.vue';
import MemberContaier from './components/tabbar/MemberContaier.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from  './components/tabbar/SearchContainer.vue';


export default 
    new VueRouter({
        routes: [
            {path: '/', redirect: '/home'},
            {path:'/home', component: HomeContainer},
            {path: '/member', component: MemberContaier},
            {path: '/shopcar', component: ShopcarContainer},
            {path: '/search', component: SearchContainer},
        ],
        linkActiveClass: 'mui-active'
    })

