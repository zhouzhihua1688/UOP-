module.exports = function (app) {
    require('./investPrefecture')(app);
    require('./contentInvestStrategy')(app);
    require('./activity')(app);
};
