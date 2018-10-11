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
                    <el-table-column prop="title" label="书名">
                    </el-table-column>
                    <el-table-column prop="author" label="作者">
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
                <el-form class="formContainer" action="/admin/ebookmanage/" ref="form" :model="form" label-width="80px" method="POST" enctype="multipart/form-data">
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
                        <button type="submit" class="el-button el-button--primary" @click="fileUpload">上 传</button>
                        <el-button type="danger" @click="uploadVisible = false">取 消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
                <el-form class="formContainer" action="/admin/ebookmanage/" ref="editForm" :model="editForm" label-width="80px" method="POST" enctype="multipart/form-data">
                    <el-input type="hidden" v-model="editForm.id" name="edit_id"></el-input>
                    <el-form-item label="书名">
                        <el-input v-model="editForm.title" name="title"></el-input>
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-select v-model="editForm.ebookclass" name="ebookclass" placeholder="请选择类别">
                            <el-option label="cs" value="cs"></el-option>
                            <el-option label="ss" value="ss"></el-option>
                            <el-option label="nv" value="nv"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="editForm.author" name="author"></el-input>
                    </el-form-item>
                    <el-form-item label="豆瓣评分">
                        <el-input v-model="editForm.rate" name="rate"></el-input>
                    </el-form-item>
                    <el-form-item label="豆瓣链接">
                        <el-input v-model="editForm.dburl" name="dburl"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button type="submit" class="el-button el-button--primary" @click="saveEdit">确 定</button>
                        <el-button type="danger" @click="editVisible = false">取 消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteRow">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {

        name: 'ebookManage',
        data() {
            return {
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                tableData: [],
                uploadVisible: false,
                editVisible: false,
                delVisible: false,
                form: {
                    title: '',
                    char: '',
                    ebookclass: '',
                    author: '',
                    rate: '',
                    dburl: '',
                },
                editForm: {
                    id: '',
                    title: '',
                    char: '',
                    ebookclass: '',
                    author: '',
                    rate: '',
                    dburl: '',
                },
                idx: -1
            }
        },
        methods: {
            resetForm() {},
            handleUpload() {
                this.uploadVisible = true;
            },
            fileUpload() {
                this.uploadVisible = false;
            },
            getEbookInfo() {
                axios.get('/api/ebook')
                    .then(this.getEbookInfoSucc)
            },
            getEbookInfoSucc(res) {
                if (res.status == 200) {
                    this.tableData = res.data
                    // console.log(this.bookList);
                }
            },
            search() {
                this.is_search = true;
            },
            // formatter(row, column) {
            //     return row.address;
            // },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.editForm = {
                    id: row.id,
                    title: row.title,
                    char: row.char,
                    ebookclass: row.ebookclass,
                    author: row.author,
                    rate: row.rate,
                    dburl: row.dburl,
                }
                this.editVisible = true;
            },
            // 确定编辑
            saveEdit() {                
                this.$message.success('编辑成功');
                this.editVisible = false;
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

        },
        mounted() {
            this.getEbookInfo()
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