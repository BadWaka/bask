import Vue from 'vue';

import VueRouter from 'vue-router';

import ElementUI from 'element-ui';

import './styles/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/global.css';

import App from './App.vue';
import Index from './views/Index.vue';
import People from './views/People.vue';
import ChangePerson from './views/ChangePerson.vue';
import DivideGroup from './views/DivideGroup.vue';
import Login from './views/Login.vue';
import Live from './views/Live.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/people',
        component: People
    },
    {
        path: '/changePerson',
        component: ChangePerson
    },
    {
        path: '/divideGroup',
        component: DivideGroup
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/live',
        component: Live
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
