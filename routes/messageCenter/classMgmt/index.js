module.exports = function (app) {
    require('./classMgmt')(app);
    require('./secondClassMgmt')(app);
};
