module.exports = function(app){
    require('./scenceList')(app);
    require('./scenceAdd')(app);
    require('./upReplyRule')(app);
};