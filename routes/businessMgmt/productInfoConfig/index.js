module.exports = function (app) {
    require('./productExpandType')(app);
    require('./productExpandContent')(app);
    require('./freeRideProductConfig')(app);
};