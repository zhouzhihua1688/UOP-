
module.exports = function (app) {


// errors
// app.post("*", function (req, res, next) {
//     console.log("*******************post error");
//     console.log("post * req.headers.host=", req.headers.host);
//     console.log("post * req.params=", req.params);
//     res.json({ error: -1, msg: "请求出错", resultOpen: "" });
// })

// app.get("*", function (req, res, next) {
//     console.log("*******************get error, 404 not found");
//     console.log("get * req.headers.host=", req.headers.host);
//     console.log("get * req.params=", req.params);
//     res.status(404);
//     res.render("error");
// })

/* S moved from app.js */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("catch 404");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log("*******************error handler !!!");
    
    console.log("get * req.originalUrl=", req.originalUrl);
    console.log("get * req.path=", req.path);
    console.log("get * req.params=", req.params);

    // render the error page
    // res.status(err.status || 500);
    res.status(err.status || 404);
    // res.render('error');

    if (req.path.slice('-5') == '.ajax'){
        res.json({error:-1, msg:'未找到资源'})
    } else {
        // res.render('user/noAuthority.html');
        res.render('error');
    }
});
/* E moved from app.js */

}