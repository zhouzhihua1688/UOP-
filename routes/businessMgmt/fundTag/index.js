module.exports = function (app) {
    require('./filterMgmt')(app);
    require('./filterMgmtDetails')(app);
    require('./fundTagMgmt')(app);
    require('./fundTagSetting')(app);
    require('./fundTagMgmtNew')(app);
    require('./fundTagSettingNew')(app);
};