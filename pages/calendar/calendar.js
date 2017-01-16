//index.js
//获取应用实例
var methods = require('methods.js')
var app = getApp()
Page({
    onLaunch: function() {
        console.log('onlaunch')
    },
    onShow: function() {
        console.log('onshow')
    },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    wx.setNavigationBarTitle({
      title: '程序员老黄历'
    })
    let luck = methods.genTodayLuck()
    this.setData({
        today: methods.genTodayString(),
        goods: luck.goods,
        bads: luck.bads,
        direction: methods.genDirection(),
        drinks: methods.genDrinks(),
        girls_index: methods.genGirlsIndex()
    })
  }
})
