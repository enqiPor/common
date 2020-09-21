<template>
	<div>
		<input type="text" class="m-input"  v-model="timeVal" readonly="readonly"  @click="showPopup($event)" placeholder="请选择日期" name="">
		<van-popup  position="bottom"  v-model="maskType">
			<template v-if="formatterType">
				<van-datetime-picker
				  v-model="currentDate"
				  :type="timeType.type"
				  title=""
				  :min-date="minDate"
				  :max-date="maxDate"
				  @confirm="onConfirmAdd"
				  :formatter="formatter"
				/>
			</template>
			<template v-else>
				<van-datetime-picker
				  v-model="currentDate"
				  :type="timeType.type"
				  title=""
				  :min-date="minDate"
				  :max-date="maxDate"
				  @confirm="onConfirmAdd"
				/>
			</template>
		</van-popup>
	</div>
</template>

<script>
	// 调用组件传参 均为必填
	//传参1.type为可选值为 date time year-month month-day datehour
	//传参2.选项格式化函数 ：选择器是否加年月日，true:加，false:不加
	//3.min-date 起始时间:'2020,10,1'
	//4.max-date 最后时间:'2028,10,1'
	//timeType:{
	//	type:'datehour',
	//	formatterType:false				
	//  minDate:'2020,10,1',
	//	maxDate:'2028,10,1'
	//}
	export default{
		props:["timeType"],
		data() {
		    return {
		      maskType:false,
		      minDate: new Date(this.timeType.minDate),
		      maxDate: new Date(this.timeType.maxDate),
		      currentDate: new Date(),
			  timeVal:'',
			  formatterType:this.timeType.formatterType
		    };
		  },
		  methods:{
			  onConfirmAdd(value){
			  	this.maskType=!this.maskType;
			    let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				if(this.timeType.type == 'date'){
					this.timeVal = y + '-' + MM + '-' + d;
				}else if(this.timeType.type == 'time'){
					this.timeVal =  h + ':' + m;
				}else if(this.timeType.type == 'year-month'){
					this.timeVal = y + '-' + MM
				}else if(this.timeType.type == 'month-day'){
					this.timeVal = MM + '-' + d
				}else if(this.timeType.type == 'datehour'){
					this.timeVal = y + '-' + MM + '-' + d + ' ' + h + ':' + m
				}
			  },
			  showPopup(e){
			  	document.activeElement.blur();
			  	this.maskType=!this.maskType;
			  },
			  formatter(type, val) {
				  if (type === 'year') {
					return val + '年';
				  }
				  if (type === 'month') {
					return val + '月';
				  }
				  if (type === 'day') {
					return val + '日';
				  }
				  if (type === 'hour') {
				  	return val + '时';
				  }
				  if (type === 'minute') {
				  	return val + '分';
				  }
				  return val;
			  },
		  }
	}
</script>

<style>
</style>
