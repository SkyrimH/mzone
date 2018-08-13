<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 18, offset: 3}" :md="{span: 14, offset: 5}" :lg="{span: 12, offset: 6}">
                <div class="container">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="全部" name="all"></el-tab-pane>
                        <el-tab-pane label="大陆" name="dl"></el-tab-pane>
                        <el-tab-pane label="港台" name="gt"></el-tab-pane>
                        <el-tab-pane label="海外" name="hw"></el-tab-pane>
                    </el-tabs>
                    <div class="videos-container">
                        <div class="video" v-for="video in videoList" :key="video.id" v-if="(video.videoclass == activeName) || (activeName == 'all')">
                            <div class="video-plc">
                                <img class="video-img" :src="video.plcurl">
                            </div>
                            <div class="video-info">
                                <p class="video-title">{{video.title}}</p>
                                <p class="video-director">{{video.director}}</p>
                                <p class="video-actor">{{video.actor}}</p>
                                <el-rate v-model="video.dbrate" allow-half disabled text-color="#ff9900" score-template="{value}">
                                </el-rate>
                                <span class="video-douban">豆瓣 {{video.dbrate * 2}} 分</span>
                                <router-link :to="'/video/' + video.id">
                                    <el-button class="play-btn" type="primary" plain>在线观看</el-button>
                                </router-link>
                                <a :href="video.downurl">
                                    <el-button class="video-down-btn" type="primary" plain>种子下载</el-button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'videoPage',
        components: {

        },
        data() {
            return {
                videoList: [],
                activeName: 'all'
            }
        },
        methods: {
            getVideoInfo() {
                axios.get('/api/video.json')
                    .then(this.getVideoInfoSucc)
            },
            getVideoInfoSucc(res) {
                if (res.status == 200) {
                    this.videoList = res.data
                    console.log(this.videoList);
                }
            }
        },
        mounted() {
            this.getVideoInfo()
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