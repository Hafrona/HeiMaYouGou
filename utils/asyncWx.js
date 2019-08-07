/**
 * promise 形式的wx.openSetting 打开授权有页面
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
//获取用户信息
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
//获取用户位置
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};
//判断用户是否删除
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: "提示",
      content: content,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: (result) => {
          resolve(result)
      },
      fail: () => {},
      complete: () => {}
    });
  });
};
//消息提示框
export const showToast = ({content})=>{
    return new Promise((resolve,reject) =>{
        wx.showToast({
            title: content,
            icon: 'none',
            duration: 500,
            mask: false,
            success: (result) => {
                resolve(result)
            }
        });
          
    })
}
//获取用户登陆code
export const login = ()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:10000,
      success: (result) => {
        resolve(result)
      }
    });
      
  })
}
//调用支付功能
export const requestPayment =(params)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
      
  })
}
