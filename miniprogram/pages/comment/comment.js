// // miniprogram/pages/comment/comment.js
// const db = wx.cloud.database();
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     comment: '', //评论内容，对应value="{{ comment }}"
//     score: 3, //评论分数，对应value="{{ score }}"
//     movieid: -1 //从上个页面传过来的moiveid

//   },
//   onComment: function (event) {
//     //当内容改变会自动调用次方法
//     this.setData({ //给data中的commnet赋值
//       comment: event.detail
//     })
//   },
//   onScore: function (event) {
//     //当内容改变会自动调用次方法
//     this.setData({
//       score: event.detail
//     })
//   },
//   submit: function () { //提交用户输入的内容和打的星星分数
//     db.collection('comment').add({
//       data: {
//         _comment: this.data.comment,
//         _score: this.data.score,
//         _movieid: this.data.movieid
//       }
//     }).then(res => {
//       console.log(res);
//     }).catch(err => {
//       console.log(err);
//     })

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
// pages/comment/comment.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: '', //评论内容，对应value="{{ comment }}"
    score: 3, //评论分数，对应value="{{ score }}"
    movieid: -1, //从上个页面传过来的moiveid
    formatDate: ""
  },
  onCommentChange: function (event) {
    //当内容改变会自动调用次方法
    this.setData({ //给data中的commnet赋值
      comment: event.detail
    })
  },
  onScoreChange: function (event) {
    //当内容改变会自动调用次方法
    this.setData({
      score: event.detail
    })
  },
  submit: function () { //提交用户输入的内容和打的星星分数
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    this.setData({
      formatDate: year + '-' + month + '-' + day + '-' + h + '-' + m + '-' + s
    })

    db.collection('comment').add({
      data: {
        dcomment: this.data.comment,
        dscore: this.data.score,
        dmovieid: this.data.movieid,
        formatDate: this.data.formatDate,
        goodnum: 0
      }
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '评论成功',
      })
    
    }).catch(err => {
      console.log(err);
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从movie页面跳转到评论页面，需要赋值给movieid，movie页面传过来的movieid会保存在options对象中
    this.setData({
      movieid: options.movieid
    })
  },

})