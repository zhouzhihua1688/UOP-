module.exports = function (app) {
    require('./tagClassifyMgmt')(app);
    require('./tagContentMgmt')(app);
};
