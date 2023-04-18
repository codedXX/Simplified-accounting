import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Icon from '@/components/Icon.vue';
import Layout from '@/components/Layout.vue';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Icon', Icon);
Vue.component('Layout', Layout);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


if (document.documentElement.clientWidth > 500) {
    window.alert('请使用手机打开本页面，以保证浏览效果');
    const img = document.createElement('img');
    img.src = '/1.png';
    document.body.append(img);
}