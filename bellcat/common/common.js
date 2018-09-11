

const getPersonCategorys = function(){
  wx.request({
    url: 'http://192.168.10.137:8080/category/findUserCategorys',
    method: 'GET',
    dataType: 'json',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log('类目获取请求成功');
      var categorys = res.data
      //存入缓存
      try {
        wx.setStorage({
       
          key: 'categorys',
          data: categorys
        });

        console.log('类目数据存入缓存成功');
      } catch (e) {
        console.log('类目数据存入缓存失败');
        console.log(e)
      }
      return categorys
    },
    fail: function () {
      wx.showToast({
        title: '网络异常，请检查网络后重试',
        icon: 'success',
        duration: 2000
      })
    }
  })

}

const rexMatch= {
  //正则表达式 判断string内容是小数点后保留至少二位的小数
  floatCheck : function(value) {
  var reg = new RegExp('^[0-9]+(.[0-9]{2,})$', 'g');

  return reg.test(value);

  },

  //匹配是否是保留最多两位的小数活整数
  numberCheck: function (value) {
    var reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$', 'g');

    return reg.test(value);

  }


}




module.exports = {
  getPersonCategorys: getPersonCategorys,
  rexMatch: rexMatch
}