import Poster from './poster';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    waveIsOk:false,
    loginIsloading:false,
    isLoading:false,
    savaStatus:'',
    error:'',
    paintPallette:{},
    imagePath:'',
    curUrl:'',
    dialogShow:false,
    avatarUrl: '',
    userInfo: {},
    hasUserInfo: false,
    list:[
      {
        url:'/images/bg4.jpg'
      },
      {
        url:'/images/bg3.jpg'
      },
      {
        url:'/images/bg2.jpg'
      },
      {
        url:'/images/bg1.jpg'
      }
    ]
  },
  imageLoad(ev) {
    this.setData({
      waveIsOk:true
    })
  },
  saveImage() {
    if(this.data.savaStatus === 'noSave'){
      this.setData({
        savaStatus:'saving'
      })
      if (this.data.imagePath && typeof this.data.imagePath === 'string') {
        wx.saveImageToPhotosAlbum({
          filePath: this.data.imagePath,
          success:(res)=>{
            this.setData({
              savaStatus:'saved'
            })
          },
          fail:err =>{
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      this.setData({
                        error:failData.errMsg,
                      })
                    }
                  })
                }
              })
            }
            this.setData({
              savaStatus:'noSave'
            })
          }
        });
      }
    }
  },
  handleChange(curUrl){
    this.setData({
      curUrl:curUrl.detail
    })
  },
  async handleShow(){
    this.setData({    
      isLoading:true,
      savaStatus:'noSave'
    })
    const that = this;
    const { joinTime,joinId,userInfo } = this.data;
    wx.downloadFile({
      url: that.data.avatarUrl.replace('https://thirdwx.qlogo.cn', 'https://wx.qlogo.cn'),
      success: res => {
        that.setData({
          paintPallette: new Poster().palette(that.data.curUrl,userInfo.nickName,joinId,joinTime,res.tempFilePath)
        });
      },
      fail: err => {
        this.setData({
          error:err.errMsg,
        })
      }
    })

  },
  onImgOK(e){
    this.setData({
      imagePath:e.detail.path,
      isLoading:false,
      dialogShow:true,
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    const that = this;
    this.setData({
      loginIsloading:true
    })
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (r) => {
        const {avatarUrl,nickName} = r.userInfo;
        wx.cloud.callFunction({
          // 云函数名称
          name: 'login',
          // 传给云函数的参数
          data: { 
            avatarUrl: avatarUrl,
            nickName: nickName,
          },
          success: function(res) {
            that.setData({
              avatarUrl: avatarUrl,
              joinTime: res.result.joinTime,
              joinId: res.result.joinId,
              userInfo: r.userInfo,
              hasUserInfo: true,
              loginIsloading:false
            })
          },
          fail: err =>{
            this.setData({
              loginIsloading:false
            })
          }
        })
      },
      fail:err =>{
        this.setData({
          loginIsloading:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var share_title = "为蓝之旅"; //名称
    var share_path = '/pages/home/home';
    let shareImg = '/images/share.jpg';
    return {
      title: share_title,
      path: share_path,
      imageUrl: shareImg
    }
  }
})