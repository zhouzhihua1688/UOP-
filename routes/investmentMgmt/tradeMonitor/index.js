module.exports = function (app) {
    // 页面菜单
    require('./tradeExecuteSurvey')(app);
    require('./tradeInstructMonitor')(app);
    require('./tradeAbnormalHandle')(app);
    require('./tradeAbnormalReview')(app);
};