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
                playerWidth: '',
                // videojs options
                playerOptions: {
                    height: '',
                    autoplay: false,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        // mp4
                        src: '',
                        // webm
                    }],
                }
            }
        },
        mounted() {
            this.getVideoInfo()
            this.setPlayerHeight()

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
            // 设置播放器高度
            setPlayerHeight() {
                this.playerWidth = this.$refs.videoPlayer.$el.clientWidth
                if (this.playerWidth < 856) {
                    this.playerOptions.height = this.playerWidth * 9 / 16
                }
            },
            getVideoInfo() {
                axios.get('/api/video.json', {
                    params: {
                        id: this.$route.params.id
                    }
                }).then(this.getVideoInfoSucc)
            },
            getVideoInfoSucc(res) {
                let index = this.$route.params.id - 1
                if (res.status == 200) {
                    this.videoInfo = res.data[index]
                    this.playerOptions.sources[0].src = this.videoInfo.playurl
                }
            },
            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            onPlayerEnded(player) {
                // console.log('player ended!', player)
            },
            onPlayerLoadeddata(player) {
                // console.log('player Loadeddata!', player)
            },
            onPlayerWaiting(player) {
                // console.log('player Waiting!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player Playing!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player Timeupdate!', player.currentTime())
            },
            onPlayerCanplay(player) {
                // console.log('player Canplay!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player Canplaythrough!', player)
            },

            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },

            // player is ready
            playerReadied(player) {
                // seek to 10s
                // console.log('example player 1 readied', player)
                player.currentTime(10)
                // console.log('example 01: the player is readied', player)
            }
        }
    }
</script>

<style scroped>
    .play-back-btn {
        width: 300px;
        margin-top: 30px!important;
    }
</style>