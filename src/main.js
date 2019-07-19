
// console.log('ok')
// 导入vue模块
import Vue from 'vue';

//使用路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 使用vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 导入头部，使用的是mint-ui组件中的按需导入
import { Header, Swipe, SwipeItem  } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// import 'mint-ui/lib/style.css'

// 导入app.vue组件
import app from './app.vue';

// 底部模块使用的是mui框架中,要引入样式
import './lib/dist/css/mui.min.css';

// 底部购物车的样式及字体图标
import './lib/dist/css/icons-extra.css';
import './lib/dist/fonts/mui-icons-extra.ttf';

import router from './router.js'


var vm = new Vue({
    el: '#app',
    data: {
        
    },
    router, 
    render: c =>  c(app),
})