<template>
    <div class="change-person">

        <div
            class="mt20"
        >
            修改人员信息
        </div>

        <div
            v-if="person"
            class="mt20"
        >
            <el-input
                v-model="person.name"
                :style="{
                    width: '50%'
                }"
                placeholder="请输入修改后的名字"
            >
            </el-input>
        </div>

        <div
            v-if="person && person.positionList"
            class="mt20"
        >
            <!-- <div
                v-for="position, positionIndex in person.positionList"
                :key="positionIndex"
            >
                {{ position }}
            </div> -->

            <div>
                <el-radio
                    v-for="position in positionList"
                    :key="position"
                    :label="position"
                    v-model="mainPosition"
                >
                    {{ position }}
                </el-radio>
            </div>

            <!-- <el-checkbox-group
                v-model="person.positionList"
                @change="handlePositionListChange"
            >
                <el-checkbox
                    v-for="position in positionList"
                    :label="position"
                    :key="position"
                >
                    {{ position }}
                </el-checkbox>
            </el-checkbox-group> -->

        </div>

    </div>
</template>

<script>
import {
    getPerson
} from '../http/index';

export default {
    name: 'ChangePerson',
    props: {
    },
    data: () => {
        return {
            name: '',
            person: null,
            mainPosition: '', // 主位置
            positionList: ['C', 'PF', 'SF', 'SG', 'PG']
        };
    },
    created() {
        this.fetchData();
    },
    mounted() {
    },
    methods: {
        async fetchData() {
            this.name = this.$route.query.name;
            const person = await getPerson(this.name);
            console.log('ChangePerson fetchData person', person);
            this.person = person.data;
            if (
                this.person
                && this.person.positionList
                && this.person.positionList[0]
            ) {
                this.mainPosition = this.person.positionList[0];
            }
        },
        handlePositionListChange() {
        }
    }
}
</script>

<style scoped lang="less">

</style>
