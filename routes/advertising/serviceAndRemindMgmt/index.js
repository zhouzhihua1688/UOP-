module.exports = function (app) {
    require('./popupMgmt')(app);
    require('./publicMessagePush')(app);
};
