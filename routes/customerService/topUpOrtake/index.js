module.exports = function (app) {
    require('./dealQuota')(app);
    require('./specialCust')(app);
    require('./weBankWhite')(app);
};
