module.exports = function (app) {
    require('./layoutConfigMgmt')(app);
    require('./groupRelationTypeConfig')(app);
    require('./informationTypeConfig')(app);
    require('./positionTheThemeMgmt')(app);
    require('./positionTheGroupConfig')(app);
    require('./positionTheThemeMgmtModify')(app);
    require('./customTimingTaskMgmt')(app);

};
