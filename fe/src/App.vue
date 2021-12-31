<template>
    <div
        id="app"
        class="black-bg-linear white"
    >
        <fe-header
            :login-person="loginPerson"
        />
        <router-view
            :login-person="loginPerson"
            class="pl10p pr10p h1000-min"
        >
        </router-view>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import {
    authLogin
} from './http/index';

export default {
    name: 'App',
    data: function () {
        return {
            loginPerson: null
            // 测试
            // loginPerson: {}
        }
    },
    components: {
        'fe-header': Header
    },
    async created() {
        const res = await authLogin();
        console.log('res', res);
        // 登录成功将数据存到 this.$root，保证全局可用
        if (
            res
            && res.data
            && res.data._id
        ) {
            this.loginPerson = res.data;
        }
    }
}
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* max-width: 1200px; */
}
</style>
