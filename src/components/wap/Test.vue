<template>
	<div class="qd-mask">
	    <div class="qd-mask-bg ">
			
		</div>
		<div class="jr-btn">
			<button type="button">进入评估</button>
		</div>
		<div class="footer-style">
			<p></p>
			<p>VB-MAPP语言行为评估研究中心</p>
		</div>
		
	</div>
	
</template>

<script>
</script>

<style>
	*{
		margin: 0 ;
		padding: 0;
	}
	body,html{
		width: 100%;
		height: 100%;
	}
	.qd-mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 5;
	}
	.qd-mask-bg{
		width: 100%;
		height: 100%;
		background: url(../../../public/mask1.jpg) no-repeat;
		background-size: 100%;
	}
	.qd-mask-bg1{
		background: url(../../../public/jz_mask2.jpg) no-repeat!important;
		background-size: 100%!important;
	}
	.footer-style{
		position: absolute;
		width: 100%;
		bottom: 14px;
		text-align: center;
	}
	.footer-style p:first-child{
		width: 99px;
		height: 29px;
		background: url(../../../public/logo_eq.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
	}
	.footer-style p:last-child{
		font-size: 10px;
		color: #5D6B88;
		margin-top: 10px;
	}
	.jr-btn{
		position: absolute;
		left: 0;
		width: 100%;
		top: 420px;
		text-align: center;
	}
	.jr-btn button{
		width: 157px;
		height: 40px;
		border: none;
		outline: none;
		color: #1DBFB3;
		font-size: 18px;
		background: #FFFFFF;
		border-radius: 40px;
	}
	@media screen and (min-height: 670px){
		.qd-mask-bg{
			background: url(../../../public/mask2.jpg) no-repeat;
			background-size: 100%;
		}
		.jr-btn{
			top: 420px;
		}
		.qd-mask-bg1{
			background: url(../../../public/jz_mask1.jpg) no-repeat!important;
			background-size: 100%!important;
		}
	}
	@media screen and (min-width: 400px){
		.jr-btn{
			top: 460px;
		}
	}
	.top-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		background: #fff;
	}
</style>
