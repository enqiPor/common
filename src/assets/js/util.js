import Vue from 'vue'
const callMethod={
	/**
	 * @param 
	 * 获取url某个参数
	调函数传需要的参数
	 */
	GetQueryString:function(name) {
	    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    let r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	},
	
	/**
	 * @param 
	 * 字符串去重
	 */
	toRepeat:function(str){
		let newStr="";
		for(let i=0;i<str.length;i++){
			if(newStr.search(str[i])==-1)	
			newStr+=str[i]+",";	
			
		}
		return newStr.substring(0,newStr.length-1);
	}
	
}

Vue.prototype.callMethod=callMethod;

export default{}