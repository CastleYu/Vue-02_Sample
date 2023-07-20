<template>
  <div>
    <el-descriptions class="margin-top" title="书籍详情" :column="3" border>
      <el-descriptions-item><template slot="label">书籍名称</template>{{ bookData.book_name }}
      </el-descriptions-item>
      <el-descriptions-item><template slot="label">作者</template>{{ bookData.author }}
      </el-descriptions-item>
      <el-descriptions-item><template slot="label">索书号</template>{{ bookData.book_id }}
      </el-descriptions-item>
      <el-descriptions-item><template slot="label">ISBN</template>{{ bookData.isbn }}
      </el-descriptions-item>
      <el-descriptions-item><template slot="label">价格</template>{{ bookData.price }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions>
      <el-descriptions-item><template slot="label">简介</template>{{ bookData.intro }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "info",
  data(){
    return{
      bookData:{
        book_id: "",
        book_name: "",
        isbn: "",
        author: "",
        intro: "",
        publisher: "",
        price:""
      },
    }
  },
  created() {
    let bookId=this.$route.query
    this.$axios.get('/SearchBook/findOne?bookId='+bookId['book_id']).then(res=>{
      this.bookData=res.data[0]
    })
  }
}
</script>

<style scoped>

</style>
