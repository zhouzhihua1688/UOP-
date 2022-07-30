//用户奖励查询
module.exports = function (app) {
    // 页面菜单
    require('./awardRecord')(app);
    require('./userDetail')(app);
    require('./awardLogAll')(app);
};