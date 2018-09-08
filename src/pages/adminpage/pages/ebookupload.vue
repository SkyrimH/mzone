<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 文件上传</el-breadcrumb-item>
                <el-breadcrumb-item>电子书上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container ebookupload">
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
                    <button type="submit" class="el-button el-button--primary">上传</button>
                    <el-button type="danger">取消</el-button>
                </el-form-item>
            </el-form>
            <!-- <form action="?" method="post" enctype="multipart/form-data">
                <el-input name="ebookclass"></el-input>
                分类： <input type="text" name="ebookclass"><br>
                标题： <input type="text" name="title"><br>
                作者： <input type="text" name="author"><br>
                豆瓣评分: <input type="text" name="rate"><br>
                豆瓣链接: <input type="text" name="rate"><br>
                封面图：<br>
                <input type="file" name="plc"><br>
                文件：<br>
                <input type="file" name="file"><br>
                <el-button class="play-btn" type="submit" plain>上传</el-button>
            </form> -->
        </div>
    </div>
</template>

<script>
    import VueCropper from 'vue-cropperjs';
    export default {
        name: 'ebookUpload',
        data() {
            return {
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
            resetForm() {                
            }
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
</style>