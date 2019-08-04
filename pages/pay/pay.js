import { getSetting, chooseAddress, openSetting,showModal,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    address: {},
    cart: {},
    // 总价格
    totalPrice: 0,
    // 总数量 勾选了的中数量
    totalNum: 0,
    // 购物车有没有商品
    hasGoods: false
  },
  async handleChooseAddress() {
    //获取用户信息
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    if (scopeAddress === true || scopeAddress === undefined) {
      //直接调用获取用户的收获地址
    } else {
      //先打开授权页面
      await openSetting();
    }
    const res2 = await chooseAddress();
    // 存入到本地存储中
    res2.all =
      res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo;
    wx.setStorageSync("address", res2);
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
    let isAllChecked = true;
    // 2 计算总的价格
    let totalPrice = 0;
    // 3 计算 要购买的总数量
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        isAllChecked = false;
      }
    });
    // 判断购物车中有没有数据
    isAllChecked = cartArr.length === 0 ? false : isAllChecked;
    // 判断购物车内有没有商品
    const hasGoods = cartArr.length ? true : false;
    this.setData({ cart, isAllChecked, totalPrice, totalNum, hasGoods });
    wx.setStorageSync("cart", cart);
  },
  //全选
  handleCartAllCheck() {
    let { isAllChecked, cart } = this.data;
    isAllChecked = !isAllChecked;
    for (let key in cart) {
      // 判断该属性是不是对象自己
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = isAllChecked;
      }
    }
    // 4 把cart传入到setCart函数即可
    this.setCart(cart);
  },
  //复选框
  shopcheck(e){
    const { id } = e.currentTarget.dataset
    const { cart } = this.data
    cart[id].checked = !cart[id].checked
    this.setCart(cart)
  },
  //编辑商品数量
  async handleCartNumEdit(e){
    const { id, num } = e.currentTarget.dataset
    const { cart } = this.data
    if(cart[id].num === 1 && num === -1){
      let res = await showModal({content:"您确定要删除吗"})
      if(res.confirm){
        delete cart[id]
        this.setCart(cart)
      }
    }else{
      cart[id].num += num
      this.setCart(cart)
    }
  },
  //结算
  async moenyover(){
    //收获地址
    const { address,totalNum} = this.data
    if(!address.all){
      await showToast({content:"请选择收获地址"})
    }else if(totalNum === 0){
      await showToast({content:"请选择要购买的商品"})
    }else{
      wx.navigateTo({
        url: '/pages/pay/pay'
      });
    }
  }
});
