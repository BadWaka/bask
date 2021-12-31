<template>
    <div class="people">
        <div
            class="flex f-jc-sb f-ai-c mt20"
        >
            <div
                class="left"
            >
                <el-button
                    type="primary"
                    @click="handleByPositionClick"
                >
                    {{ isByPosition ? '全部显示' : '根据位置显示' }}
                </el-button>
                <el-button
                    v-if="loginPerson"
                    type="primary"
                    class="ml20"
                    @click="handleAddPersonBtn"
                >
                    添加新成员
                </el-button>
            </div>
            <search-box
                @input="handleSearchBoxInput"
            />
        </div>
        <people-by-position
            v-if="isByPosition"
            :login-person="loginPerson"
        >
        </people-by-position>
        <div
            v-else
            class="list"
        >
            <person
                v-for="item, index in list"
                :key="index"
                :login-person="loginPerson"
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
import SearchBox from '../components/SearchBox.vue';

export default {
    name: 'People',
    props: {
        loginPerson: Object
    },
    components: {
        PeopleByPosition,
        Person,
        SearchBox
    },
    data: () => {
        return {
            list: [],
            listAll: [],
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
            this.listAll = JSON.parse(JSON.stringify(res.data));
        },
        // 根据搜索词得到列表
        getListBySearchQuery(query) {
            if (!query) {
                this.list = JSON.parse(JSON.stringify(this.listAll));
                return;
            }
            const newList = this.listAll.filter(item => {
                if (
                    item
                    && item.name
                    && item.name.indexOf(query) !== -1
                ) {
                    return item;
                }
            });
            this.list = newList;
        },
        handleByPositionClick() {
            this.isByPosition = !this.isByPosition;
        },
        handleAddPersonBtn() {
            this.$router.push(`/changePerson`);
        },
        // 搜索框输入事件
        handleSearchBoxInput(value) {
            // console.log('handleSearchBoxInput value', value);
            this.getListBySearchQuery(value);
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
