//index.js
//获取应用实例
const db = wx.cloud.database()
const book = db.collection('mybook')
const app = getApp()

Page({
  data: {
    result: '',
    book_list: {}
  },

  viewItem: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id=' + id,
    })
  },

  delete: function (event) {
    db.collection('mybook').doc(event.currentTarget.dataset.id).remove({
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }

    })
    db.collection('mybook').get({
      success: res => {
        console.log(res.data)
        this.setData({
          book_list: res.data
        })
      }
    })


  },

  onSearch: function (e) {
    console.log(e.detail)
    wx.cloud.callFunction({
      name: "bookdetail",
      data: {
        isbn: e.detail
      },
      success: res => {
        console.log(res)
        var bookstring = res.result;
        // console.log(JSON.parse(bookstring))
        const db = wx.cloud.database()
        const book = db.collection('mybook')
        db.collection('mybook').add({
          data: JSON.parse(bookstring),
          success: function (res) {
            console.log(res)
          },
          fail: console.error
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },


  onLoad: function () {
    db.collection('mybook').get({
      success: res => {
        console.log(res.data)
        this.setData({
          book_list: res.data
        })
      }
    })
  },



  getScancode: function () {
    wx.scanCode({
      success: (res) => {
        wx.showToast({
          title: '添加成功',
        })
        console.log(res.result)
        wx.cloud.callFunction({
          name: "bookdetail",
          data: {
            isbn: res.result
          },
          success: res => {
            console.log(res)
            var bookstring = res.result;
            // console.log(JSON.parse(bookstring))
            const db = wx.cloud.database()
            const book = db.collection('mybook')
            db.collection('mybook').add({
              data: JSON.parse(bookstring),
              success: function (res) {
                console.log(res)

              }
            })
            db.collection('mybook').get({
              success: res1 => {
                console.log(res1)
                this.setData({
                  book_list: res1.data
                })
              }
            })
          }

        })
      }
    })


  },

  onPullDownRefresh: function () {
    var _this = this;
    db.collection('mybook').get({
      success: res => {
        console.log(res.data)
        this.setData({
          book_list: res.data
        })
      }
    })
  },

})