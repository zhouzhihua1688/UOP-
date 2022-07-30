module.exports = function (app) {
    require('./pictureMgmt')(app);
    require('./addRichSign')(app);
    require('./articleResource')(app);
};
