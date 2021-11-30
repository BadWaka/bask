import Vue from 'vue';

import VueRouter from 'vue-router';

import ElementUI from 'element-ui';

import './styles/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/global.css';

import App from './App.vue';
import People from './views/People.vue';
import DivideGroup from './views/DivideGroup.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(VueRouter);

const routes = [
    {
        path: '/people',
        component: People
    },
    {
        path: '/divideGroup',
        component: DivideGroup
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
