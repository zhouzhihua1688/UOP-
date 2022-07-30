module.exports = function (app) {
    require('./manualMgmt')(app);
    require('./deleteMsg')(app);
};