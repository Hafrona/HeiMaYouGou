// pages/user/user.js
import {getStorageUserInfo} from '../../utils/storage.js';
Page({
  data:{
    userInfo:{},
    history:[
      {name:"收藏的店铺",id:0},
      {name:"收藏的商品",id:1},
      {name:"关注的商品",id:2},
      {name:"我的足迹",id:3}
    ]
  },
  onShow(){
    const userInfo = getStorageUserInfo()
    if(!userInfo){
      //跳转到登陆页面
      wx.navigateTo({
        url: '/pages/login/login'
      });
      return;
    }
    this.setData({
      userInfo
    })
    console.log(userInfo)
  }
})