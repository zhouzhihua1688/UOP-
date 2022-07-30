// 对外合作营运平台总路由
module.exports = function (app) {

    require('./userMgmt')(app);
    
    // 处理附件链接20210719
    app.get('/sfs/admin/v1/file/*', (req, res, next) => {
        console.log('========/sfs/admin/v1/file/attach/download========req.url', req.url);
        let path = req.url;
        // /sfs/admin/v1/file/attach/download?attachId=21071907122L0Q5O
        // console.log('=================================req.session',req.session)
        let url_prefix = global.envConfig.inner_gateway;
        let filePath = url_prefix + path;
        console.log('filePath=', filePath);
        let option = {
            pageUrl: filePath,
            req: req,
            headers: {Authorization: req.session['access_token'], 'X-Invoker': 'UOP',},
            url: filePath,
            // timeout: 15000,
            json: true
        };
        require('../local_data/requestWrapper').get(option).pipe(res);
        // require('request').get(option).pipe(res);
        // next();
    })
    
    require('./checkSession')(app);
    app.get('/index.html', (req, res, next) => {
        res.locals.title = '主页';
        let urls = req.session['loginInfo'].urls;
        let channels = [];
        urls.forEach((item) => {
            let data = {
                name:item.name,
                url:item.url,
            };
            channels.push(data);
        });

        res.render('index.html',{
            channels:channels
        });
    });


    // 一级菜单
    require('./thirdPartyOperation')(app);
    require('./businessMgmt')(app);
    require('./accountMgmt')(app);
    require('./tradeMgmt')(app);
    require('./operationMgmt')(app);
    require('./authorityMgmt')(app);
    require('./messageCenter')(app);
    require('./publicConfig')(app);
    require('./cashMgmt')(app);
    require('./marketingActive')(app);
    require('./awardMgmt')(app);
    require('./clientMgmt')(app);
    require('./recommendSystem')(app);
    require('./automatedOperation')(app);
    require('./customerService')(app);
    require('./systemMgmt')(app);
    require('./productIndexes')(app);
    require('./investmentMgmt')(app);
    require('./tableauPanel')(app);
    require('./advertising')(app);
    require('./contentMgmt')(app);
    require('./errorHandler')(app);
};
