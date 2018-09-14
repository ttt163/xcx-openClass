//index.js
import { addPlayNum, $token, url, host } from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    host: host,
    swiperData: [], //轮播图数据
    column: [],
    columnData: {},
    swiper: {
      autoplay: false,
      nextMargin: '10',
      interval: 5000,
      duration: 500,
      circular: false,
    },
    loginInfo: app.globalData.loginInfo,
    isLogin: false,
    userName: ''
  },
  onLoad: function () {
    // 轮播图
    this.getVideoRecommend()
    // 视频列表
    this.getVideoColumn()
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#login");
  },
  showLogin: function () {
    this.dialog.showDialog();
  },
  //login确认事件
  _confirmEvent() {
    this.toLogin()
  },
  // 登录接口
  toLogin: function () {
    let _this = this
    let dialog = _this.dialog
    
    wx.request({
      url: `${url}/apilogin?email=${dialog.data.userName}&password=${dialog.data.userPwd}`, //仅为示例，并非真实的接口地址
      data: {},
      success: function (res) {
        let resData = res.data
        // console.log(resData)
        if (resData.code === "Success") {
          let _uName = dialog.data.userName.indexOf('@') == -1 ? dialog.data.userName : dialog.data.userName.split('@')[0]
          _this.setData({ isLogin: true, userName: _uName })
          wx.showToast({
            title: '登录成功！',
            icon: 'none',
            duration: 2000,
            complete: function () {
              _this.dialog.hideDialog();
            }
          })
        } else {
          wx.showToast({
            title: resData.data,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  // 轮播图
  getVideoRecommend: function () {
    let _this = this
    wx.request({
      url: `${url}/videoRecommend`, //仅为示例，并非真实的接口地址
      data: {},
      success: function (res) {
        let resData = res.data
        if (resData.code === "Success") {
          // console.log(resData.data)
          _this.setData({ 'swiperData': resData.data })
        } else {
          console.log(resData)
        }
      }
    })
  },
  // 视频分类
  getVideoColumn: function () {
    let _this = this
    wx.request({
      url: `${url}/videoCategory`,
      data: {},
      success: function (res) {
        let resData = res.data
        if (resData.code === "Success") {
          // console.log(resData.data.reverse())
          _this.setData({ 'column': resData.data.reverse()})
          resData.data.map((item) => {
            _this.getVideoList(item.id)
          })
        } else {
          console.log(resData)
        }
      }
    })
  },
  // 当前分类列表
  getVideoList: function (id) {
    let _this = this
    wx.request({
      url: `${url}/videoCategory?sid=${id}&page=1`,
      data: {},
      success: function (res) {
        let resData = res.data
        if (resData.code === "Success") {
          // console.log(resData.data)
          let _thisData = resData.data.result
          if (_thisData.length > 4) {
            _thisData = _thisData.slice(0, 4)
          }
          let columnData = _this.data.columnData
          columnData = { ...columnData, [id]: _thisData}
          _this.setData({ 'columnData': columnData })
        } else {
          console.log(resData)
        }
      }
    })
  },
  // 登录判断，视频播放次数 videoPlayNum
  hasLogin: function (e) {
    // console.log(e)
    let aid = !e.currentTarget.dataset.aid ? '' : e.currentTarget.dataset.aid
    let _type = e.currentTarget.dataset.type
    let url = e.currentTarget.dataset.url
    if (!this.data.isLogin) {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (_type !== 'more') {
        addPlayNum(aid)
      }
      wx.navigateTo({
        url: url
      })
    }
  }
})
