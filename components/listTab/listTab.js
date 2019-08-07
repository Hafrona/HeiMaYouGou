// components/listTab/listTab.js
Component({
  data:{
    activeIndex:0,
  },
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  methods:{
    listDianji(e){
      const {list} = e.currentTarget.dataset
      // 触发父组件的自定义事件
      this.triggerEvent("itemChange",{list});
      this.setData({
        activeIndex:list
      })
    }
  }
})
