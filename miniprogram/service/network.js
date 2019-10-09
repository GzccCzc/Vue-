export function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data,
      success: res => {
        resolve(res.data)
        console.log(res.data)
      },
      reject: reject
    })
  })
}