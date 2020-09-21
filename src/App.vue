<template>
<div id="app">

    <router-view />
</div>
</template>

<style lang="scss">
	/*base*/
	*{margin:0;padding:0;box-sizing: border-box;}
	*:after, *::before {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	textarea{
	  erflow: hidden;
	  resize: none;
	  padding: 10px;
	}
	i{
	  font-style: inherit;
	}
	input,fieldset,img {
	  border:0;
	}
	input,select,textarea{
	  box-sizing: border-box;padding-left: 10px;
	}
	address,caption,cite,code,dfn,strong,th,var,optgroup {
	  font-style:inherit;
	  font-weight:inherit;
	}
	caption,th {
	  text-align:left;
	}
	input,button,textarea,select,optgroup,option {
	  font-family:inherit;
	  font-size:inherit;
	  font-style:inherit;
	  font-weight:inherit;
	  outline: none;
	}
	input{
	  -webkit-appearance:none;
	}
	input::-webkit-search-cancel-button {
	  display: none;
	}
	li{
	  list-style:none;
	}
	h1,h2,h3,h4,h5,h6{
	  font-size:12px;
	  font-weight:400;
	}
	.clear:before,.clear:after{
	  content:"";
	  display:table;
	  clear:both;
	}
	.fl{
	  float:left;
	}
	.fr{
	  float:right;
	}
	a{
	  text-decoration:none;
	}
	a:link{
	  color:#333;
	}
	a:hover{
	  color:#333;
	}
	a:visited{
	  color:#333;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button{
	  -webkit-appearance: none !important;
	  margin: 0;
	}
	input[type="number"] {
	  -moz-appearance: textfield;
	}
	em{
	  font-style: inherit;
	}
	.flexs{
	  display: flex;
	  -webkit-display: flex;
	  -moz-display: flex;
	  -o-display: flex;
	  align-items: center;
	  -webkit-align-items: center;
	  -moz-align-items: center;
	  -o-align-items: center;
	  justify-content: center;
	  -webkit-justify-content: center;
	  -moz-justify-content: center;
	  -o-justify-content: center;
	}
	input[type="number"]{
	  -moz-appearance:textfield;
	}
	body{
	  font-family: "PingFang SC", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft Yahei", 微软雅黑, SimHei, 黑体, sans-serif;
	  color: #333;
	}

</style>
