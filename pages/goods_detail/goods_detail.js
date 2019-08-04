// pages/goods_detail/goods_detail.js
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {getStorageCart ,setStorageCart } from "../../utils/storage.js";
Page({
  data:{
    pics:[],
    goods:{}
  },
  GoodsObj: {},
  onLoad(options){
    this.getDetailData(options.goods_id)
  },
  async getDetailData(goods_id){
    const result = await request({url:"/goods/detail",data:{goods_id}})
    const {message} = result.data
    const { pics } = message
    this.GoodsObj = message
    this.setData({
      pics:pics,
      goods:{
        goods_id : message.goods_id,
        goods_name : message.goods_name,
        goods_price : message.goods_price,
        goods_introduce : message.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
  },
  //点击轮播图预览图片
  handlePreviewImage(e){
    const { index } = e.currentTarget.dataset
    const urls = this.data.pics.map( v =>{
      return v.pics_big
    })
    const { pics_big_url } = this.data.pics[index]
    wx.previewImage({
      current: pics_big_url,
      urls
    });
      
  },
  handleCartAdd(){
    let cart = getStorageCart() || {};
    if(cart[this.GoodsObj.goods_id]){
      cart[this.GoodsObj.goods_id].num++;
    }else{
      cart[this.GoodsObj.goods_id] = this.GoodsObj;
      cart[this.GoodsObj.goods_id].num = 1
    }
    wx.setStorageSync("cart", cart);
      // 4 弹出成功的提示
    setStorageCart({
      title: '购买成功',
      icon: 'success',
      //  mask：true 但是用户 点击 按钮的时候没有反应！！
      mask: true
    });
  }
})