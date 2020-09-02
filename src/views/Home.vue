<template>
  <div class="home">
      <div>恩启项目公共组件</div>
      <el-button type="primary" @click="goAxios">axios组件示例</el-button>
      <el-button type="primary" @click="goBuild">预渲染打包文档</el-button>
  </div>
</template>

<script>



export default {
  name: 'Home',
  components: {

  },
   methods:{
       goAxios() {
           let axios = this.$router.resolve({
               path:'/axios'
           })
           window.location.href = axios.href;
       },
       goBuild(){
           let build = this.$router.resolve({
               path:'/build'
           })
           window.location.href = build.href;
       }
   }
}
</script>
<style lang="scss">
    .home{
        width: 80%;
        height: 500px;
        margin: 0 auto;
        border: 10px solid deepskyblue;
        padding: 30px;
        div{
            width: 100%;
            text-align: center;
            font-size: 20px;
            margin-bottom: 30px;
        }
    }
    .home-btn{
        cursor: pointer;
    }
</style>
