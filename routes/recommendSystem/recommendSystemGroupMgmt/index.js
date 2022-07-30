module.exports = function (app) {
    require('./groupAudit')(app);
    require('./groupConfig')(app);
    require('./realTimeGroupConfig')(app);
    require('./realTimeSourceConfig')(app);
    require('./ruleParamsConfig')(app);
    require('./ruleTemplateConfig')(app);
};
