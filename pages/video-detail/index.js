// pages/video-detail/index.js
import { addPlayNum, $token, url, host } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: host,
    videoInfo: null,
    isShowIntro: true,
    isHide: true,
    isTextHide: true,
    video: {
      isShowPlayBtn: true,
      controls: true,
      videoUrl: 'http://tdl01.8864.com/lkcps/WeChatSight649.mp4',
      imgUrl: '../../img/temp/page3-img1.jpg'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({ isHide: true })
    this.getVideoDetail(options.aid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
  },

  changeTap: function () {
    this.setData({ isShowIntro: !this.data.isShowIntro })
  },

  showFullText: function () {
    this.setData({ isTextHide: !this.data.isTextHide })
  },
// 视频播放
  play: function () {
    this.setData({ isHide: false })
    this.videoCtx.play()
    setTimeout(() => {
      this.videoCtx.requestFullScreen()
    }, 100)
  },
  
  // 全屏，退出全屏监听
  fullScreen: function (e) {
    let isFullScreen = e.detail.fullScreen
    if (!isFullScreen) {
      this.setData({isHide: true })
      // this.videoCtx.seek(0)
      this.videoCtx.pause()
    }
  },

  // 视频详情
  getVideoDetail: function (aid) {
    let _this = this
    wx.request({
      url: `${url}/videoContent?aid=${aid}`, //仅为示例，并非真实的接口地址
      data: {},
      success: function (res) {
        let resData = res.data
        if (resData.code === "Success") {
          // console.log(resData.data)
          _this.setData({ 'videoInfo': resData.data })
        } else {
          console.log(resData)
        }
      }
    })
  }
})