<template>
    <div class="people">
        <el-button
            type="primary"
            class="mt20"
            @click="handleByPositionClick"
        >
            {{ isByPosition ? '全部显示' : '根据位置显示' }}
        </el-button>
        <people-by-position
            v-if="isByPosition"
        >
        </people-by-position>
        <div
            v-else
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
                     {{ item.positionList[0] }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getPeople
} from '../http/index';

import PeopleByPosition from './PeopleByPosition.vue';

export default {
    name: 'People',
    props: {
    },
    components: {
        PeopleByPosition
    },
    data: () => {
        return {
            list: [],
            isByPosition: false
        };
    },
    mounted() {
        this.setPeople();
    },
    methods: {
        async setPeople() {
            const res = await getPeople();
            this.list = res.data;
        },
        handleByPositionClick() {
            this.isByPosition = !this.isByPosition;
        }
    }
}
</script>

<style scoped lang="less">
.people {
    max-width: 80%;
}
.list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    .item {
        padding: 20px;
        margin: 10px;
        width: 180px;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        border-radius: 9px;
    }
}
</style>
