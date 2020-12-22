import axios from 'axios'
import {Message,Loading} from 'element-ui'
import router from '../router/index.js'  //注意路径与文件名

const service = axios.create({
  baseURL: '/api', // api 的 base_url
  timeout: 50000 // request timeout
})

// 定义loading变量
let loading 

//loading-start 方法
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

 //loading-close 方法
function endLoading () {
  loading.close()
}

// 请求拦截  设置统一header
service.interceptors.request.use(
  config => {
    // 加载
    startLoading()
    if (localStorage.eleToken) {
      config.headers.Authorization ='123456789'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    console.log(response.data)
    // response.data 可根据状态判断逻辑
    endLoading()
    return response
  },
  error => {
    // 错误提醒
    endLoading()
    Message.error(error.response.data)

    const { status } = error.response
    if (status === 401) {//可自定义
      Message.error('token值无效，请重新登录')
      // 清除token
      localStorage.removeItem('eleToken')

      // 页面跳转
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default service