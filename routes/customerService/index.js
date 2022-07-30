// 客服操作总路由
const mapRouter = require('./breadRouter');
module.exports = function (app) {
    app.get('/customerService/:menu/:page', (req, res, next) => {
        let pageType = req.query.pageType ? req.query.pageType : '';
        let channel = 'customerService';
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
        if (pageType == 'review') {
            page = '.html';
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
        console.log('-------------------------------------', page);
        res.render(`${channel}/${menu}/${page.slice(0, -5)}${pageType}.html`, renderData);
    });
    app.get('/customerService/:menu', (req, res, next) => {
        let channel = 'customerService';
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
    // 二级菜单路由
    require('./accountQuery')(app);
    require('./bankCardAudit')(app);
    require('./assetTestify')(app);
    require('./modifyPhoneNum')(app);
    require('./selfFundManage')(app);
    require('./custAccountMgmt')(app);
    require('./topUpOrtake')(app);
    require('./accountMgm')(app);
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