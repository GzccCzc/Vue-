// pages/movieDetail/movieDetail.js
const db = wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid: {},
    comment: {},
    isFold: true,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['时间升序', '时间降序'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    arr:[]
  },
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
    if (Index == 0) {
      e.target.dataset.comment1 = e.target.dataset.comment1.reverse()
      this.setData({
        comment: e.target.dataset.comment1
      })
    }
    else {
      e.target.dataset.comment1 = e.target.dataset.comment1.reverse()
      this.setData({
        comment: e.target.dataset.comment1
      })
    }
    console.log(e)
  },
  showAll: function (e) {
    
    this.setData({
      isFold: !this.data.isFold,
    })
  },
  comment: function (event) {
    console.log(event)
    db.collection('comment').where({
      dmovieid: event
    }).get().then(res => {
      console.log(res)
      for (var index in res.data) {
        res.data[index].formatDate = res.data[index].formatDate.substring(0, 9)
      }


      console.log(res)
      //console.log(res.data[0].dcomment)
      this.setData({
        comment: res.data,

      })
    }).catch(err => {
      console.log(err)
    })
  },
  transcore: function (e) {
    // console.log(e)
    console.log(111)
  },
  openimg:function(e){
    console.log(e)
    
    for (var i = 0; i < e.target.dataset.list.length;i++)
    {
      this.setData({
        arr:this.data.arr.concat(e.target.dataset.list[i].image)
      }) 
    }
    wx.previewImage({
      current: e.target.dataset.img, // 当前显示图片的http链接
      urls: this.data.arr// 需要预览的图片http链接列表
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.comment(options.movieid)
    //调用云函数
    wx.cloud.callFunction({
      name: "movieDetail",
      data: {
        movieid: options.movieid
      }
    }).then(res => {
      console.log(res)
      wx.cloud.callFunction({
        name: 'count',   //云函数的名称
      }).then(res => {
        //ex6写法，箭头函数
        console.log(res)
        this.setData({ total: res.result.total })

      }).catch(err => {
        console.log(err)
      })
      this.setData({
        detail: JSON.parse(res.result)
      })
    }).catch(err => {
      console.log(err)
    })
    this.transcore()


  },
  gotoCommentDetail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: `../commentDetail/commentDetail?movieid=${event.target.dataset.movieid}`,
    })
  },
  togood: function (e) {
    console.log(e)
    wx.showToast({
      title: '点赞成功',
      icon: 'success',//当icon：'none'时，没有图标 只有文字
      duration: 2000
    })
    db.collection('comment').doc(e.target.dataset.commentid).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        goodnum: _.inc(1)
      }
    }).then(res => {
      console.log(res);
      db.collection('comment').where({
        dmovieid: e.target.dataset.movieid
      }).get().then(res => {
        console.log(res)
        // var that=this
        // let comment=that.data.comment

        //   this.setData({

        //     comment: ""



        // })
        this.setData({

          comment: res.data



        })
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err);
    })

  }


})