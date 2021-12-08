<template>
    <div id="app">
        <fe-header msg="Welcome to Your Vue.js App"/>
        <router-view
            class="pl10p pr10p"
        >
        </router-view>
    </div>
</template>

<script>
import Header from './components/Header.vue';
// import {
//     getPeople
// } from './http/index';

export default {
    name: 'App',
    components: {
        'fe-header': Header
    },
    async mounted() {
        // const people = await getPeople();
        // console.log('people', people);
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
