<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 18, offset: 3}" :md="{span: 14, offset: 5}" :lg="{span: 12, offset: 6}">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first">
                        <div class="container">
                            <div class="book">
                                <div class="book-plc">
                                    <img class="book-img" src="static/ebook/jsgc/jsgc.jpg">
                                </div>
                                <div class="book-info">
                                    <p class="book-title">JavaScript高级程序设计</p>
                                    <p class="book-author">[美] 尼古拉斯·泽卡斯</p>
                                    <el-rate v-model="value5" allow-half disabled text-color="#ff9900" score-template="{value}">
                                    </el-rate>
                                    <span class="douban">豆瓣 9.0 分</span>
                                    <a href="static/ebook/jsgc/1.pdf">
                                        <el-button class="down-btn" type="primary" plain>本地下载</el-button>
                                    </a>
                                </div>
                            </div>
                            <div class="book">
                                <div class="book-plc">
                                    <img class="book-img" src="static/ebook/wgjjx/1.jpg">
                                </div>
                                <div class="book-info">
                                    <p class="book-title">经济学原理(第7版)——微观经济学分册</p>
                                    <p class="book-author">曼昆 (N.Gregory Mankiw)</p>
                                    <el-rate v-model="value5" allow-half disabled text-color="#ff9900" score-template="{value}">
                                    </el-rate>
                                    <span class="douban">豆瓣 9.6 分</span>
                                    <a href="static/ebook/jsgc/1.pdf">
                                        <el-button class="down-btn" type="primary" plain>本地下载</el-button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="计算机类" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="逻辑经济类" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ebookPage",
        components: {},
        data() {
            return {
                value5: 4.8,
                activeName: 'first'
            }
        }
    };
</script>

<style scroped>
    .container {
        text-align: center;
    }

    .book {
        position: relative;
        overflow: hidden;
        display: flex;
        margin: 10px 0;
        border-radius: 10px;
        padding: 20px;
        height: 200px;
        background: rgb(236, 236, 236)
    }

    .book-plc {
        width: 30%;
        text-align: right;
        padding-right: 20px
    }

    .book-img {
        width: 140px;
        height: 180px;
        padding: 10px
    }

    .book-info {
        position: relative;
        width: 70%;
        text-align: left
    }

    .book-title {
        font-size: 20px
    }

    .el-rate {
        position: absolute;
        display: inline-block;
        line-height: 1;
    }

    .douban {
        position: absolute;
        font-size: 14px;
        margin-left: 130px;
    }

    .down-btn {
        position: absolute;
        bottom: 10px;
    }
</style>