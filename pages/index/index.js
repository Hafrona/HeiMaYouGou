import { request } from "../../request/index.js"
Page({
  data: {
    img: [],
    navgon:[],
    newtower:[]
  },
  onLoad() {
    this.getImageData()
    this.getNaviGation()
    this.gettower()
  },
  //获取轮播图数据
  getImageData() {
    request({ url:"https://api.zbztb.cn/api/public/v1/home/swiperdata"})
      .then(result=>{
      let { message } = result.data
      this.setData({
          img: message
      })
    })
  },
  //导航数据
  getNaviGation(){
    request({ url:'https://api.zbztb.cn/api/public/v1/home/catitems'})
      .then(navigation=>{
        let { message } = navigation.data
        this.setData({
          navgon: message
        })
      })
  },
  //楼层数据
  gettower(){
    wx-wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: (tower) =>{
        const {message} = tower.data
        this.setData({
          newtower:message
        })
      },
    })
    request({ url:"https://api.zbztb.cn/api/public/v1/home/floordata"})
      .then(tower =>{
        const { message } = tower.data
        this.setData({
          newtower: message
        })
      })
  }
})