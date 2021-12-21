<template>
    <div class="people">
        <el-button
            type="primary"
            class="mt20"
            @click="handleByPositionClick"
        >
            {{ isByPosition ? '全部显示' : '根据位置显示' }}
        </el-button>
        <el-button
            type="primary"
            class="ml20"
            @click="handleAddPersonBtn"
        >
            添加新成员
        </el-button>
        <people-by-position
            v-if="isByPosition"
        >
        </people-by-position>
        <div
            v-else
            class="list"
        >
            <person
                v-for="item, index in list"
                :key="index"
                v-bind="item"
            >
            </person>
        </div>
    </div>
</template>

<script>
import {
    getPeople
} from '../http/index';

import PeopleByPosition from './PeopleByPosition.vue';
import Person from '../components/Person.vue';

export default {
    name: 'People',
    props: {
    },
    components: {
        PeopleByPosition,
        Person
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
        },
        handleAddPersonBtn() {
            this.$router.push(`/changePerson`);
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
        background-color: #222;
        border-radius: 9px;
    }
}
</style>
