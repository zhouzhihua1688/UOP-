module.exports = function (app) {
    require('./modelConfigurationMgmt')(app);
    require('./customerQueryOut')(app);
};
