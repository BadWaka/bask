<template>
    <div
        class="person"
        @click="handlePersonClick"
    >
        <span
            class="pr20"
        >
            {{ name }}
        </span>
        <span
            v-if="showPosition && positionList && positionList[0]"
        >
            {{ positionList[0] }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        loginPerson: Object,
        name: String,
        positionList: Array,
        showPosition: {
            type: Boolean,
            default: true
        }
    },
    data: function () {
        return {
        }
    },
    methods: {
        handlePersonClick() {
            if (!this.loginPerson) {
                return;
            }
            this.$router.push(`/changePerson?name=${this.name}`);
        }
    }
}
</script>

<style scoped lang="less">
.person {
    padding: 20px;
    margin: 10px;
    width: 180px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background-color: #222;
    border-radius: 9px;
    cursor: pointer;
}
</style>
