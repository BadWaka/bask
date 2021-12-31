<template>
    <div
        class="live-anchor"
    >
        <div class="profile-box">
            <img
                :src="person.avatar"
                class="profile-pic"
            >
            <h3>{{ person.name }}</h3>
            <p
                v-for="(desc, index) in person.live.desc"
                :key="index"
                class="mt10"
            >
                {{ desc }}
            </p>
            <a
                :href="person.live.url"
                :title="'点击进入' + person.name + '的直播间'"
                target="_blank"
            >
                <button
                    type="button"
                    class="mt20"
                >
                    点此进入直播间
                </button>
            </a>
            <div class="profile-bottom">
                <i>游戏 ID：{{ person.gameId }} / </i>
                <i>{{ person.live.platform }}房间号：{{ person.live.roomId }}</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LiveAnchor',
    props: {
        person: Object
    },
    data: function () {
        return {
        }
    },
    methods: {
    }
}
</script>

<style scoped lang="less">
.profile-box{
    width: 350px;
    background: #ff574a;
    text-align: center;
    padding: 40px 60px;
    color: #fff;
    position: relative;
    border-radius: 20px;
    box-sizing: border-box;
    font-size: 14px;
}
.menu-icon{
    width: 25px;
    position: absolute;
    left: 40px;
    top: 40px;
}
.setting-icon{
    width: 25px;
    position: absolute;
    right: 40px;
    top: 40px;
}
.profile-pic{
    width: 150px;
    border-radius: 50%;
    background: #fff;
    padding: 6px;
    margin-top: 40px;
}

.profile-bottom{
    background: #fff;
    color: #999;
    padding: 60px 0;
    margin-right: -60px;
    margin-left: -60px;
    margin-bottom: -40px;
    border-radius: 20px;
    margin-top: -10px;
}
.profile-bottom img{
    width: 15px;
    margin-top: 15px;
    cursor: pointer;
}
.profile-box button{
    background: #fff;
    color: #ff574a;
    border: none;
    outline: none;
    box-shadow: 0 5px 10px rgba(244, 67, 54, 0.5);
    padding: 15px 30px;
    cursor: pointer;
    border-radius: 30px;
    margin-bottom: -50px;
    font-weight: 600;
    font-size: 16px;
}
.profile-box h3{
    font-size: 22px;
    margin-top: 20px;
    font-weight: 500;
}

.social-media img{
    width: 20px;
    margin: 30px 5px;
    cursor: pointer;
}
</style>
