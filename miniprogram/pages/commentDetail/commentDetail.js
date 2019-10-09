// pages/movieDetail/movieDetail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid: {},
    comment: {},
    score:0
  },
  comment: function (event) {
    console.log(event)
    db.collection('comment').where({
      dmovieid: event
    }).get().then(res => {
      console.log(res)

      //console.log(res.data[0].dcomment)
      this.setData({
        comment: res.data,
      })
      for(var i=0;i<res.data.length;i++){
        var score1=res.data[i].dscore
      var score2
        this.data.score = parseInt(score1) + parseInt(this.data.score)
        this.setData({
          score: this.data.score
        })
      }
    
  
      this.setData({
        score: (parseInt(this.data.score / res.data.length)).toString()
      })
      console.log(this.data.score)
      var dscore={}
      var sum=0,sum1=0,sum2=0,sum3=0,sum4=0
for(var i=0;i<res.data.length;i++)
{
  if(res.data[i].dscore>8)
  {
    sum=sum+1
    dscore[0] = parseInt(sum / res.data.length * 100)
  }
  else if (res.data[i].dscore > 6) {
    sum1 = sum1 + 1
    dscore[1] = parseInt(sum1 / res.data.length * 100)
  }
  else if (res.data[i].dscore > 4) {
    sum2 = sum2 + 1
    dscore[2] = parseInt(sum2 / res.data.length*100)
  }
  else if (res.data[i].dscore > 2) {
    sum3 = sum3 + 1
    dscore[3] = parseInt(sum3 / res.data.length * 100)
  }
  else if (res.data[i].dscore > 0) {
    sum4 = sum4 + 1
    dscore[4] = parseInt(sum4 / res.data.length * 100)
  }
}
this.setData({
  dscore:dscore
})

    }).catch(err => {
      console.log(err)
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
  


  },



})