<template>
    <div class="divide-group p20">
        <!-- 人员信息 -->
        <div
            v-if="positionList"
            class="flex h400 scroll-y"
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

        <div>
            <div
                class="mt20"
            >
                <span
                    class="mr20"
                >
                    本次参赛总人数：{{ peopleGame.length }}
                </span>
                <span
                    v-if="groupList && groupList.length > 0"
                >
                    本次组数：{{ groupList.length }}
                </span>
            </div>
            <el-button
                type="primary"
                class="mt20"
                @click="divideGroup"
            >
                点击分组
            </el-button>

            <div
                v-if="groupList && groupList.length > 0"
                class="scroll flex"
            >
                <div
                    v-for="group, groupIndex in groupList"
                    :key="groupIndex"
                >
                    <div
                        class="mt20 mr20 mb20 ml20 ib width100"
                    >
                        第 {{ groupIndex + 1 }} 组
                    </div>
                    <div
                        v-for="groupPerson, groupPersonIndex in group.people"
                        :key="groupPersonIndex"
                        class="person ib"
                    >
                        <span
                            v-if="groupPerson"
                        >
                            {{ groupPerson.name }} {{ groupPerson.positionList[0] }}
                        </span>
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

import {
    getRandomInt
} from '../utils/index';

export default {
    name: 'DivideGroup',
    props: {
    },
    data: () => {
        return {
            people: [], // 总人数
            peopleGame: [], // 本次参赛总人数
            positionList: ['C', 'PF', 'SF', 'PG', 'SG', 'other'],
            positionObj: {},
            countPerGroup: 3, // 每组人数
            groupList: []
        };
    },
    mounted() {
        this.init();
    },
    methods: {

        // 初始化
        async init() {
            // 初始化位置对象
            this.positionList.forEach(position => {
                this.positionObj[position] = [];
            });

            // 直接从服务器取数据
            const res = await getPeople();
            this.people = res.data;

            // 本次参赛人数
            this.peopleGame = JSON.parse(JSON.stringify(this.people));
            this.getListByPosition(this.peopleGame);
        },

        // 根据位置获得列表数据
        getListByPosition(people) {
            people.forEach(person => {
                // 优先取位置数组的第 0 个
                if (person.positionList && person.positionList[0]) {
                    const position = person.positionList[0];
                    this.positionObj[position].push(person);
                }
                else {
                    this.positionObj.other.push(person);
                }
            });
            // 深复制，保证视图更新
            this.positionObj = JSON.parse(JSON.stringify(this.positionObj));
        },

        // 分组
        divideGroup() {

            const totalCount = this.peopleGame.length; // 总人数
            const groupCount = Math.floor(totalCount / this.countPerGroup); // 组数，向下取整
            const groupObj = {};

            this.divideGroupC(groupCount, groupObj);
            this.divideGroupG(groupCount, groupObj);
            this.divideOthers(groupCount, groupObj);

            // 转换为数组
            const groupList = Object.keys(groupObj).map(key => groupObj[key]);
            // 输出至页面
            this.groupList = JSON.parse(JSON.stringify(groupList));

            // 分组完成后初始化信息
            this.init();
        },

        // 给 C 分组
        divideGroupC(groupCount, groupObj) {
            const listC = this.positionObj.C;
            // 如果 C 的人数不够，则从 PF 数组里取
            if (listC.length < groupCount) {
                const diffCount = groupCount - listC.length;
                for (let i = 0; i < diffCount; i++) {
                    const theChosenOne = this.getRandomPerson(this.positionObj.PF);
                    theChosenOne && listC.push(theChosenOne);
                }
            }
            // 如果人数超出，则先不管
            const numAlready = []; // 已经分好的组号
            for (let i = 0; i < groupCount; i++) {
                const person = listC[i];
                const random = this.getRandom(groupCount, numAlready);
                numAlready.push(random); // 放入已经分好的组号中

                // 如果不存在，初始化 groupObj[random]
                if (!groupObj[random]) {
                    groupObj[random] = {
                        people: []
                    };
                }
                groupObj[random].people.push(person); // 把人也放进组中
                person.group = random; // 每个人也记录分组数据
            }
        },

        // 给 PG 分组
        divideGroupG(groupCount, groupObj) {
            const listPG = this.positionObj.PG;
            // 不够的 SG 补
            // if (listPG.length < groupCount) {
            //     const diffCount = groupCount - listPG.length;
            //     for (let i = 0; i < diffCount; i++) {
            //         const theChosenOne = this.getRandomPerson(this.positionObj.SG);
            //         theChosenOne && listPG.push(theChosenOne);
            //     }
            // }
            // 如果人数超出，则先不管
            const numAlready = []; // 已经分好的组号
            for (let i = 0; i < groupCount; i++) {
                const person = listPG[i];
                if (!person) {
                    break;
                }
                const random = this.getRandom(groupCount, numAlready);
                numAlready.push(random); // 放入已经分好的组号中

                // 如果不存在，初始化 groupObj[random]
                if (!groupObj[random]) {
                    groupObj[random] = {
                        people: []
                    };
                }
                groupObj[random].people.push(person); // 把人也放进组中
                person.group = random; // 每个人也记录分组数据
            }
        },

        // 分配剩下的人
        divideOthers(groupCount, groupObj) {
            Object.keys(this.positionObj).forEach(key => {
                const list = this.positionObj[key];
                list.forEach(person => {
                    if (person.group === undefined) {
                        const random = this.getRestGroupIndex(groupCount, groupObj);
                        groupObj[random].people.push(person); // 把人也放进组中
                        person.group = random; // 每个人也记录分组数据
                    }
                });
            });
        },

        // 获取随机数编号，注意第二个参数必传，递归方法
        getRandom(max, numAlready) {
            // 先获取一个随机数
            const random = getRandomInt(max);
            // 如果这个随机数之前还没有出现，就可以直接用
            if (numAlready.indexOf(random) === -1) {
                return random;
            }
            // 递归
            // 如果已经出现了，就继续随机，直到找到之前未出现的数为止
            return this.getRandom(max, numAlready);
        },

        // 随机抽取一人，并将其从原数组中删除
        getRandomPerson(list) {
            const random = getRandomInt(list.length);
            const theChosenOne = list[random];
            list.splice(random, 1); // 从原数组中删除
            return theChosenOne;
        },

        // 获得一个空闲的组的索引，递归
        getRestGroupIndex(groupCount, groupObj) {
            let peopleCount = 0;
            Object.keys(groupObj).forEach(key => {
                peopleCount += groupObj[key].people.length;
            });
            // 如果已经到了总数，则不再递归
            if (peopleCount === groupCount * this.countPerGroup) {
                return -1;
            }
            // 先获取一个随机数
            const random = getRandomInt(groupCount);
            if (groupObj[random].people.length < 3) {
                return random;
            }
            return this.getRestGroupIndex(groupCount, groupObj);
        }
    }
}
</script>

<style scoped lang="less">
.flex {
    display: flex;
}
.f1 {
    flex: 1;
}
.tac {
    text-align: center;
}
.scroll-y {
    overflow-y: scroll;
}
.h400 {
    height: 400px;
}
.h800 {
    height: 800px;
}
.person {
    padding: 20px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    width: 180px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 9px;
}
</style>
