module.exports = function (app) {
    // 页面菜单
    require('./pauseTradeHandle')(app);
    require('./pauseTradeReview')(app);
    require('./pauseTradeStatus')(app);
};