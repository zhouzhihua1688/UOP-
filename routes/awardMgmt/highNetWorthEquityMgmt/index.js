module.exports = function (app) {
    require('./basicInterestConfig')(app);
    require('./rightsPackageConfig')(app);
    require('./equityPartners')(app);
    require('./interestRelationConfig')(app);
    require('./interestReceiveQuery')(app);
};