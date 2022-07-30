
module.exports = function (app) {
    require('./shortMessageMgmt')(app);
    require('./amlMgmt')(app);
    require('./unsubscribeQuery')(app);
};
