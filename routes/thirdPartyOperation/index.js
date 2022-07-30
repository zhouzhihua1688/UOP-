// 三方运营平台总路由
const mapRouter = require('./breadRouter');
module.exports = function (app) {
    app.get('/thirdPartyOperation/:menu/:page', (req, res, next) => {
        let pageType = req.query.pageType ? req.query.pageType : '';
        let feedbackgo = req.query.feedbackgo ? req.query.feedbackgo : '';
        let channel = 'thirdPartyOperation';
        let menu = req.params.menu;
        let page = req.params.page;
        if (page.slice(-5) !== ".html") {
            return next();
        }
        console.log("menu=", menu);
        console.log("page=", page);
        if (page.indexOf('index.html') !== -1) {
            page = mapRouter[menu].index;
        }
        if(page.slice(0, -5) == 'feedbackSum'){
            if(feedbackgo == 1&&pageType=='review'){
                page = 'procedureSum.html';
            }
            if(feedbackgo == 2&&pageType=='review'){
                page = 'transactionSum.html';
            }
            if(feedbackgo == 3&&pageType=='review'){
                page = 'trailingSum.html';
                pageType='details';
            }
        }
        res.locals.title = mapRouter[menu].child[page.slice(0, -5)];
        let renderData = {
            channel: channel,
            menu: menu,
            page: page.slice(0, -5),
            cchannel: mapRouter.index.name,
            cmenu: mapRouter[menu].name,
            cpage: mapRouter[menu].child[page.slice(0, -5) + pageType]
        };
        console.log('-------------------------------------',page);
        res.render(`${channel}/${menu}/${page.slice(0, -5)}${pageType}.html`, renderData);
    });
    app.get('/thirdPartyOperation/:menu', (req, res, next) => {
        let channel = 'thirdPartyOperation';
        let menu = req.params.menu;
        console.log("menu=", menu);
        let renderData = {
            channel: channel,
            menu: menu,
            page: '',
            cchannel: mapRouter.index.name,
            cmenu: mapRouter[menu.slice(0,-5)].name,
            cpage: ''
        };
        res.locals.title = mapRouter[menu.slice(0,-5)].name;
        res.render(channel + '/' + menu, renderData);
    });
    // 二级菜单路由
    require('./products')(app);
    require('./mails')(app);
    require('./expenseMgmt')(app);
    require('./channelMaintain')(app);
};
