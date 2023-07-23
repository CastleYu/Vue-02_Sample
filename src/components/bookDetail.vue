<template>
    <el-dialog v-bind="$attrs" v-on="$listeners" title="书籍详情" :visible.sync="found" @close="clearDetail" width="27.5vw">
        <div v-loading="loading">
            <el-descriptions class="margin-top" title="书籍详情" :column="1" border>
                <el-descriptions-item label="书籍名称">{{ bookData.book_name }}</el-descriptions-item>
                <el-descriptions-item label="作者">{{ bookData.author }}</el-descriptions-item>
                <el-descriptions-item label="索书号">{{ bookData.book_id }}</el-descriptions-item>
                <el-descriptions-item label="ISBN">{{ bookData.isbn }}</el-descriptions-item>
                <el-descriptions-item label="价格">{{ bookData.price }}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions style="margin: 15px;">
                <el-descriptions-item label="简介">{{ bookData.intro }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </el-dialog>
</template>


<script>

export default {
    name: "bookInfo",
    props:
    {
        show: Boolean, //传入显示的信号
        bookId: String, //传入的图书id
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

            found: false, //对话框 控制标志
            loading: true, //加载视图 控制标志
        }
    },
    watch: {
        show(news) { if (news) this.getDetail() },
    },
    methods:
    {
        getDetail() {
            //获取
            if (!this.bookId) {console.log(this.bookId);this.$message.error("查询出现错误");this.clearDetail(); return;}
            this.$axios.get('/SearchBook/findOne?bookId=' + this.bookId).then(res => {
                this.bookData = res.data[0]
                this.loading = false
            })
            console.log("详情log")
            this.found = true;
        },
        clearDetail() {
            //重置数据
            this.$emit('update:show', false)
            this.found = false;
            this.loading = true;
            this.bookData = {
                book_id: "",
                book_name: "",
                isbn: "",
                author: "",
                intro: "",
                publisher: "",
                price: ""
            }
            console.log("初始化数据")
        }
    }
}
</script>