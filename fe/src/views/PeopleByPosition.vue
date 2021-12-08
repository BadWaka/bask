<template>
    <div>
        <div
            v-if="positionList"
            class="flex scroll-x"
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
                    <div
                        v-for="person, personIndex in positionObj[position]"
                        :key="personIndex"
                    >
                        <div
                            v-if="person"
                            class="person"
                        >
                            {{ person.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getPeople
} from '../http/index';

export default {
    props: {
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
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 9px;
}
</style>
