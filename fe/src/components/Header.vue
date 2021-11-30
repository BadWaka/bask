<template>
    <div class="header">
        <div
            class="left-text"
        >
            B A S K
        </div>
        <div>
            <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                class="el-menu-demo"
                @select="handleSelect"
            >
                <el-menu-item index="1">
                    人员管理
                </el-menu-item>
                <el-menu-item index="2">
                    分组抽签
                </el-menu-item>
                <!-- <el-menu-item index="3">
                    排位积分管理
                </el-menu-item>
                <el-menu-item index="4">
                    外部友谊赛
                </el-menu-item> -->
                <!-- <el-submenu index="3">
                    <template slot="title">内部赛</template>
                    <el-menu-item index="3-1">分组抽签</el-menu-item>
                    <el-menu-item index="3-2">赛程</el-menu-item>
                </el-submenu> -->
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        msg: String
    },
    data: function () {
        return {
            activeIndex: '2'
        }
    },
    methods: {
        handleSelect(index, indexPath) {
            console.log('handleSelect index', index, 'indexPath', indexPath, 'activeIndex', this.activeIndex);
            if (index === '1') {
                this.$router.push('people');
            }
            else if (index === '2') {
                this.$router.push('divideGroup');
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    .left-text {
        font-size: 20px;
        font-weight: bold;
    }
}
</style>
