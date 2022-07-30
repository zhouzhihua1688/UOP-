module.exports = function (app) {
    require('./businessHandle')(app);
    require('./businessReview')(app);
    require('./applyRecord')(app);
    require('./review')(app);
};
