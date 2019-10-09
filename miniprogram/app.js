//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      var that = this;
      // 使用设备可视宽高
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.windowWidth = res.windowWidth;
          that.globalData.windowHeight = res.windowHeight;
        }
      });
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
        }
      });
    }
  },
   globalData: {
    userInfo: null,
    windowWidth: 0,
    windowHeight: 0,
    doubanBase: "https://www.easy-mock.com/mock/5cd0faf6e1fe52746e062d07/weapp/douban/",
    inTheaters: "movie/in_theaters",
    comingSoon: "movie/coming_soon",
    top250: "movie/top250",
    subject: "movie/subject/",
    celebrity: "movie/celebrity/",
    search: "movie/search"
  }
})
