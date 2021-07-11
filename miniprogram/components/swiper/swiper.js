// components/swiper/swiper.js
import { debounce } from '../utils'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    },
    change:{
      type:Function,
      value:()=>{}
    }
  },
  ready:function () {
    this.towerSwiper()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(list){
      var curUrl = list.filter(item => item.mLeft === 0)[0].url;
      this.triggerEvent('change',curUrl)
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper() {
      let list = this.data.list;
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
        list[i].mfilter = Math.abs(list[i].mLeft)
      }
      this.handleChange(list)
      this.setData({
        swiperList: list
      })
    },
    // towerSwiper触摸开始
    towerStart(e) {
      this.setData({
        towerStart: e.touches[0].pageX
      })
    },
    // towerSwiper计算方向
    towerMove(e) {
      if (e.touches[0].pageX - this.data.towerStart > 0 ) {
        this.setData({
          direction: 'right'
        })
      } else if(e.touches[0].pageX - this.data.towerStart < 0 ){
        this.setData({
          direction: 'left'
        })
      }else{
        this.setData({
          direction: 'click'
        })
      }
      this.setData({
        towerStart:e.touches[0].pageX
      })
    },
    // towerSwiper计算滚动
    towerEnd:debounce((function(e){
      let direction = this.data.direction;
      let list = this.data.swiperList;
      if (direction == 'right') {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < list.length; i++) {
          list[i - 1].mLeft = list[i].mLeft
          list[i - 1].zIndex = list[i].zIndex
          list[i - 1].mfilter = Math.abs(list[i].mLeft)
        }
        list[list.length - 1].mLeft = mLeft;
        list[list.length - 1].zIndex = zIndex;
        list[list.length - 1].mfilter = Math.abs(mLeft)
        this.setData({
          swiperList: list,
          direction: 'click'
        })
        this.handleChange(list)
      } else if(direction == 'left') {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = list.length - 1; i > 0; i--) {
          list[i].mLeft = list[i - 1].mLeft
          list[i].zIndex = list[i - 1].zIndex
          list[i].mfilter = Math.abs(list[i - 1].mLeft)
        }
        list[0].mLeft = mLeft;
        list[0].zIndex = zIndex;
        list[0].mfilter = Math.abs(mLeft)
        this.setData({
          swiperList: list,
          direction: 'click'
        })
        this.handleChange(list)
      }
    }),500,true)
  }
})
