//奖励配置
module.exports = function (app) {
    // 页面菜单
    require('./cardSetting')(app);
    require('./infoSetting')(app);
    require('./portSetting')(app);
    require('./typeSetting')(app);
    require('./batchCard')(app);
    require('./phoneSetting')(app);
    require('./phoneNumRun')(app);
    require('./awardTable')(app);
};