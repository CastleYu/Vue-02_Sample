<template>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" :show-close="false"
        :visible.sync="newBookVisible" title="新增书籍" style="margin: 0px;  top:-10%;">
        <!-- 表单部分 -->
        <el-form :rules="rules" ref="elForm" :model="bookData" size="medium" label-width="100px">
            <el-form-item label="书名" prop="book_name">
                <el-input v-model.lazy="bookData.book_name" placeholder="请输入书籍名称" clearable style="width:90%"></el-input>
            </el-form-item>

            <el-form-item label="ISBN" prop="isbn">
                <el-input v-model.lazy="bookData.isbn" placeholder="请输入ISBN号" clearable style="width:90%">
                </el-input>
            </el-form-item>

            <el-form-item label="索书号" prop="book_id">
                <el-input v-model.lazy="bookData.book_id" placeholder="请输入索书号(唯一)" clearable style="width:90%"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author">
                <el-input v-model.lazy="bookData.author" placeholder="请输入作者" clearable style="width:90%">
                </el-input>
            </el-form-item>

            <el-form-item label="出版商" prop="publisher">
                <el-input v-model.lazy="bookData.publisher" placeholder="请输入出版商" clearable style="width:90%">
                </el-input>
            </el-form-item>

            <el-form-item label="价格" prop="price">
                <el-input v-model.lazy="bookData.price" placeholder="请输入价格" clearable style="width:90%">
                </el-input>
            </el-form-item>


            <el-form-item label="简介" prop="intro">
                <el-input v-model.lazy="bookData.intro" type="textarea" placeholder="在此输入书籍简介"
                    :autosize="{ minRows: 4, maxRows: 4 }" style="width:90%;font-family: MiSans;"></el-input>
            </el-form-item>
        </el-form>

        <!-- 按钮部分 -->
        <div slot="footer" style="margin: 0;">
            <el-button type="info" @click="onClose">重置</el-button>
            <el-button @click="close">关闭</el-button>
            <el-button type="primary" @click="handleConfirm" v-loading="creating" :disabled="creating"
                element-loading-spinner="el-icon-loading">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "newBook",
    props: {
        newBookVisible: Boolean
    },
    data() {
        return {
            bookData: {
                book_id: "",
                book_name: "",
                isbn: "",
                author: "",
                intro: "",
                publisher: "",
                price: ""
            },
            rules: {
                book_id: [
                    { required: true, message: '索书号不能为空', trigger: 'blur' }
                ],
                book_name: [
                    { required: true, message: '书名不能为空', trigger: 'blur' }
                ],
                isbn: [
                    { required: true, message: 'ISBN不能为空', trigger: 'blur' }
                ],
                author: [
                    { required: true, message: '作者不能为空', trigger: 'blur' }
                ],
                publisher: [
                    { required: true, message: '出版商不能为空', trigger: 'blur' }
                ],
                price: [
                    { required: true, type: 'number', message: '请输入数字', trigger: 'blur', transform: (value) => Number(value) }
                ],
            },
            creating: false,
        }
    },
    methods: {
        handleConfirm() {
            this.$refs['elForm'].validate(valid => {
                if (valid) {
                    this.creating = true
                    this.$axios.get('/SearchBook/findOne?bookId=' + this.bookData.book_id).then(res => {
                        console.log(res.data)
                        // this.$message.info('正在添加')
                        if (res.data.length > 0) {
                            this.$message.error('该索书号已存在, 请重新编辑索书号')
                        } else {
                            this.$axios.post('/addBook', this.bookData)
                            this.$message.success('添加成功')
                            this.close()
                        }
                    }).catch(err => {
                        this.$message.error('添加失败')
                        console.log(err)
                    })
                    this.creating = false
                } else {
                    this.$message.error('输入存在问题，请检查')
                }
            })
        },
        onOpen() { },
        onClose() {
            this.$refs['elForm'].resetFields()
        },
        close() {
            this.$emit('update:newBookVisible', false)
        },
    }
}
</script>

<style scoped></style>


