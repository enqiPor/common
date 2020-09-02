<template>
	 <div>
		<el-date-picker
		  v-model="value"
		  :type="dateType.type"
		  placeholder="选择日期">
		</el-date-picker>
	 </div>
</template>

<script>
	// 调用组件传dateType 选项类型
	//dateType:{
				// type:'year',
				// format:'yyyy-MM-dd'
				//...
	//}
	//type:
	//	1.year年份
	//	2.month月份
	//	3.date年月日
	//	4.week周
	//	5.datetime年月日时分
		
	//	显示类型
	//	format="yyyy-MM-dd HH:mm"
	//或更多配置
	export default{
		props:["dateType"],
		data(){
			return{
				value: ''
			}
		}
	}
</script>

<style lang="scss">
</style>
