// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');
// 云函数入口函数
exports.main = async (event, context) => {
  return rp('http://zuowen.api.juhe.cn/zuowen/typeList?key=c8ef943fb665e66378de6d267a4c92d3&id=1')
    .then(function (res) {
      console.log(res)
      return res
    })
    .catch(function (err) {
      console.log(err)
    }
    )
}