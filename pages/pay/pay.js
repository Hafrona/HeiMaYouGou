import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index.js";
Page({
  data: {
    address: {},
    cart: {},
    // 总价格
    totalPrice: 0,
    // 购物车有没有商品
    hasGoods: false
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart");
    this.setData({ address, cart });
    this.setCart(cart);
  },
  // 根据cart对象来计算总价格。。
  // 还需要 把总价格设置到data中
  setCart(cart) {
    let cartArr = Object.values(cart);
    // 2 计算总的价格
    let totalPrice = 0;
    // 3 计算 要购买的总数量
    let totalNum = 0;
    cartArr.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({ cart, totalPrice, totalNum });
    wx.setStorageSync("cart", cart);
  },
  //支付
  async handleOrderPay(){
    const cart = this.data.cart
    let token = wx.getStorageSync("token")
    // 订单总价格
    let order_price = this.data.totalPrice;
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
    }else{
      let header = {Authorization:token}
      const consignee_addr = this.data.address.all
      let goods = [];
      for(const key in cart){
        if(cart.hasOwnProperty(key)){
          if (cart[key].checked){
            goods.push({
              goods_id: cart[key].goods_id,
              goods_number: cart[key].num,
              goods_price: cart[key].goods_price,
            })
          }
        }
      }
      let orderParams = {order_price,consignee_addr,goods}
      //创建订单，拿到订单编号
      const mina = await request({url:"/my/orders/create",method:"post",data:orderParams,header:header})
      const { order_number } = mina.data.message;
      //获取支付参数
      const contPay = await request({url:"/my/orders/req_unifiedorder",header:header,data:{order_number},method:"post"})
      const { pay } = contPay.data.message;
      const res = await requestPayment(pay);
      // 6 查询一下我们的第三方的服务里面的订单状态 也会成功 
      const Chaxun = await request({url:"/my/orders/chkOrder",header:header,data:{order_number},method:"post"})
      await showToast({content:"支付成功"})
      // 7 订单页面 
      wx.navigateTo({
        url: '/pages/order/order'
      });
    }
  }
});
