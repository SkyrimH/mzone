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
                                <a :href="video.dburl" target="_blank">
                                    <span class="video-douban">豆瓣 {{video.dbrate * 2}} 分</span>
                                </a>
                                <router-link :to="'/video/' + video.id">
                                    <el-button class="play-btn" type="primary" plain>在线观看</el-button>
                                </router-link>
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
                axios.get('/static/mock/video.json')
                    .then(this.getVideoInfoSucc)
            },
            getVideoInfoSucc(res) {
                if (res.status == 200) {
                    this.videoList = res.data
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
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        padding: 1rem;
        height: 10rem;
        background: rgb(236, 236, 236)
    }

    .video-plc {
        width: 30%;
        text-align: right;
        padding-right: 1.6rem
    }

    .video-img {
        width: 7rem;
        height: 9rem;
        padding: 0.5rem
    }

    .video-info {
        position: relative;
        width: 70%;
        text-align: left
    }

    .video-title {
        line-height: 1.4rem;
        font-size: 1rem;
        margin: 0.5rem 0
    }

    .video-director,
    .video-actor {
        margin: 0.6rem 0;
        font-size: 0.8rem;
        line-height: 1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .el-rate {
        height: 0.8rem;
        position: absolute;
        display: inline-block;
        line-height: 0.8rem;
    }
    .el-rate__item {
        font-size: 0.8rem
    }
    .el-rate__icon {
        font-size: 1rem;
        margin-right: 0.15rem
    }
    .video-douban {
        position: absolute;
        font-size: 0.7rem;
        margin-left: 6rem;
    }

    .play-btn {
        display: inline-block;
        position: absolute;
        bottom: 0.5rem;
    }
    .el-button {
        padding: 0.6rem 1rem;
        font-size: 0.7rem;
        border-radius: 0.2rem
    }
    .video-down-btn {
        display: inline-block;
        position: absolute;
        left: 6rem;
        bottom: 0.5rem;
    }
</style>