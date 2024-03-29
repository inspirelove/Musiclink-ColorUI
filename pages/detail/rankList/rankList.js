const app = getApp();
const util = require('../../../utils/util');
Page({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        CustomBar: app.globalData.CustomBar,
        ScreenHeight: app.globalData.ScreenHeight,
        ScreenWidth: app.globalData.ScreenWidth
    },
    onLoad: function(options) {
        this.getRankList()
    },
    getRankList: function() {
        util.requestFromServer('list', {}, 'GET').then((res) => {
            this.setData({
                ranklist: util.parsingRanklist(res)
            })
        }).catch((err) => {
            console.log('获取榜单内容失败', err);
        })
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },
    // 滑动切换页面
    swiperChange: function(e) {
        this.setData({
            TabCur: e.detail.current,
            scrollLeft: (e.detail.current - 1) * 60
        })
    },
    bindSing: function(e) {
        if (wx.getStorageSync('openid')) {
            wx.navigateTo({
                url: '../sing/sing?song=' + e.currentTarget.dataset.song,
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '未登录无法进入唱歌页面',
                showCancel: true,
                cancelText: '取消',
                confirmText: '去登录',
                success: (result) => {
                    if (result.confirm) {
                        wx.switchTab({
                            url: '../../tabbar/mine/mine',
                        })
                    }
                }
            });
        }

    },
    bindSong: function(e) {
        wx.navigateTo({
            url: '../song/song?song=' + e.currentTarget.dataset.song,
        })
    }
})