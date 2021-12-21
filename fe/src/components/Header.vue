<template>
    <div class="header">
        <div
            class="inner"
        >
            <div
                class="left-text"
                @click="handleLogoClick"
            >
                B A S K
            </div>
            <div>
                <el-menu
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
                    <el-menu-item index="3">
                        {{ loginPerson ? loginPerson.name : '登录' }}
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
    </div>
</template>

<script>

export default {
    name: 'Header',
    props: {
        loginPerson: Object
    },
    data: function () {
        return {
            activeIndex: '-1'
        }
    },
    methods: {
        handleLogoClick() {
            this.activeIndex = -1;
            this.$router.push('/');
        },
        handleSelect(index, indexPath) {
            console.log('handleSelect index', index, 'indexPath', indexPath, 'activeIndex', this.activeIndex);
            if (index === '1') {
                this.$router.push('people');
            }
            else if (index === '2') {
                this.$router.push('divideGroup');
            }
            else if (index === '3') {
                this.$router.push('login');
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
    padding-left: 10%;
    padding-right: 10%;
    height: 60px;
    background-color: #161616;
    // box-shadow: 0 2px 8px #333;
    box-sizing: border-box;
    width: 100%;
    .left-text {
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        // color: #FF3333;
    }
}
.inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
