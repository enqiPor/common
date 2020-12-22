//login.js
import request from '@/utils/request'

export function doLogin (videoId) {
  let data = {
    videoId
  }
  return request({
    url: '/common/fileupload/getVideoPlayAuth.do',
    method: 'POST',
    data
  })
}
// 调用
// doLogin(this.username, this.password).then(res => {}