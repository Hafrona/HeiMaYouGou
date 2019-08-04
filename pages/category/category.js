import { request } from "../../request/index.js"
Page({
  data: {
    // 左侧的菜单
    leftMenuList: [],
    // 右侧的商品数组
    rightGoodsList: [],
    currentIndex:0
  },
  cates:[],
  onLoad() {
    //从缓存中拿到数据
    const Cates = wx.getStorageSync("cates");
    // 判断有没有值，没有就重新发起请求拿数据
    if(!Cates){
      this.getClassifyData()
    }else{
      // 判断缓存中的数据是否过期
      if(Date.now() - Cates.time > 1000 * 20){
        // 过期了，重新发起请求
        this.getClassifyData()
      }else {
        // 没过期，赋值
        const catesData = Cates.data;
        this.cates = catesData
        const leftMenuList = this.cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }));
        const rightGoodsList = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      }
    }
      
  },
  getClassifyData() {
    request({ url:'/categories'})
      .then(classData =>{
        const { message } = classData.data;
        this.cates = message
        //把数据存入到缓存中
        wx.setStorageSync("cates",{time:Date.now(),data: this.cates});
        const leftMenuList = this.cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }));
        const rightGoodsList = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      })
  },
  fenLeiDianji(e){
    const { index } = e.currentTarget.dataset
    const rightGoodsList = this.cates[index].children;
    this.setData({
      currentIndex:index,
      rightGoodsList
    })
  }
})