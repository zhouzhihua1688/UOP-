const mapRouter = require('./breadRouter');
module.exports = function (app) {
    app.get('/publicConfig/:menu/:page', (req, res, next) => {
        let pageType = req.query.pageType ? req.query.pageType : '';
        let urlList = req.session.loginInfo.urlList;
        let channel = 'publicConfig';
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
        res.locals.title = mapRouter[menu].child[page.slice(0, -5)];
        let menuResult = findMenuId(`/${channel}/${menu}/${page}`, req.session.loginInfo);
        let renderData = {
            channel: channel,
            menu: menu,
            page: page.slice(0, -5),
            cchannel: mapRouter.index.name,
            cmenu: mapRouter[menu].name,
            cpage: mapRouter[menu].child[page.slice(0, -5)],
            canShow: !Array.isArray(menuResult),
            authorityList: Array.isArray(menuResult) ? menuResult : []
        };
        if (pageType && menu === 'appointment') {
            res.render(`${channel}/${menu}/${page.slice(0, -5)}${pageType}.html`, renderData);
        }
        else {
            res.render(channel + '/' + menu + '/' + page, renderData);
        }
    });
    app.get('/publicConfig/:menu', (req, res, next) => {
        let urlList = req.session.loginInfo.urlList;
        let channel = 'publicConfig';
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

    require('./shortLink')(app);
    require('./automatedTool')(app);
    require('./alipayConfig')(app);
    require('./paramsMaintain')(app);
    require('./mobileMgmt')(app);
    require('./AIPstrategyMgmt')(app);
    require('./appSearchConfig')(app);
    require('./assetAllocationMgmt')(app);
    require('./promptContentConfig')(app);
    require('./familyAffectionAccount')(app);
    require('./salary')(app);
    require('./wechatPublicMgmt')(app);
    require('./questionnaire')(app);
    require('./appointment')(app);
    require('./monetary')(app);
};

function findMenuId(path, loginInfo) {
    if(loginInfo.isAdmin){
        return true;
    }
    let menuId = '';
    let urls = loginInfo.urls;
    for(let channel of urls){
        if(menuId){
            break;
        }
        for(let menu of channel.child){
            if(menuId){
                break;
            }
            for(let page of menu.child){
                if(page.url === path){
                    menuId = page.id;
                    break;
                }
            }
        }
    }
    if(!menuId){ // 内页，找不到menuId的情况
        return true;
    }
    if(!loginInfo.pageAuthority[menuId]){
        return true;
    }
    if(loginInfo.pageAuthority[menuId].hasPageAllAuthority){ // 已有该页面所有权限
        return true;
    }
    return loginInfo.pageAuthority[menuId].authorityList;
}
