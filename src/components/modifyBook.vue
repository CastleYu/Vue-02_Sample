<template>
  <el-dialog
      v-bind="$attrs" v-on="$listeners"
      @open="onOpen" @close="onClose" :show-close=false
      :visible.sync="modifyBookVisible" title="修改书籍信息">
    <el-form :rules="rules" ref="elForm" :model="bookData" size="medium" label-width="100px">
      <el-form-item label="书名" prop="book_name">
        <el-input v-model="bookData.book_name" placeholder="请输入书籍名称" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="bookData.isbn" placeholder="请输入ISBN号" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="索书号" prop="book_id">{{ bData.book_id }}
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="bookData.author" placeholder="请输入作者" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="出版商" prop="publisher">
        <el-input v-model="bookData.publisher" placeholder="请输入出版商" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="bookData.price" placeholder="请输入价格" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="bookData.intro" type="textarea" placeholder="在此输入书籍简介"
                  :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="info" @click="onClose" style="margin-right: 150px">重置</el-button>
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "modifyBook",
  props:{
    modifyBookVisible: Boolean,
    bData: Object
  },
  data(){
    return{
      bookData:{
        intro:""
      },
      rules:{
        book_name: [
          { required: true, message: '书名不能为空', trigger: 'blur' }
        ],
        isbn:[
          { required: true, message: 'ISBN不能为空', trigger: 'blur' }
        ],
        author:[
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '出版商不能为空', trigger: 'blur' }
        ],
        price:[
          { required: true, type:'number', message:'请输入数字', trigger:'blur', transform: (value) => Number(value)}
        ],
      },
    }
  },
  methods:{
    handleConfirm(){
      this.$refs['elForm'].validate(valid=>{
        if(valid){
          console.log(this.bookData)
          this.$axios.post('/modifyBook',this.bookData).then(res=>{
            this.$message.success('修改成功')
            this.$parent.load()
            this.close()
          }).catch(err=>{
            console.log(err)
          })
        } else {
          this.$message.error('输入存在问题，请检查')
        }
      })
    },
    onOpen() {
      this.bookData=this.bData
    },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:modifyBookVisible', false)
    },
  }
}
</script>

<style scoped>

</style>