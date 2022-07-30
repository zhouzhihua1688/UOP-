module.exports = function (app) {
    require('./triggerModeConfig')(app);
    require('./eventRelevantConfig')(app);
    require('./timingTaskMgmt')(app);
};
