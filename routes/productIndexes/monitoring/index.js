
module.exports = function (app) {
    require('./indicator')(app);
    require('./indicatorPush')(app);
    require('./forms')(app);
    require('./reportForms')(app);
    require('./fundInfo')(app);
    require('./thirdPartyGroup')(app);
    require('./realTimeForms')(app);
    require('./threeSidesLogs')(app);
    require('./targetYield')(app);
};
