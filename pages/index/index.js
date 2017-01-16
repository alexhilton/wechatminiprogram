//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    apps: [
      {title: '程序员老黄历', page: 'calendar'}
    ]
  },
  
  jumpToPage: function(event) {
    let page = event.currentTarget.dataset.page
    wx.navigateTo({
      url: '../' + page + '/' + page
    })
  },
  onLoad: function () {
    console.log('onLoad')
    wx.setNavigationBarTitle({
      title: '兵器库'
    })
  }
})
