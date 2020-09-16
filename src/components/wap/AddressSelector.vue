<template>
	<div>
		<div class="ipt">
			<input type="text" class="m-input"  v-model="ruleForm.provinceAndCity" readonly="readonly" data-type="3"  @click="showPopup($event)" placeholder="您的地区*" name="address">
			<div>
				<van-popup  position="bottom"  v-model="maskType">
					<van-area title="" :area-list="areaList" @confirm="onConfirmAdd"/>
				</van-popup>
			</div>
		</div>
	</div>
</template>

<script>
	import mAddStr from '../../utils/m_add.js'
	export default{
		data(){
			return{
				areaList:'',
				maskType:false,
				ruleForm: {
					name: '',
					provinceAndCity: '',
					value1: '',
					ideaValue: '',
					iphone: '',
					sheng: '',
					city: '',
				}
			}
		},
		mounted() {
			this.areaList=mAddStr;
		},
		methods:{
			onConfirmAdd(picker, value, index){
				console.log(picker)
				this.maskType=!this.maskType;
				let address=picker[0].name+' '+picker[1].name+' '+picker[2].name;
				this.ruleForm.provinceAndCity = address;
			},
			showPopup(e){
				document.activeElement.blur();
				this.maskType=!this.maskType;
			}
		}
	}
</script>

<style>
</style>
