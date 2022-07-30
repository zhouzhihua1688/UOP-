//费用管理系统总路由
module.exports = function (app) {
    // 页面菜单
    require('./feedbackDetails')(app);
    require('./feedbackSum')(app);
    require('./procedureDetails')(app);
    require('./procedureReview')(app);
    require('./procedureSum')(app);
    require('./trailingDetails')(app);
    require('./trailingSum')(app);
    require('./transactionDays')(app);
    require('./transactionReview')(app);
    require('./transactionSum')(app);
    require('./export')(app);
    require('./manager')(app);
};
