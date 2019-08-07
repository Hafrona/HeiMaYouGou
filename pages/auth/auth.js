// pages/auth/auth.js
import {login} from "../../utils/asyncWx"
import {request} from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{

  },
  async handleGetUserInfo(e){
    const { encryptedData, iv, rawData, signature} = e.detail
    const { code } = await login()
    // 3 发送请求获取token值
    const postParams = { encryptedData, rawData, iv, signature, code };
    // const { token } = await request({ url: "/users/wxlogin", method: "post", data: postParams });
    const mini = await request({ url: "/users/wxlogin", method: "post", data: postParams });
    const { token } = mini.data.message
    // 4 把token存入到缓存中
    wx.setStorageSync("token", token);
    // 5 从哪里来 跳回到哪里去
    wx.navigateBack({
      // 返回上一个页面 
      delta: 1
    });
  }
})