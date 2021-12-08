<template>
    <div class="index">
        <div
            class="wrapper"
        >
            <div
                class="text-magic"
                data-word="欢迎来到 B A S K"
            >
                欢迎来到 B A S K
                <div class="white-text"></div>
            </div>
        </div>
        <el-carousel
            :autoplay="true"
            height="600px"
        >
            <el-carousel-item
                v-for="(item, index) in list"
                :key="index"
            >
                <div
                    :style="{
                        'color': 'red',
                        'background-image': 'url(' + item.src + ')'
                    }"
                    class="item"
                >
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>

export default {
    name: 'Index',
    props: {
    },
    components: {
    },
    data: () => {
        return {
            list: [
                {
                    name: '红莲扣篮',
                    src: 'http://150.158.40.96:8848/imgs/红莲.gif'
                },
                {
                    name: '明月万圣节',
                    src: 'https://p1.dailygn.com/obj/g-marketing-act-assets/resource/refactor_template-1.0.0/1636458415962/pc/cdn/img/rp1_low.png'
                },
                {
                    name: '魂招',
                    src: 'http://150.158.40.96:8848/imgs/魂招.png'
                },
                {
                    name: '麦迪',
                    src: 'http://150.158.40.96:8848/imgs/麦迪.png'
                },
                {
                    name: '老北京',
                    src: 'http://150.158.40.96:8848/imgs/老北京隔扣.jpeg'
                }
            ]
        };
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped lang="less">
.item {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.wrapper {
    margin-top: 60px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 1px;
    position: relative;
}
.text-magic {
    // position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 300px;
    font-size: 36px;
    font-family: Raleway, Verdana, Arial;
    color: #fff;
}
.white-text {
    position: absolute;
    left: -10px;
    width: 100%;
    height: 3px;
    background: #000;
    z-index: 4;
    animation: whiteMove 3s ease-out infinite;
}

.text-magic::before {
    content: attr(data-word);
    position: absolute;
    top: 0;
    left: 0.5px;
    height: 0px;
    color: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    z-index: 2;
    animation: redShadow 1s ease-in infinite;
    filter: contrast(200%);
    text-shadow: 1px 0 0 red;
}

.text-magic::after {
    content: attr(data-word);
    position: absolute;
    top: 0;
    left: -3px;
    height: 36px;
    color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    z-index: 3;
    background: rgba(0, 0, 0, 0.9);
    animation: redHeight 1.5s ease-out infinite;
    filter: contrast(200%);
    text-shadow: -1px 0 0 cyan;
    mix-blend-mode: darken;
}

@keyframes redShadow {
    20% {
        height: 32px;
    }
    60% {
        height: 6px;
    }
    100% {
        height: 42px;
    }
}

@keyframes redHeight {
    20% {
        height: 42px;
    }
    35% {
        height: 12px;
    }
    50% {
        height: 40px;
    }
    60% {
        height: 20px;
    }
    70% {
        height: 34px;
    }
    80% {
        height: 22px;
    }
    100% {
        height: 0px;
    }
}

@keyframes whiteMove {
    8% {
        top: 38px;
    }
    14% {
        top: 8px;
    }
    20% {
        top: 42px;
    }
    32% {
        top: 2px;
    }
    99% {
        top: 30px;
    }
}
</style>
