<template>
  <div class="paging">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="totlePage" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
//1.调用组件传 totlePage 总页面
//2.向调用组件传 @thisPage 取当前page
export default {
  name: 'paging',
  props:["totlePage"],
  methods:{
	  changePage(event){
		  this.$emit("thisPage",event);
	  }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
