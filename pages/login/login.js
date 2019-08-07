// pages/login/login.js
import {setStorageUserInfo} from "../../utils/storage"
Page({
  data: {

  },
  handleGetUserInfo(e){
    const {userInfo} = e.detail
    setStorageUserInfo(userInfo)
    wx.navigateBack({
      delta: 1
    });
  }
})