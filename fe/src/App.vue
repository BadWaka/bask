<template>
    <div id="app">
        <fe-header msg="Welcome to Your Vue.js App"/>
        <!-- <el-button type="primary">主要按钮</el-button> -->
    </div>
</template>

<script>
import Header from './components/Header.vue'

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
