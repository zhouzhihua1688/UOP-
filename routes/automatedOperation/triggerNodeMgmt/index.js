module.exports = function (app) {
    require('./triggerNodeTypeConfig')(app);
    require('./triggerNodeConfig')(app);
};
