// pages/goods_detail/goods_detail.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { getStorageCart, setStorageCart,getStorageShouchang,setStorageShouchang } from "../../utils/storage.js";
Page({
  data: {
    pics: [],
    goods: {},
    isCollect:false
  },
  GoodsObj: {},
  onLoad(options) {
    this.getDetailData(options.goods_id);
  },
  async getDetailData(goods_id) {
    const result = await request({ url: "/goods/detail", data: { goods_id } });
    const { message } = result.data;
    const { pics } = message;
    this.GoodsObj = message;
    // 1 获取缓存的数组 ""
    let collect = getStorageShouchang() || [];
    // 判断是否收藏过
    let isCollect=collect.some(v=>v.goods_id===this.GoodsObj.goods_id);
    this.setData({
      pics: pics,
      goods: {
        goods_id: message.goods_id,
        goods_name: message.goods_name,
        goods_price: message.goods_price,
        goods_introduce: message.goods_introduce.replace(/\.webp/g, ".jpg")
      },
      isCollect
    });
  },
  //点击轮播图预览图片
  handlePreviewImage(e) {
    const { index } = e.currentTarget.dataset;
    const urls = this.data.pics.map(v => {
      return v.pics_big;
    });
    const { pics_big_url } = this.data.pics[index];
    wx.previewImage({
      current: pics_big_url,
      urls
    });
  },
  handleCartAdd() {
    let cart = getStorageCart() || {};
    if (cart[this.GoodsObj.goods_id]) {
      cart[this.GoodsObj.goods_id].num++;
    } else {
      cart[this.GoodsObj.goods_id] = this.GoodsObj;
      cart[this.GoodsObj.goods_id].num = 1;
      cart[this.GoodsObj.goods_id].checked = true;
    }
    setStorageCart(cart);
    // 4 弹出成功的提示
    wx.showToast({
      title: "购买成功",
      icon: "success",
      //  mask：true 但是用户 点击 按钮的时候没有反应！！
      mask: true
    });
  },
  //收藏
  shouChang() {
    // 1 获取缓存的数组 ""
    let collect = getStorageShouchang() || [];
    // 如果找不到这个元素 那么索引 = -1 如果能找到 这个index就是元素的索引
    let index = collect.findIndex(v => v.goods_id === this.GoodsObj.goods_id);
    if(index === -1){
      collect.push(this.GoodsObj)
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      });
      this.setData({
        isCollect:true
      })
    }else{
      collect.splice(index,1)
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
      this.setData({
        isCollect: false
      })
    }
    setStorageShouchang(collect)
  }
});
