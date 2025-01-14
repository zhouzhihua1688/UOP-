module.exports = function (app) {
    // 页面菜单
    require('./combinationProductHandle')(app);
    require('./combinationProductRisk')(app);
    require('./combinationProductRiskReview')(app);
    require('./combinationProductRiskCheck')(app);
    require('./combinationProductReview')(app);
    // require('./reportMgmt')(app);
    require('./productPool')(app);
    require('./investFee')(app);
    // require('./matterAnnounce')(app);
    require('./alternativePoolMgmt')(app);
    require('./publishSetting')(app);
    require('./targetProfitStrategyConfig')(app);
    require('./targetProfitStrategyRecord')(app);
};