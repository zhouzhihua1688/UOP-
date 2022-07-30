module.exports = function(app){
    require('./menus')(app);
    require('./roles')(app);
    require('./users')(app);
};