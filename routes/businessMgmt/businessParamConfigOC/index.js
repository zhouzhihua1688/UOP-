
module.exports = function (app) {
    // 页面菜单
    require('./discountHandle')(app);
    require('./discountReview')(app);
    require('./quotaHandle')(app);
    require('./quotaReview')(app);
};