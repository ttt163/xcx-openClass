const md5 = require('./md5.min.js')
let $secureKey = 'lingkong.8864.com'
let $appCode = 'app'
let host = 'http://192.168.84.34:8081'
let mk = '/Inter/index'
let $token = md5(`${$appCode}.${$secureKey}`)
let url = `${host}${mk}`
// 点击次数接口
const addPlayNum = (aid) => {
  wx.request({
    url: `${url}/videoPlaytimes?aid=${aid}`,
    data: {},
    success: function (res) {
      // console.log(res)
      let resData = res.data
      if (resData.code === "Success") {
        
      } else {
        console.log(resData)
      }
    }
  })
}

module.exports = {
  url: url,
  $token: $token,
  host: host,
  addPlayNum: addPlayNum
}
