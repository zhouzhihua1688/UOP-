module.exports = function (app) {
    // 页面菜单
    require('./accountRule')(app);
    require('./indicatorMonitoring')(app);
    require('./tradeAnomaly')(app);
    // require('./investmentRisk')(app);
};