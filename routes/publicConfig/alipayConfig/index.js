module.exports = function (app) {
    require('./miniConfig')(app);
    require('./makeFutureConfig')(app);
    require('./cmbMPConfig')(app);
};