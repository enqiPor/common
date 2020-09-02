import Axios from "axios";
class Http {
    //request 方法
    request(params) {
        return new Promise((resolve, reject) => {
            Axios({
                method: params.type || "get",
                url: params.url,
                data: params.data,
                headers: params.headers
            })
                .then(res => {
                    if (res.data.code === 0) {
                        //code 字段根据后端定义的自行更换
                        resolve(res);
                    } else {
                        console.log(res.data.msg);
                    }
                })
                .catch(err => {
                    reject(err.statusText); //失败
                    console.log('网络异常');
                });
        });
    }
}
export default Http;
