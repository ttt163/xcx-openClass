// pages/video-detail/index.js
import { addPlayNum, $token, url, host} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: host,
    sid: 0,
    currpage: 1,
    totalPage: 0,
    columnName: '',
    videoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ columnName: options.sName, sid: options.sid })
    this.getVideoList(options.sid)
  },
  // 当前分类列表
  getVideoList: function (id, page) {
    let _this = this
    let _page = !page ? 1 : page
    wx.request({
      url: `${url}/videoCategory?sid=${id}&page=${_page}`,
      data: {},
      success: function (res) {
        let resData = res.data
        if (resData.code === "Success") {
          // console.log(resData.data)
          let _thisData = resData.data.result
          let videoList = []
          if (parseInt(_page) === 1) {
            videoList = _thisData
          } else {
            videoList = _this.data.videoList
            videoList = [...videoList, ..._thisData]
          }
          _this.setData({
            'videoList': videoList,
            'currpage': _page,
            'totalPage': resData.data.totalPage
          })
        } else {
          console.log(resData)
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let nextPage = parseInt(this.data.currpage) + 1
    if (nextPage > this.data.totalPage) {
      return
    }
    this.getVideoList(this.data.sid, nextPage)
  },
  // 视频播放次数
  videoPlayNum: function (e) {
    let aid = e.currentTarget.dataset.aid
    addPlayNum(aid)
  }
})