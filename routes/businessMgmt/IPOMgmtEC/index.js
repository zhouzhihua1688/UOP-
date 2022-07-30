module.exports = function (app) {
    require('./IPOMgmt')(app);
    require('./IPOMgmtReview')(app);
    require('./whiteList')(app);
    require('./IPOUpload')(app);
    require('./IPOMgmtModify')(app);
    require('./IPOMgmtReviewDetail')(app);
    require('./fundChangeHandle')(app);
    require('./fundChangeReview')(app);
   
};