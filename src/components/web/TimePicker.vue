<template>
	<div>
		<!--固定时间点-->
		<el-time-select
		  v-model="value"
		  :picker-options="{
		    start: timeType.start,
		    step: timeType.step,
		    end: timeType.end
		  }"
		  placeholder="选择时间">
		</el-time-select>
		<!--固定时间范围
		 <el-time-select
		    placeholder="起始时间"
		    v-model="startTime"
		    :picker-options="{
		      start: '08:30',
		      step: '00:15',
		      end: '18:30'
		    }">
		  </el-time-select>
		  <el-time-select
		    placeholder="结束时间"
		    v-model="endTime"
		    :picker-options="{
		      start: '08:30',
		      step: '00:15',
		      end: '18:30',
		      minTime: startTime
		    }">
		  </el-time-select>-->
	</div>
</template>

<script>
	// 调用组件传参
	// timeType:{
	//  start:'00:00',
	//  step:'00:30',
	// 	end:'23:00'
	// }
	export default{
		props:["timeType"],
		data() {
		  return {
			value: '',
			startTime: '',
			endTime: ''
		  };
		}
	}
</script>

<style>
</style>
