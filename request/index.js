let arTime = 0;
export const request = (params) =>{
  arTime++;
  wx.showLoading({
    title: '加载中',
  })
  //公共的接口前缀
  const baseUrl="https://www.uinav.com/api/public/v1";
  return new Promise((resolve,reject) =>{
    wx.request({
       ...params,
       url:baseUrl+params.url,
       success:(result) =>{
         resolve(result)
       },
       fail:(err) =>{
         reject(err);
       },
       complete:() =>{
        arTime--;
        wx.hideLoading()
       }
    })
  })
}