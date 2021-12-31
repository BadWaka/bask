<template>
    <div
        class="search-box"
    >
        <el-input
            placeholder="请输入名称"
            v-model="value"
            clearable
            @input="handleInput"
        >
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'SearchBox',
    props: {
    },
    data: function () {
        return {
            value: ''
        }
    },
    methods: {
        handleInput(value) {
            // console.log('handleInput value', value);
            this.$emit('input', value);
        }
    }
}
</script>

<style scoped lang="less">
</style>
