<template>
<div class="container">
    <!-- 视频上传阿里云s -->
    <div class="up-video">
        <div v-show="uploadStart">上传视频</div>
        <input type="file" id="fileUpload" @change="fileChange($event)">
        <!-- 上传加载进度s -->
        <div class="upload-style" v-show="uploadType">
            <el-progress :percentage="authProgress" :format="format"></el-progress>
        </div>
        <!-- 上传加载进度e -->
        <!-- 上传完成后展示video首图s -->
        <div class="play-btn" v-show="upSuccess">
            <p :data-videoid='videoId' @click="palyVideo($event)"><i class="el-icon-video-play"></i></p>
            <img :src="coverURL" alt="">
        </div>
        <!-- 上传完成后展示video首图e -->
    </div>
    <div id="video_play">

    </div>
</div>
</template>

<script>
//上传视频需要引用阿里云3个js文件
export default {
    data() {
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
            uploadType: false,
            upSuccess: false,
            uploadStart: true,
            videoId: '',
            coverURL: ''
        }
    },
    mounted() {},
    methods: {
        fileChange(e) {
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
        authUpload() {
            // 然后调用 startUpload 方法, 开始上传
            if (this.uploader !== null) {
                this.uploader.startUpload()
                this.uploadDisabled = true
                this.pauseDisabled = false
            }
        },
        // 暂停上传
        pauseUpload() {
            if (this.uploader !== null) {
                this.uploader.stopUpload()
                this.resumeDisabled = false
                this.pauseDisabled = true
            }
        },
        // 恢复上传
        resumeUpload() {
            if (this.uploader !== null) {
                this.uploader.startUpload()
                this.resumeDisabled = true
                this.pauseDisabled = false
            }
        },
        createUploader(type) {
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
                    self.uploadType = true;
                },
                // 开始上传
                onUploadstarted: function (uploadInfo) {
                    // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
                    // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
                    // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
                    // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
                    // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
                    // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
                    console.log(uploadInfo)
                    if (!uploadInfo.videoId) {
                        let createUrl = '/common/fileupload/createUploadVideo.do?filename=' + uploadInfo.file.name + "&filesize=" + uploadInfo.file.size
                        self.$axios.get(createUrl).then(({
                            data
                        }) => {
                            console.log(data.data.UploadAuth)
                            let uploadAuth = data.data.UploadAuth
                            let uploadAddress = data.data.UploadAddress
                            let videoId = data.data.VideoId
                            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
                        })
                    } else {
                        // 如果videoId有值，根据videoId刷新上传凭证
                        // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
                        let refreshUrl = '/common/fileupload/createUploadVideo.do?filename=' + uploadInfo.file.name + "&filesize=" + uploadInfo.file.size
                        self.$axios.get(refreshUrl).then(({
                            data
                        }) => {
                            let uploadAuth = data.data.UploadAuth
                            let uploadAddress = data.data.UploadAddress
                            let videoId = data.data.VideoId
                            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
                        })
                    }
                },
                // 文件上传成功
                onUploadSucceed: function (uploadInfo) {
                    console.log(uploadInfo)
                    let getVideoPlayAuth = function () {
                        self.$axios.get('/common/fileupload/getVideoPlayAuth.do?videoId=' + uploadInfo.videoId).then(({
                            data
                        }) => {
                            if (data.extension == "1") {
                                self.uploadType = false;
                                self.uploadStart = false;
                                self.upSuccess = true;
                                self.videoId = data.data.VideoMeta.videoId;
                                self.coverURL = data.data.VideoMeta.coverURL;
                            } else {
                                setTimeout(function () {
                                    getVideoPlayAuth();
                                }, 5000);
                            }
                        })
                    }
                    getVideoPlayAuth();
                },
                // 文件上传失败
                onUploadFailed: function (uploadInfo, code, message) {
                    self.uploadType = false;
                    self.$message.error('视频上传失败!');
                },
                // 取消文件上传
                onUploadCanceled: function (uploadInfo, code, message) {
                    self.uploadType = false;
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
                    self.$axios.get(refreshUrl).then(({
                        data
                    }) => {
                        let uploadAuth = data.UploadAuth
                        uploader.resumeUploadWithAuth(uploadAuth)
                    })
                    self.$message({
                        message: '文件超时...',
                        type: 'warning'
                    });
                },
                // 全部文件上传结束
                onUploadEnd: function (uploadInfo) {}
            })
            return uploader
        },
        format(percentage) {
            return percentage === 100 ? '视频转码中...' : `${percentage}%`;
        },
        palyVideo(event) {
            let el = event.currentTarget;
            let thisObj = this;
            this.$axios.get('/common/fileupload/getVideoPlayAuth.do?videoId=' + el.getAttribute("data-videoid")).then(({
                data
            }) => {
                if (data.extension == "1") {
                    var player = new Aliplayer({
                        id: "video_play",
                        "width": "100%",
                        "height": "100%",
                        "autoplay": true,
                        "isLive": false,
                        "rePlay": false,
                        "playsinline": true,
                        "preload": true,
                        "controlBarVisibility": "hover",
                        "useH5Prism": true,
                        vid: el.getAttribute("data-videoid"),
                        playauth: data.data.PlayAuth,
                        cover: '',
                        "skinLayout": [{
                                "name": "bigPlayButton",
                                "align": "blabs",
                                "x": 30,
                                "y": 80
                            },
                            {
                                "name": "errorDisplay",
                                "align": "tlabs",
                                "x": 0,
                                "y": 0
                            },
                            {
                                "name": "infoDisplay"
                            },
                            {
                                "name": "tooltip",
                                "align": "blabs",
                                "x": 0,
                                "y": 56
                            },
                            {
                                "name": "thumbnail"
                            },
                            {
                                "name": "controlBar",
                                "align": "blabs",
                                "x": 0,
                                "y": 0,
                                "children": [{
                                        "name": "progress",
                                        "align": "blabs",
                                        "x": 0,
                                        "y": 44
                                    },
                                    {
                                        "name": "playButton",
                                        "align": "tl",
                                        "x": 15,
                                        "y": 12
                                    },
                                    {
                                        "name": "timeDisplay",
                                        "align": "tl",
                                        "x": 10,
                                        "y": 5
                                    },
                                    {
                                        "name": "fullScreenButton",
                                        "align": "tr",
                                        "x": 10,
                                        "y": 12
                                    }
                                ]
                            }
                        ]
                    }, function (player) {});
                } else {
                    thisObj.$message.error('视频播放失败!');
                }
            })
        }
    }
}
</script>

<style lang="scss">
.upload-style {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    z-index: 2;

    div {
        width: 100%;
        text-align: center;
    }

    p {
        margin-block-start: 0em;
        margin-block-end: 0em;
    }
}

.el-progress__text {
    color: #fff !important;
    margin-left: 0 !important;
    margin-top: 5px;
}

.upload-style,
.up-video {
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

.up-video {
    position: relative;
    width: 170px;
    height: 150px;
    border: 1px dashed #d9d9d9;
    font-size: 14px;
    color: #5e6d82;
}

.up-video:hover {
    border: 1px dashed #409eff;
}

#fileUpload {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 1;
    opacity: 0;
}

.play-btn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
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
    overflow: hidden;
    z-index: 2;

    p {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0 !important;
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

    img {
        max-width: 100%;
        height: 100%;
    }
}

.el-icon-video-play {
    font-size: 36px;
    cursor: pointer;
}

#video_play {
    width: 300px !important;
    height: 200px !important;
    border: 1px solid red;
    position: relative;
}
</style>
