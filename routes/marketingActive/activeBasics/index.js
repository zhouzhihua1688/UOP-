//活动基础管理
module.exports = function (app) {
    // 页面菜单
    require('./marketingRule')(app);
    require('./wordFieldNotes')(app);

};
