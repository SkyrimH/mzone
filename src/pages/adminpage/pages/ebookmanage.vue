<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 文件管理</el-breadcrumb-item>
                <el-breadcrumb-item>电子书管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button class="upload-btn" type="success" icon="upload" @click="handleUpload">上传电子书</el-button>
                <el-table class="detail-table" :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="ID" sortable width="80">
                    </el-table-column>
                    <el-table-column prop="title" label="书名" :formatter="formatter">
                    </el-table-column>
                    <el-table-column prop="author" label="作者" :formatter="formatter">
                    </el-table-column>
                    <el-table-column prop="bookclass" label="分类" width="80">
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 上传弹出框 -->
            <el-dialog title="上传" :visible.sync="uploadVisible" width="70%">
                <el-form class="formContainer" action="/admin/ebookupload/" ref="form" :model="form" label-width="80px" method="POST" enctype="multipart/form-data">
                    <el-form-item label="书名">
                        <el-input v-model="form.title" name="title"></el-input>
                    </el-form-item>
                    <el-form-item label="拼音简写">
                        <el-input v-model="form.char" name="char"></el-input>
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-select v-model="form.ebookclass" name="ebookclass" placeholder="请选择类别">
                            <el-option label="cs" value="cs"></el-option>
                            <el-option label="ss" value="ss"></el-option>
                            <el-option label="nv" value="nv"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.author" name="author"></el-input>
                    </el-form-item>

                    <el-form-item label="豆瓣评分">
                        <el-input v-model="form.rate" name="rate"></el-input>
                    </el-form-item>
                    <el-form-item label="豆瓣链接">
                        <el-input v-model="form.dburl" name="dburl"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图片">
                        <el-input type="file" name="plcurl"></el-input>
                    </el-form-item>
                    <el-form-item label="文件">
                        <el-input type="file" name="downurl"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button type="submit" class="el-button el-button--primary" @click="fileUpload">上传</button>
                        <el-button type="danger" @click="uploadVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ebookManage',
        data() {
            return {
                tableData: [{ "id": 1, "bookclass": "cs", "plcurl": "static/ebook/jsgc.jpg", "title": "JavaScript高级程序设计", "author": "尼古拉斯·泽卡斯", "rate": 4.7, "dburl": "https://book.douban.com/subject/10546125/", "downurl": "static/ebook/jsgc.pdf" },
                    { "id": 2, "bookclass": "ss", "plcurl": "static/ebook/wgjjx.jpg", "title": "经济学原理(第6版)——微观经济学分册", "author": "曼昆 (N.Gregory Mankiw)", "rate": 4.8, "dburl": "https://book.douban.com/subject/26388289/", "downurl": "static/ebook/wgjjx.pdf" },
                    { "id": 3, "bookclass": "ss", "plcurl": "static/ebook/hgjjx.jpg", "title": "经济学原理(第6版)——宏观经济学分册", "author": "曼昆 (N.Gregory Mankiw)", "rate": 4.8, "dburl": "https://book.douban.com/subject/26388291/", "downurl": "static/ebook/hgjjx.pdf" },
                    { "id": 4, "bookclass": "ss", "plcurl": "static/ebook/xfzxwx.jpg", "title": "消费者行为学  第10版", "author": "迈克尔·所罗门 (Michael R.Solom", "rate": 4.2, "dburl": "https://book.douban.com/subject/25850257/", "downurl": "static/ebook/xfzxwx.pdf" },
                    { "id": 5, "bookclass": "cs", "plcurl": "static/ebook/pybc.jpg", "title": "Python编程：从入门到实践", "author": "埃里克·马瑟斯 ", "rate": 4.6, "dburl": "https://book.douban.com/subject/26829016/", "downurl": "static/ebook/pybc.pdf" }, { "id": 6, "bookclass": "cs", "plcurl": "static/ebook/jztyl.jpg", "title": "金字塔原理", "author": "芭芭拉·明托 ", "rate": 4.1, "dburl": "https://book.douban.com/subject/4882120/", "downurl": "static/ebook/jztyl.pdf" },
                    { "id": 7, "bookclass": "cs", "plcurl": "static/ebook/dsjsd.jpg", "title": "大数据时代 : 生活、工作与思维的大变革", "author": "维克托•迈尔•舍恩伯格（Viktor Mayer-Schönberger） ", "rate": 3.8, "dburl": "https://book.douban.com/subject/20429677/", "downurl": "static/ebook/dsjsd.pdf" }
                ],
                uploadVisible: false,
                form: {
                    title: '',
                    char: '',
                    ebookclass: '',
                    author: '',
                    rate: '',
                    dburl: '',
                    bookImg: [],
                    bookFile: []
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.submit();
            },
            resetForm() {},
            handleUpload() {
                this.uploadVisible = true;
            },
            fileUpload() {
                this.uploadVisible = false;
            },
        }
    }
</script>

<style scoped>
    .formContainer {
        margin: auto;
        width: 600px;
    }

    .upload-demo>>>.el-upload--text {
        width: 80px !important;
        height: 40px !important;
    }

    .content-title {
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
.upload-btn {
    float: right;
    margin-right: 30px
}
    .pre-img {
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }

    .crop-demo {
        display: flex;
        align-items: flex-end;
    }

    .crop-demo-btn {
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .crop-input {
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    .handle-del {
        float: left;
    }
    .handle-box {
        margin-bottom: 20px;
    }
.detail-table {
    margin-top: 20px
}
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }
</style>