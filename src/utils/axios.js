import Http from './index.js'
const http = new Http();

export default class beg {
    //shopList 为自定义方法名
    //不传值渲染
    // 示例1
    shopList() {
        return http.request({
            url: `https://api.it120.cc/small4/banner/list`,
            type:'get'
        })
    }
    //传值获取 例：
    // 示例2
    shopId(id) {
        return http.request({
            url: `https://api.it120.cc/small4/shop/goods/detail/?id=${id}`,
            type:'post'
        })
    }
}
