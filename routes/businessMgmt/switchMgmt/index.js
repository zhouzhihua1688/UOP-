module.exports = function (app) {
    // 页面菜单
    require('./switchCategoryMgmt')(app);
    require('./fundSwitchMgmt')(app);
};