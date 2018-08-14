<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 16, offset: 4}">
                <div class="video-title">
                    <h1>{{this.videoInfo.title}}</h1>
                </div>
                <div class="item">
                    <div class="player">
                        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" :playsinline="true" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)"
                            @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied" @statechanged="playerStateChanged($event)">
                        </video-player>
                    </div>
                </div>
                <router-link to="/video">
                    <el-button class="play-back-btn" type="primary">返回上一页</el-button>
                </router-link>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { videoPlayer } from 'vue-video-player'
    import axios from 'axios'
    export default {
        name: 'videoPlay',
        components: {
            videoPlayer
        },
        data() {
            return {
                videoInfo: Object,
                // videojs options
                playerOptions: {
                    height: '540',
                    autoplay: false,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: '',
                    }],
                }
            }
        },
        mounted() {
            this.getVideoInfo()
            setTimeout(() => {
                this.player.muted(false)
            }, 500)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            getVideoInfo () {
                axios.get('/api/video.json',{
                    params: {
                        id: this.$route.params.id
                    }
                }).then(this.getVideoInfoSucc)
            },
            getVideoInfoSucc (res) {
                let index = this.$route.params.id - 1                
                if (res.status == 200) {
                    this.videoInfo = res.data[index]
                    this.playerOptions.sources[0].src = this.videoInfo.playurl                     
                }                
            },
            // listen event
            onPlayerPlay(player) {
            },
            onPlayerPause(player) {
            },
            onPlayerEnded(player) {
            },
            onPlayerLoadeddata(player) {
            },
            onPlayerWaiting(player) {
            },
            onPlayerPlaying(player) {
            },
            onPlayerTimeupdate(player) {
            },
            onPlayerCanplay(player) {
            },
            onPlayerCanplaythrough(player) {
            },

            // or listen state event
            playerStateChanged(playerCurrentState) {
            },

            // player is ready
            playerReadied(player) {
                player.currentTime(10)
            }
        }
    }
</script>

<style scroped>
    .play-back-btn {
        width: 300px;
        margin-top: 30px
    }
</style>