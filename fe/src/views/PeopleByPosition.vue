<template>
    <div>
        <div
            v-if="positionList"
            class="flex"
        >
            <div
                v-for="position, positionIndex in positionList"
                :key="positionIndex"
            >
                <div>
                    <div
                        class="position-tips"
                    >
                        {{ position }}
                        <span
                            v-if="positionObj[position]"
                        >
                            {{ positionObj[position].length }}
                        </span>
                    </div>
                    <person
                        v-for="person, personIndex in positionObj[position]"
                        :key="personIndex"
                        :show-position="false"
                        :login-person="loginPerson"
                        v-bind="person"
                    >
                    </person>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getPeople
} from '../http/index';

import Person from '../components/Person.vue';

export default {
    props: {
        loginPerson: Object
    },
    components: {
        Person
    },
    data: () => {
        return {
            positionList: ['C', 'PF', 'SF', 'PG', 'SG', 'other'],
            positionObj: {
            }
        };
    },
    mounted() {
        this.initPositionObj();
        this.divideGroupByPosition();
    },
    methods: {
        initPositionObj() {
            this.positionList.forEach(position => {
                this.positionObj[position] = [];
            });
        },
        // 按位置分组
        async divideGroupByPosition() {
            const res = await getPeople();
            const people = res.data;
            this.getListByPosition(people);
        },
        getListByPosition(people) {
            people.forEach(person => {
                if (person.positionList && person.positionList[0]) {
                    const position = person.positionList[0];
                    this.positionObj[position].push(person);
                }
                else {
                    this.positionObj.other.push(person);
                }
            });
            this.positionObj = JSON.parse(JSON.stringify(this.positionObj));
        }
    }
}
</script>

<style scoped lang="less">
.position-tips {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    width: 160px;
    box-sizing: border-box;
}
.person {
    padding: 20px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    box-sizing: border-box;
    width: 140px;
    background-color: #222;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 9px;
}
</style>
