<template>
	<div id="container">
		
	</div> 
</template>

<script>
	// 点标记map
	//调用组件传
	// lonAndLat:{
	//  lon:'116.397428',
	//  lat:'39.90923'			
	// }
	export default{
		props:["lonAndLat"],
		mounted() {
			var map = new AMap.Map('container',{
				zoom: 13
			});
			// 创建一个 Marker 实例：
			var marker = new AMap.Marker({
			    resizeEnable: true,
				center: [this.lonAndLat.lon, this.lonAndLat.lat]
				
			});
			
			// 将创建的点标记添加到已有的地图实例：
			map.add(marker);
		}
	}
</script>

<style lang="scss">
	#container{
		width: 100%;
		height: 500px;
	}
</style>
