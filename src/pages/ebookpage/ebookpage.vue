<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="{span: 22, offset: 1}" :sm="{span: 18, offset: 3}" :md="{span: 14, offset: 5}" :lg="{span: 12, offset: 6}">
                <div class="container">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="全部" name="all"></el-tab-pane>
                        <el-tab-pane label="计算机类" name="cs"></el-tab-pane>
                        <el-tab-pane label="社科类" name="ss"></el-tab-pane>
                    </el-tabs>
                     <div class="books-container">
                                <div class="book" v-for="book in bookList" :key="book.id" v-if="(book.bookclass == activeName) || (activeName == 'all')">
                                    <div class="book-plc">
                                        <img class="book-img" :src="book.plcurl">
                                    </div>
                                    <div class="book-info">
                                        <p class="book-title">{{book.title}}</p>
                                        <p class="book-author">{{book.author}}</p>
                                        <el-rate v-model="book.rate" allow-half disabled text-color="#ff9900" score-template="{value}">
                                        </el-rate>
                                        <a :href="book.dburl" target="_blank">
                                            <span class="ebook-douban">豆瓣 {{book.rate * 2}} 分</span>
                                        </a>
                                        <a :href="book.downurl" target="_blank">
                                            <el-button class="ebook-down-btn" type="primary" plain>本地下载</el-button>
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
        name: "ebookPage",
        components: {},
        data() {
            return {
                bookList: [],
                value5: 4.8,
                activeName: 'all'
            }
        },
        methods: {
            getEbookInfo() {
                axios.get('/api/ebook.json')
                    .then(this.getEbookInfoSucc)
            },
            getEbookInfoSucc(res) {
                if (res.status == 200) {
                    this.bookList = res.data
                    console.log(this.bookList);
                }
            }
        },
        mounted() {
            this.getEbookInfo()
        }
    };
</script>

<style scroped>
    .container {
        margin-top: 30px
    }

    .books-container {
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

    .ebook-douban {
        position: absolute;
        font-size: 14px;
        margin-left: 130px;
    }

    .ebook-down-btn {
        position: absolute;
        bottom: 10px;
    }
</style>