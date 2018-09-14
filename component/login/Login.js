// component/login/Login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    userName: '',
    userPwd: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: false
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: true
      })
    },
     /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    },
    changeValue(e) {
      let key = e.currentTarget.dataset.key
      let value = e.detail.value
      this.setData({
        [key]: value
      })
    }
  }
})
