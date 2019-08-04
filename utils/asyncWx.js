/**
 * promise 形式的wx.openSetting 打开授权有页面
 */
export const openSetting =()=>{
    return new Promise((resolve,reject) =>{
        wx.openSetting({
            success:(result) =>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}
//获取用户信息
export const getSetting =()=>{
    return new Promise((resolve,reject) =>{
        wx.getSetting({
            success:(result) =>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}
//获取用户位置
export const chooseAddress = ()=>{
    return new Promise((resolve,reject) =>{
        wx.chooseAddress({
            success:(result) =>{
                resolve(result);
            },
            fail:(err) =>{
                reject(err)
            }
        })
    })
}