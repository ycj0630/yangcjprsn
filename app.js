//app.js
const common = require('common/common.js')
App({
  onLaunch: function () {
    var that = this;
    console.log('小程序开始初始化')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    try{
      //获取个人类目数据
      common.getPersonCategorys();
      //获取个人流水记录数据
      wx.request({
        url: 'http://192.168.10.137:8080/flow/findUserFlow',
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log('流水获取请求成功');
          console.log(res.data)
          var flow = res.data
          that.globalData.userFlow = flow
        },
        fail: function () {
          wx.showToast({
            title: '网络异常，请检查网络后重试',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }catch(e){
      wx.showToast({
        title: '网络异常',
        icon: 'loading',
        duration: 100000,
        mast: true
      })
    }
    //获取设备信息（屏幕分辨率） 
    var res = wx.getSystemInfoSync();
    this.globalData.systemInfo.brand = res.brand,
    this.globalData.systemInfo.model = res.model,
    this.globalData.systemInfo.pixelRatio = res.pixelRatio,
    this.globalData.systemInfo.screenWidth = res.screenWidth,
    this.globalData.systemInfo.screenHeight = res.screenHeight,
    this.globalData.systemInfo.windowWidth = res.windowWidth,
    this.globalData.systemInfo.windowHeight = res.windowHeight,
    this.globalData.systemInfo.statusBarHeight = res.statusBarHeight,
    this.globalData.systemInfo.language = res.language,
    this.globalData.systemInfo.version = res.version,
    this.globalData.systemInfo.system = res.system,
    this.globalData.systemInfo.platform = res.platform,
    this.globalData.systemInfo.fontSizeSetting = res.fontSizeSetting,
    this.globalData.systemInfo.SDKVersion = res.SDKVersion 
        
  },
 

  globalData: {
    userInfo: null,
    userFlow: {},
    systemInfo:{
      brand:null, //品牌
      model:null, //型号
      pixelRatio: null, //像素比
      screenWidth: null, //屏宽
      screenHeight: null, //屏高
      windowWidth: null, //可用窗口宽
      windowHeight: null, //可用窗口高
      statusBarHeight: null, //窗台蓝高
      language: null, //设置的语言
      version: null, //微信版本
      system: null, //操作系统版本
      platform: null, //客户端平台
      fontSizeSetting: null, //微信字体大小
      SDKVersion: null //客户端基础库版本

    }
      

  }

  
})