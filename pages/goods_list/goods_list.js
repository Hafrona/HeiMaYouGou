import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goodsList: []
  },
  //总页数
  TotalPages: 1,
  // 接口用的参数
  QueryParams: {
    // 搜索的关键字
    query: "",
    // 分类id
    cid: "",
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10
  },
  onLoad(options) {
    this.QueryParams.cid = options.cid;
    this.getListData();
  },
  async getListData() {
    const result = await request({ url: "/goods/search", data: this.QueryParams });
    const { goods } = result.data.message;
    const { total } = result.data.message;
    this.TotalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList,...goods]
    });
    wx.stopPullDownRefresh()
  },
  //用户上拉触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.TotalPages) {
      wx.showToast({
        title: "没有下一页数据了",
        icon: "none"
      });
    } else {
      this.QueryParams.pagenum++;
      this.getListData();
    }
  },
  //下拉刷星
  onPullDownRefresh(){
    this.QueryParams.pagenum = 1;
    this.setData({
      goodsList:[]
    })
    this.getListData();
  }
});
