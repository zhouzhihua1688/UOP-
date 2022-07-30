module.exports = function (app) {
    // 页面菜单
    require('./IPOBaseInfo')(app);
    require('./IPOLimitDetail')(app);
    require('./IPOLimit')(app);
    require('./IPOBaseInfoDetail')(app);
    require('./datumRate')(app);
    require('./largePurchaseLimit')(app);
    require('./fundTransform')(app);
    require('./paramsCheck')(app);
    require('./transferBlacklist')(app);
    require('./transferWhitelist')(app);
    require('./pauseTradeDataReview')(app);
    require('./publishReview')(app);
    require('./publishHandle')(app);
    require('./financialOpenDayReview')(app);
};