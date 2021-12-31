<template>
    <div class="live">
        <live-anchor
            v-for="(item, index) in list"
            :key="index"
            :person="item"
        />
    </div>
</template>

<script>
import {
    getLiveList
} from '../http/index';

import LiveAnchor from '../components/LiveAnchor.vue';

export default {
    name: 'Live',
    props: {
        loginPerson: Object
    },
    components: {
        LiveAnchor
    },
    data: () => {
        return {
            list: []
        };
    },
    async mounted() {
        this.list = (await getLiveList()).data;
        console.log('this.list', this.list);
    },
    methods: {
        async setPeople() {
        }
    }
}
</script>

<style scoped lang="less">
</style>
