<template>
    <div class="people">
        <div
            class="list"
        >
            <div
                v-for="item, index in list"
                :key="index"
                class="item"
            >
                <span
                    class="pr20"
                >
                    {{ item.name }}
                </span>
                <span>
                    {{ item.position }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'People',
    props: {
    },
    data: () => {
        return {
            list: []
        };
    },
    mounted() {
        this.getPeople();
    },
    methods: {
        async getPeople() {
            console.log('getPeople');
            const res = await axios({
                url: `http://localhost:8848/api/people`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                params: {
                }
            });
            this.list = res.data;
            console.log('res', res);
        }
    }
}
</script>

<style scoped lang="less">
.pr20 {
    padding-right: 20px;
}
.list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    .item {
        padding: 20px;
        margin: 10px;
        width: 200px;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        border-radius: 9px;
    }
}
</style>
