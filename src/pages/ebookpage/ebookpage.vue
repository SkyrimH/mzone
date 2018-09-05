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
                axios.get('/static/mock/ebook.json')
                    .then(this.getEbookInfoSucc)
            },
            getEbookInfoSucc(res) {
                if (res.status == 200) {
                    this.bookList = res.data
                    // console.log(this.bookList);
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
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        padding: 1rem;
        height: 10rem;
        background: rgb(236, 236, 236)
    }

    .book-plc {
        width: 30%;
        text-align: right;
        padding-right: 1.8rem
    }

    .book-img {
        width: 7rem;
        height: 9rem;
        padding: 0.5rem
    }

    .book-info {
        position: relative;
        width: 70%;
        text-align: left
    }

    .book-title {
        line-height: 1.4rem;
        font-size: 1rem;
        margin: 0.5rem 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .book-author {
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
    .ebook-douban {
        position: absolute;
        font-size: 0.7rem;
        margin-left: 6rem;
    }

    .ebook-down-btn {
        position: absolute;
        bottom: 0.5rem;
    }
</style>