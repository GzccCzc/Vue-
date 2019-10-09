// miniprogram/pages/movie/movie.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [], //电影列表
    mode: "scaleToFill",
    arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    // //分别绑定三个不同的template
    // //初始值绑定，对象赋一个空值
    // inTheaters:{},
    // comsingSoon:{},
    // top250:{},
    // searchResult:{},//先给一个空值
    // containerShow:true,//显示的初始值
    // searchPanelShow:false,//隐藏初始值
    history_ID:'',
    history_DATE:'',
    titlearr:[],
    title:{},
    idarr:{},
    movieid:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(options)
    // //调用云函数
    // wx.cloud.callFunction({
    //   name: 'movie',
    //   data: {
    //     movieid: options.movieid
    //   }
    // }).then(res => {
    //   console.log(res)
    //   //如果成功，我们将拿到的数据赋值给我们定义在data中的detail对象赋值
    //   this.setData({
    //     movie: JSON.parse(res.result)
    //     //拿到detail对象后我们就可以通过它显示数据在我们页面上了
    //   })
    // }).catch(err => {
    //   console.log(err)
    // }) 

    var array = this.data.arr
    for (let i = 1; i < 5; i++) {
      array.push("images/" + i + ".jpg")
    }
    this.setData({ arr: array })
    wx.showLoading({  //显示加载页面
      title: '加载中...',
    })

    wx.cloud.callFunction({
      name:"movies",
      data:{
        start:this.data.movieList.length,
        count:10
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      })
      
      wx.hideLoading() //结束加载页面
      console.log(this.data.movieList)
      for (var i = 0; i < this.data.movieList.length;i++)
      {
        var obj={}
        obj.title = this.data.movieList[i].title
        obj.movieid = this.data.movieList[i].id
        this.data.titlearr.push(obj)
        // var title = this.data.movieList[i].title
        // var movieid = this.data.movieList[i].id
        //console.log(obj.title, obj.movieid)
        this.setData({
          titlearr:this.data.titlearr.concat(obj),
          //titlearr: this.data.titlearr.concat(movieid)
        })
      }
      console.log(this.data.titlearr)
      // console.log(this.data.title1)
    }).catch(err=>{
      console.log(err)
    })
  },
  gotoDetail:function(event){ //跳转到详情页面
    console.log(event)
    db.collection('history').add({
      // data 字段表示需新增的 JSON 数据
      data:{
        _id:JSON.parse(event.target.dataset.movieid)
      } 
    })
    wx.navigateTo({
      url: `../movieDetail/movieDetail?movieid=${event.target.dataset.movieid}`,
    })
  },
  gotoComment:function(event){
    console.log(event)
    wx.navigateTo({
      url: `../comment/comment?movieid=${event.target.dataset.movieid}`,
    })
  },
  forContent:function(event){
    this.setData({
      content:event.detail.value
    }),
      db.collection('content').add({
        data: {
          _content: this.data.content
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    console.log(this.data.content)
    for (var i = 0; i < this.data.movieList.length; i++) {
      if (this.data.content == this.data.movieList[i].title) {
        this.setData({
          movieid: this.data.movieList[i].id,
        });
        wx.navigateTo({
          url: `../movieDetail/movieDetail?movieid=${this.data.movieid}`,
        })
        break;
      }
    }
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
    this.onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMovieListData: function (url, settedkey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "json" }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.processDoubanData(res.data, settedkey, categoryTitle)
      },
      fail: function () {
        // fail
        console.log("failed")
      }
    })
  },
  processDoubanData: function (moviesDouban, settedkey, categoryTitle) {
    var movies = [];//空的数组做为处理完数组的容器
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //[1,1,1,1,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readayData = {};
    readayData[settedkey] = { movies: movies };  //动态属性
    this.setData(readayData);
  },
  //鼠标聚焦事件
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onBindChange:function(event){
    var text=event.detail.value;
    // console.log(text);
    var searchUrl = "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a";
    //编写请求，调用getMovieListData方法
    this.getMovieListData(searchUrl,"searchResult","");
  },
  onCancelImgTap:function(event){
    this.setData({
      containerShow:true,
      searchPanelShow:false,
      searchResult:{}
    })
  },
})