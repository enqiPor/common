<template>
  <div class="container">
	<!-- 视频上传阿里云s -->
	<div class="up-video">
		上传视频
        <input type="file" id="fileUpload" @change="fileChange($event)">
		<div class="upload-style" v-show="uploadType">
			<el-progress type="circle" :percentage="authProgress" :width="60" :stroke-width="3"></el-progress>
		</div>
	</div>
  </div>
</template>
<script>
	import axios from "axios";
	//上传视频需要引用阿里云3个js文件
  export default {
    data () {
      return {
        timeout: '',
        partSize: '',
        parallel: '',
        retryCount: '',
        retryDuration: '',
        region: 'cn-shanghai',
        userId: '1114809017502275',
        file: null,
        authProgress: 0,
        uploadDisabled: true,
        resumeDisabled: true,
        pauseDisabled: true,
        uploader: null,
        statusText: '',
		uploadType:false
      }
    },
	mounted() {
	},
    methods: {
      fileChange (e) {
        this.file = e.target.files[0]
        if (!this.file) {
		  this.$message({
			message: '请先选择需要上传的视频!',
			type: 'warning'
		  });
          return
        }
        var Title = this.file.name
        var userData = '{"Vod":{}}'
        if (this.uploader) {
          this.uploader.stopUpload()
          this.authProgress = 0
          this.statusText = ""
        }
        this.uploader = this.createUploader()
        this.uploader.addFile(this.file, null, null, null, userData)
        this.uploadDisabled = false
        this.pauseDisabled = true
        this.resumeDisabled = true
      },
      authUpload () {
        // 然后调用 startUpload 方法, 开始上传
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.uploadDisabled = true
          this.pauseDisabled = false
        }
      },
      // 暂停上传
      pauseUpload () {
        if (this.uploader !== null) {
          this.uploader.stopUpload()
          this.resumeDisabled = false
          this.pauseDisabled = true
        }
      },
      // 恢复上传
      resumeUpload () {
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.resumeDisabled = true
          this.pauseDisabled = false
        }
      },
      createUploader (type) {
        let self = this
        let uploader = new AliyunUpload.Vod({
          timeout: self.timeout || 60000,
          partSize: self.partSize || 1048576,
          parallel: self.parallel || 5,
          retryCount: self.retryCount || 3,
          retryDuration: self.retryDuration || 2,
          region: self.region,
          userId: self.userId,
          // 添加文件成功
          addFileSuccess: function (uploadInfo) {
            self.uploader.startUpload()
            self.uploadDisabled = true;
            self.pauseDisabled = false;
			self.uploadType=true;
          },
          // 开始上传
          onUploadstarted: function (uploadInfo) {
            // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
            // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
            // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
            // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
            // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
            // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
            if (!uploadInfo.videoId) {
              let createUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateUploadVideo?Title=testvod1&FileName=aa.mp4&BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&VideoId=5bfcc7864fc14b96972842172207c9e6'
              axios.get(createUrl).then(({data}) => {
                let uploadAuth = data.UploadAuth
                let uploadAddress = data.UploadAddress
                let videoId = data.VideoId
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)                
              })
            } else {
              // 如果videoId有值，根据videoId刷新上传凭证
              // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
              let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
              axios.get(refreshUrl).then(({data}) => {
                let uploadAuth = data.UploadAuth
                let uploadAddress = data.UploadAddress
                let videoId = data.VideoId
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
              })
            }
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo) {
			self.uploadType=false;
          },
          // 文件上传失败
          onUploadFailed: function (uploadInfo, code, message) {
			self.uploadType=false;
			self.$message.error('视频上传失败!');
          },
          // 取消文件上传
          onUploadCanceled: function (uploadInfo, code, message) {
			self.uploadType=false;
			self.$message({
			  message: '文件已暂停上传',
			  type: 'warning'
			});
          },
          // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
          onUploadProgress: function (uploadInfo, totalSize, progress) {
            let progressPercent = Math.ceil(progress * 100)
            self.authProgress = progressPercent
          },
          // 上传凭证超时
          onUploadTokenExpired: function (uploadInfo) {
            // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
            // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
            // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
            let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
            axios.get(refreshUrl).then(({data}) => {
              let uploadAuth = data.UploadAuth
              uploader.resumeUploadWithAuth(uploadAuth)
            })
			self.$message({
			  message: '文件超时...',
			  type: 'warning'
			});
          },
          // 全部文件上传结束
          onUploadEnd: function (uploadInfo) {
			self.uploadType=false;
          }
        })
        return uploader
      }
    }
  }
</script>
<style lang="scss">
	.upload-style{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.8);
		color: #fff;
		z-index: 2;
		div{
			width: 100%;
			text-align: center;
			margin: 0 auto;
		}
		p{
			margin-block-start: 0em;
			margin-block-end: 0em;
		}
	}
	.el-progress__text{
		color: #fff!important;
	}
	.upload-style,.up-video{
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
	.up-video{
		position: relative;
		width: 150px;
		height: 150px;
		border: 1px dashed #d9d9d9;
		font-size: 14px;
		color: #5e6d82;
	}
	.up-video:hover{
		border: 1px dashed #409eff;
	}
	#fileUpload{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		cursor: pointer;
		z-index: 1;
		opacity: 0;
	}
</style>