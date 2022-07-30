//活动模型管理
module.exports = function (app) {
    // 页面菜单
    require('./activeComponent')(app);
    require('./activeComponentRule')(app);
    require('./activeCut')(app);
    require('./activeTemplate')(app);
    require('./templatePort')(app);
    require('./activeTemplateDeploy')(app);

};
