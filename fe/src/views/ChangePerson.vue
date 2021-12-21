<template>
    <div class="change-person">

        <div
            class="mt20"
        >
            {{ person && person.name ? '修改' : '新增' }}人员信息
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
            v-if="positionList"
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

        <div
            class="mt20"
        >
            <el-button
                type="primary"
                @click="handleConfirmClick"
            >
                确认
            </el-button>
            <el-button
                type="info"
                @click="handleCancelClick"
            >
                取消
            </el-button>
        </div>

    </div>
</template>

<script>
import {
    getPerson,
    changePerson,
    addPerson
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
            positionList: ['C', 'PF', 'SF', 'SG', 'PG'],
            type: 'add' // 类型；add 新增；change 修改；默认为新增
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
            const res = await getPerson(this.name);
            console.log('ChangePerson fetchData res', res);

            // 为空兼容
            if (
                !res
                || !res.data
            ) {
                return;
            }

            // 没找到人
            if (res.data.status === 1) {
                this.person = {};
                this.type = 'add';
                return;
            }

            // 找到人了
            this.person = res.data;
            this.type = 'change';
            if (
                this.person
                && this.person.positionList
                && this.person.positionList[0]
            ) {
                this.mainPosition = this.person.positionList[0];
            }
        },
        handlePositionListChange() {
        },
        async handleConfirmClick() {
            if (this.type === 'change') {
                this.change();
                return;
            }

            this.add();
        },
        handleCancelClick() {
            this.$router.back(-1);
        },
        async change() {
            const res = await changePerson({
                _id: this.person._id,
                name: this.person.name,
                positionList: [
                    this.mainPosition
                ]
            });
            if (
                res
                && res.data
                && res.data.status === 0
            ) {
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
                this.$router.back(-1);
                return;
            }
            this.$message({
                showClose: true,
                message: res.data.msg || `${this.person.name} 修改失败`,
                type: 'error'
            });
        },
        async add() {
            const res = await addPerson({
                name: this.person.name,
                positionList: [
                    this.mainPosition
                ]
            });
            if (
                res
                && res.data
                && res.data.status === 0
            ) {
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
                this.$router.back(-1);
                return;
            }
            this.$message({
                showClose: true,
                message: res.data.msg || `${this.person.name} 新增失败`,
                type: 'error'
            });
        }
    }
}
</script>

<style scoped lang="less">

</style>
