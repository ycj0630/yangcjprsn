// pages/addrecord/addrecord.js
const app = getApp();
const utils = require('../../utils/util.js')
const common = require('../../common/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    initmoney:2,
    currentTab: 0,
    categorys:[],
    isChosen: null,
    charge: null,
    checkedCategory:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('addrecord的onload开始');
    var that = this;
    //发送请求
    //请求结果赋值到globalData中,供app全局使用
    //并存储到本地缓存
    try {
      var categorys = wx.getStorageSync('categorys')

      if (categorys) {
        that.setData({
          categorys: categorys
        })
      }
    } catch (e) {
      console.log('categorys数据缓存获取失败')  
      console.log(e)
    }

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
    console.log('addrecord执行categorysSHow方法')
    this.categorysShow();
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
  
  },

  categorysShow: function () {
    var that = this;
    that.data.categorys
    var paytype = that.data.categorys.pay;
    var earntype = that.data.categorys.earn;
    //支出遍历
    for (var index in paytype) {
      var typecode = paytype[index].typecode;
      var typename = "categorys.pay[" + index + "].typename";
      var imgsrc = "categorys.pay[" + index + "].imgsrc";

      switch (typecode) {
        case 1:
          this.setData({
            [typename]: '衣物',
            [imgsrc]: '../../img/clo.jpg'
          })
          continue;

        case 2:
          this.setData({
            [typename]: '娱乐',
            [imgsrc]: '../../img/timg.jpg'
          })
          continue;
      }
    }
    //收入遍历
    for (var index in earntype) {
      var typecode = earntype[index].typecode;
      var typename = "categorys.earn[" + index + "].typename";
      var imgsrc = "categorys.earn[" + index + "].imgsrc";
      switch (typecode) {
        case 1:
          this.setData({
            [typename]: '衣物',
            [imgsrc]: '../../img/clo.jpg'
          })
          continue;

        case 2:
          this.setData({
            [typename]: '娱乐',
            [imgsrc]: '../../img/timg.jpg'
          })
          continue;
      }
    }


  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      earnIsChosen: '',
      payIsChosen: '',
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (that.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  back: function () {
    wx.navigateBack;

  },
  saveRecord: function (e) {
    console.log('发送请求后台保存数据后,');
    var that = this;
    if (!that.data.charge ||!common.rexMatch.numberCheck(that.data.charge)){
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'none',
        duration: 2000
      }) 
      return;
    }
    if (!that.data.checkedCategory){
      wx.showToast({
        title: '请选择分类',
        icon: 'none',
        duration: 2000
      }) 
      return;
    }
    this.doSave()
  },

  doSave: function () {
    var that = this;
    var dateObject = utils.transDate(new Date())

    console.log(that.data.charge)  

    var realCharge = that.data.charge
    if (this.data.currentTab === 0) {
      realCharge = '-' + realCharge
    }
    var userFlow = app.globalData.userFlow;
    var currentDate = utils.formatTime(new Date())

    if (currentDate === userFlow[0].date){
      userFlow[0].records.unshift({
        "date": utils.formatTime(new Date()),
        "category": that.data.checkedCategory.typename,
        "color": "",
        "charge": parseFloat(realCharge)
      })
    }else{
      userFlow.unshift({
        "date": utils.formatTime(new Date()),
        "month": dateObject.month,
        "day": dateObject.day,
        "count": null,
        "color": "",
        "records": [{
          "date": utils.formatTime(new Date()),
          "category": that.data.checkedCategory.typename,
          "color": "",
          "charge": parseFloat(realCharge)
        }]
      })

    }
    
    try {
      console.log(userFlow)
      // wx.request({
      //   url: 'test.php', //仅为示例，并非真实的接口地址
      //   data: oneRecord,
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success: function (res) {
      //     console.log(res.data)
      //   }
      // })
      wx.redirectTo({
        url: '../home/home'
      })

    } catch (e) {
      console.log(e)
    }

  },

  btnChosen :function (e) {
    var that = this;
      that.setData({
        isChosen: e.currentTarget.dataset.typecode,
        checkedCategory: { "typename": e.currentTarget.dataset.typename, "typecode": e.currentTarget.dataset.typecode, "imgsrc": "" }
      })
  },

  chargeInput: function (e) {
    var charge = e.detail.value
    var rexRes = common.rexMatch.floatCheck(charge)
    console.log(rexRes)
    if (null===charge||''===charge){
      charge = 0;
    }
    if (rexRes){
      charge = parseFloat(charge).toFixed(2)
    }else{
      charge = parseFloat(charge)
    }
    console.log(charge)
    this.setData({
      charge: charge,
    })

    return charge

  },
  
  //跳转至类目添加/管理
  goAddCategory: function (e) {


  }

})