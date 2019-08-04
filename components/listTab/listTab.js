// components/listTab/listTab.js
Component({
  data:{
    listTab:['综合','销量','价格'],
    activeIndex:0,
  },
  methods:{
    listDianji(e){
      const {list} = e.currentTarget.dataset
      this.setData({
        activeIndex:list
      })
    }
  }
})
