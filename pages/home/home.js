// pages/home/home.js


var common = require('../../common/common.js');
//获取app实例
var app = getApp();

Page({




  /**
   * 页面的初始数据
   */
  data: {
    windowheight:null,
    windowwidth:null,
    categorys:[],
    statistics:[]
  },

  gotoadd: function(){
    wx.navigateTo({
      url: '../addrecord/addrecord',
    })

  },
/*
  每日统计 和 红绿色区分

*/ 
  countDayPay: function(){
    var that = this;
    var array = that.data.statistics;
    for (var one in array){
      var dayCharge=0;
      var oneCharge=array[one].records;

      for (var crg in oneCharge) {
        dayCharge += oneCharge[crg].charge;
        var colorStr = "statistics[" + one + "].color";
        var color = dayCharge >= 0 ? 'green' : 'red';
        this.setData({
          [colorStr]: color
        })
      }

      var dayCount = "statistics["+one+"].count";
      dayCharge = dayCharge >= 0 ? "+" + dayCharge.toFixed(2) : dayCharge.toFixed(2);
      console.log(dayCharge)
      this.setData({
        [dayCount]: dayCharge

      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('home的onload方法开始');
    var that = this;
    var systeminfo = app.globalData.systemInfo;
    that.setData({
        windowheight: (systeminfo.windowHeight) * 2,
        windowwidth: (systeminfo.windowWidth) * 2,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('home的onshow方法开始')
    var that = this;
    var userFlow = app.globalData.userFlow;
    that.setData({
      statistics: userFlow
    })
    this.countDayPay();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})