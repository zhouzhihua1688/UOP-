module.exports = function (app) {
    require('./redPacketQuery')(app);
    require('./redPacketType')(app);
    require('./redPacketStatus')(app);
};
