module.exports = function (app) {
    // 页面菜单
    require('./reportMgmt')(app);
    require('./matterAnnounce')(app);
    require('./monthlyReport')(app);
    require('./quarterlyReport')(app);
};