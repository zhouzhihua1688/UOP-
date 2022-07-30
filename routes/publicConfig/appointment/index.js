module.exports = function (app) {
    require('./appointmentMgmt')(app);
    require('./applyMgmt')(app);
};