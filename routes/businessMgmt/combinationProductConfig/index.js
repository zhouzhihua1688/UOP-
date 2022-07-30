module.exports = function (app) {
    require('./combinationProductHandle')(app);
    require('./combinationProductReview')(app);
    require('./reportMgmt')(app);
    require('./productPoolMgmt')(app);
    require('./productParamsAdd')(app);
    require('./productOperationRecord')(app);
    require('./serialInformation')(app);
    require('./productTradeHandle')(app);
    require('./productTradeReview')(app);
    require('./triple')(app);
    require('./productTargetProfitPlanSetting')(app);
    require('./groupDetails')(app);
    require('./investmentAdviser')(app);
    require('./investmentRisk')(app);
};