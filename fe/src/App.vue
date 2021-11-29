<template>
    <div id="app">
        <fe-header msg="Welcome to Your Vue.js App"/>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './components/Header.vue';
// import People from './views/People.vue';

export default {
    name: 'App',
    components: {
        'fe-header': Header
    }
}
</script>

<style>
#app {
    margin: 0 auto;
    max-width: 1200px;
}
</style>
