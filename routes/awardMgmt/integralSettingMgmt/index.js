module.exports = function (app) {
    require('./integralCalc')(app);
    require('./integralQuery')(app);
    require('./integralType')(app);
    require('./integralExchange')(app);
    require('./integralExchangeDH')(app);
};