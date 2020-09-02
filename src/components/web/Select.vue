<template>
	<div>
		<el-select v-model="value" placeholder="请选择" @change="selectVal">
		    <el-option
		      v-for="item in selectArr"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	</div>
</template>

<script>
	// 调用组件声明 selectArr
	//传入数据[{value:1,label:'2'},{value:1,label:'2'}]
	//可自定义传值，修改相应的参数
	export default {
		props:["selectArr"],
	    data() {
	      return {
	        value: ''
	      }
	    },
		methods:{
			selectVal(value){
				//返回选中val
			}
		}
	  }
</script>

<style>
</style>
