
// console.log('ok')
// 导入vue模块
import Vue from 'vue';

//使用路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 使用vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 导入moment时间插件
import moment from 'moment';
// 使用全局过滤器改造时间
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
   return moment(dataStr).format(pattern)
 })

//  导入vue-preview缩略图插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//全局配置根目录
Vue.http.options.root = 'http://www.liulongbin.top:3005/';

// 全局设置post请求的第三个参数
Vue.http.options.emulateJSON = true;



// 导入头部，使用的是mint-ui组件中的按需导入
// import { Header, Swipe, SwipeItem, Button, Lazyload  } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload); //图片懒加载

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);


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