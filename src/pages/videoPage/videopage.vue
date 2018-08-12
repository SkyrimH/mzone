<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 18, offset: 3}" :md="{span: 14, offset: 5}" :lg="{span: 12, offset: 6}">
                <div class="container">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="全部" name="first">
                            <div class="videos-container">
                                <div class="video">
                                    <div class="video-plc">
                                        <img class="video-img" src="https://img3.doubanio.com/view/photo/l/public/p712241453.webp">
                                    </div>
                                    <div class="video-info">
                                        <p class="video-title">疯狂的石头</p>
                                        <p class="video-director">宁浩</p>
                                        <p class="video-actor"> 郭涛 / 刘桦 / 连晋 / 黄渤 /徐峥</p>
                                        <el-rate v-model="value5" allow-half disabled text-color="#ff9900" score-template="{value}">
                                        </el-rate>
                                        <span class="video-douban">豆瓣 9.0 分</span>
                                        <router-link to="/video/01">
                                            <el-button class="play-btn" type="primary" plain>在线观看</el-button>
                                        </router-link>
                                        <a href="static/video/jsgc/1.pdf">
                                            <el-button class="video-down-btn" type="primary" plain>种子下载</el-button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="大陆" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="港台" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="海外" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>

                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'videoPage',
        components: {

        },
        data() {
            return {
                value5: 4.8,
                activeName: 'first'
            }
        }
    }
</script>

<style scroped>
    .container {
        margin-top: 30px
    }

    .videos-container {
        text-align: center;
    }

    .video {
        position: relative;
        overflow: hidden;
        display: flex;
        margin: 10px 0;
        border-radius: 10px;
        padding: 20px;
        height: 200px;
        background: rgb(236, 236, 236)
    }

    .video-plc {
        width: 30%;
        text-align: right;
        padding-right: 20px
    }

    .video-img {
        width: 140px;
        height: 180px;
        padding: 10px
    }

    .video-info {
        position: relative;
        width: 70%;
        text-align: left
    }

    .video-title {
        font-size: 20px;
        margin: 10px 0
    }

    .video-director,
    .video-actor {
        margin: 12px 0;
    }

    .el-rate {
        position: absolute;
        display: inline-block;
        line-height: 1;
    }

    .video-douban {
        position: absolute;
        font-size: 14px;
        margin-left: 130px;
    }

    .play-btn {
        display: inline-block;
        position: absolute;
        bottom: 10px;
    }

    .video-down-btn {
        display: inline-block;
        position: absolute;
        left: 120px;
        bottom: 10px;
    }
</style>