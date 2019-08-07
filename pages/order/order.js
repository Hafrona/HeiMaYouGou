import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({
  data:{
    tabs: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orderList:[],
    token:""
  },
  onShow(){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return
    }
    this.setData({
      token
    })
    let pageList = getCurrentPages();
    // 获取当前的页面对象
    let currentPage = pageList[pageList.length - 1];
    // 获取传递过来的type属性
    const { type } = currentPage.options;
    this.getOrderList(type)
  },
  handleItemChange(e){
    const { list } = e.detail;
    const { tabs } = this.data;
    tabs.forEach((v,i) => i === list?v.isActive=true : v.isActive=false);
    this.setData({ tabs });
  },
  // 获取订单数组
  async getOrderList(type) {
    let header = {
      Authorization: wx.getStorageSync("token")
    }
    let res = await request({ url: "/my/orders/all", data: { type }, header: header })
    const {orders} = res.data.message;
    // 修改时间格式
    orders.forEach(v=>{
      v.create_time_cn=(new Date(v.create_time*1000)).toLocaleString();
    })
    this.setData({
      orderList:orders
    });
  }
})