<template>
	<div>
		<input type="text" class="m-input"   readonly="readonly"  @click="maskType =!maskType" placeholder="请选择" name="">
		<van-popup  position="bottom"  v-model="maskType">
			<van-picker
			  show-toolbar
			  :columns="columns"
			  @confirm="onConfirm"
			/>
		</van-popup>
	</div>
</template>

<script>
	// 调用组件传参 均为必填
	export default{
		props:["columnsArr"],
		data() {
		    return {
		      maskType:false,
			  name:'',
			  columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
		    };
		  },
		  computed:{
			totals(){
				let a=[1,2,3,4,5,6,7],b=0;
				for(let i=0;i<a.length;i++){
					b=b+=a[i];
				}
				return b;
			}  
		  },
		  methods:{
			  onConfirm(value, index) {
				  alert(value)
			  	this.maskType=!this.maskType;
			  }
		  }
	}
</script>

<style scoped>
</style>
