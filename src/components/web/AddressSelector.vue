<template>
	<div>
		<div class="block">
		  <el-cascader
		    v-model="value"
		    :options="options"
		    @change="handleChange" placeholder="请选择地址"></el-cascader>
		</div>
	</div>
</template>

<script>
	// 需要引用省市区json
	import AddArr from "../../assets/citys.json";
	export default{
		data(){
			return{
				options: [],
				value:[],
				ruleForm: {
					provinceAndCity: '',
				},
				rules: {
					provinceAndCity: [{
						required: true,
						message: '请选择地址',
						trigger: 'change'
					}]
				},
			}
		},
		created() {
			this.options = AddArr;
		},
		methods: {
		  handleChange(value) {
			//返回省市区code
		  }
		}
	}
</script>

<style>
</style>
