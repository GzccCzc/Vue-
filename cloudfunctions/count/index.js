const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection('images').where({
    _openid: 'oJ1oC5XIT1MswZzFyVmLYxsID6ug' // 填入当前用户 openid 
  }).count()
}
