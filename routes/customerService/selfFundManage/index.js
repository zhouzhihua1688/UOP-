module.exports = function (app) {
    require('./staticFund')(app);
    require('./batchUpdateFund')(app);
};
