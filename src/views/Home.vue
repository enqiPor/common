<template>
<div class="home">
    <div>恩启项目公共组件</div>
    <div class="home-btn-box">
        <el-button type="primary" @click="goAxios">axios组件示例</el-button>
        <el-button type="primary" @click="AddressSelector">地址选择器</el-button>
        <el-button type="primary" @click="upvide">上传视频</el-button>
        <el-button type="primary" @click="upImage">上传图片</el-button>
        <el-button type="primary" @click="timePicker">时间选择器</el-button>
        <el-button type="primary" @click="selectAdd">下拉选择框</el-button>
        <el-button type="primary" @click="pageAdd">分页</el-button>
        <el-button type="primary" @click="datePicker">日期选择器</el-button>
	 </div>
    <div class="home-btn-box">
        <el-button type="primary" @click="rapidNav">快速导航</el-button>
    </div>
	<Picker :columnsArr="columnsArr"></Picker>
    <!-- <Upvideo></Upvideo> -->
</div>
</template>

<script>
// import Upvideo from '../components/web/Upvideo.vue'
import Picker from '../components/wap/Picker.vue'
export default {
    name: 'Home',
	data(){
		return{
			//1.type为可选值为 date time year-month month-day datehour
			//2.选项格式化函数 ：选择器是否加年月日，true:加，false:不加
			//3.min-date 起始时间:'2020,10,1'
			//4.max-date 最后时间:'2028,10,1'
			columnsArr:['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
			timeType:{
				type:'datehour',
				formatterType:false,
				minDate:'2020,10,1',
				maxDate:'2028,10,1'
			}
		}
	},
    mounted() {},
    components: {
        // Upvideo
		Picker
    },
    methods: {
        goAxios() {
            this.$router.push('/axios');
        },
        upvide() {
            let upvideo = this.$router.resolve({
                path: '/upvideo'
            });
            window.location.href = upvideo.href;
        },
        upImage() {
            let upimage = this.$router.resolve({
                path: '/upimage'
            });
            window.location.href = upimage.href;
        },
        timePicker() {
            let timepicker = this.$router.resolve({
                path: '/timepicker'
            });
            window.location.href = timepicker.href;
        },
        selectAdd() {
            let select = this.$router.resolve({
                path: '/select'
            });
            window.location.href = select.href;
        },
        pageAdd() {
            let page = this.$router.resolve({
                path: '/page'
            });
            window.location.href = page.href;
        },
        datePicker() {
            let datepicker = this.$router.resolve({
                path: '/datepicker'
            });
            window.location.href = datepicker.href;
        },
        AddressSelector() {
            let datepicker = this.$router.resolve({
                path: '/AddressSelector'
            });
            window.location.href = datepicker.href;
        },
        rapidNav() {
            let speedinessnav = this.$router.resolve({
                path: '/speedinessnav'
            })
            window.location.href = speedinessnav.href;
        }
    }
}
</script>

<style lang="scss">
.home {
    width: 76%;
    height: 500px;
    margin: 0 auto;
    border: 10px solid deepskyblue;
    padding: 30px;

    div {
        width: 100%;
        text-align: center;
        font-size: 20px;
        margin-bottom: 30px;
    }

    button {
        width: 145px;
        text-align: center;
    }
}

.home-btn-box {
    display: flex;
    justify-content: left;
}

.home-btn {
    cursor: pointer;
}
</style>
