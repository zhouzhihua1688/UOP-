const mapRouter = require('./breadRouter');
module.exports = function (app) {
    app.get('/businessMgmt/:menu/:page', (req, res, next) => {
        let pageType = req.query.pageType ? req.query.pageType : '';
        let faretype = req.query.faretype ? req.query.faretype : '';
        let channel = 'businessMgmt';
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
            cpage: mapRouter[menu].child[page.slice(0, -5) + pageType],
            canShow: !Array.isArray(menuResult),
            authorityList: Array.isArray(menuResult) ? menuResult : []
        };
        if (pageType === 'Detail' && page.slice(0, -5) === 'IPOSetReview') {
            
            res.render(`${channel}/${menu}/IPOSettingDetail.html`, renderData);
        } else if (pageType === 'Detail' && page.slice(0, -5) === 'IPOMgmt') {

            res.render(`${channel}/${menu}/IPOMgmtReviewDetail.html`, renderData);
        } else if (pageType === 'Detail' && page.slice(0, -5) === 'IPOMgmtFundReview') {
            res.render(`${channel}/${menu}/IPOMgmtFundDetail.html`, renderData);
        } else {
            res.render(`${channel}/${menu}/${page.slice(0, -5)}${pageType}.html`, renderData);

        }

    });
    app.get('/businessMgmt/:menu', (req, res, next) => {
        let channel = 'businessMgmt';
        let menu = req.params.menu;
        console.log("menu=", menu);
        let renderData = {
            channel: channel,
            menu: menu,
            page: '',
            cchannel: mapRouter.index.name,
            cmenu: mapRouter[menu.slice(0, -5)].name,
            cpage: ''
        };
        res.locals.title = mapRouter[menu.slice(0, -5)].name;
        res.render(channel + '/' + menu, renderData);
    });

    require('./appointmentDealMgmt')(app);
    require('./bankChannelSetting')(app);
    require('./highFinancialCompany')(app);
    require('./highFinancialMgmt')(app);
    require('./hotWordSetting')(app);
    require('./IPOMgmtEC')(app);
    require('./pledgeBorrowMgmt')(app);
    // require('./paramConfiguration')(app);
    require('./businessParamConfig')(app);
    require('./businessParamConfigOC')(app);
    require('./IPOMgmtOC')(app);
    require('./pauseTradeMgmt')(app);
    require('./largeLimitMgmt')(app);
    require('./attendQuery')(app);
    require('./tradeInfoQuery')(app);
    require('./closingMgmt')(app);
    require('./IPOMgmtFD')(app);
    require('./switchMgmt')(app);
    require('./fundTag')(app);
    require('./combinationProductConfig')(app);
    require('./fundComparison')(app);
    require('./IPOMgmtOCReview')(app);
    require('./productInfoConfig')(app);
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
