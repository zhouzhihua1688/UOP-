module.exports = function (app) {
    require('./configuration')(app);
    require('./feedback')(app);
};