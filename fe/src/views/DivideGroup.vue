<template>
    <div class="divide-group">
        <div
            v-if="positionList"
            class="flex h800"
        >
            <div
                v-for="position, positionIndex in positionList"
                :key="positionIndex"
            >
                <div>
                    <div
                        class="pt20 pl20 pb10"
                    >
                        {{ position }}
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
    name: 'DivideGroup',
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
            console.log('people', people);
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
            console.log('this.positionObj', this.positionObj);
        }
    }
}
</script>

<style scoped lang="less">
.pt10 {
    padding-top: 10px;
}
.pb10 {
    padding-bottom: 10px;
}
.pt20 {
    padding-top: 20px;
}
.pb20 {
    padding-bottom: 20px;
}
.pl20 {
    padding-left: 20px;
}
.pr20 {
    padding-right: 20px;
}
.flex {
    display: flex;
}
.f1 {
    flex: 1;
}
.tac {
    text-align: center;
}
.h800 {
    height: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.person {
    padding: 20px;
    margin: 10px;
    width: 180px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 9px;
}
</style>
