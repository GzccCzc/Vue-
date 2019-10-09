// miniprogram/pages/history/history.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [], //电影列表
    id: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    db.collection('history').get({
      success: res => {
        console.log(res.data.length)
        var moviearr = []
        for (var i = 0; i < res.data.length; i++) {
          moviearr[i] = res.data[i]._id

        }
        console.log(moviearr)

        for (var i = 0; i < moviearr.length; i++) {
          wx.cloud.callFunction({
            name: "history",
            data: {
              movieid: moviearr[i]
            }
          }).then(res => {
            console.log(res)
            this.setData({
              movieList: this.data.movieList.concat(JSON.parse(res.result))
              //拿到detail对象后我们就可以通过它显示数据在我们页面上了
            })
            console.log(JSON.parse(res.result))
            wx.hideLoading() //结束加载页面
          }).catch(err => {
            console.log(err)
          })
        }

        // this.setData({
        //   id: res.data
        // })
      }
    })
    //获取云数据库的历史记录ID


  },
  gotoDetail: function (event) { //跳转到详情页面
    console.log(event)
    db.collection('history').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: JSON.parse(event.target.dataset.movieid)
      }
    })
    wx.navigateTo({
      url: `../movieDetail/movieDetail?movieid=${event.target.dataset.movieid}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})