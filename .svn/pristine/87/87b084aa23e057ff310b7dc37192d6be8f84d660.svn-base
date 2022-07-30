// 活动运营管理总路由
const mapRouter = require('./breadRouter');
module.exports = function (app) {
    app.get('/clientMgmt/:menu/:page', (req, res, next) => {
        let pageType = req.query.pageType ? req.query.pageType : '';
        let faretype = req.query.faretype ? req.query.faretype : '';
        let channel = 'clientMgmt';
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
        if (page.slice(0, -5) == 'activeTemplate') {
            if (faretype == 1 && pageType == 'upload') {
                page = 'activeTemplate.html';
            }
            if (faretype == 2 && pageType == 'upload') {
                page = 'activeTemplate.html';
            }
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
    app.get('/clientMgmt/:menu', (req, res, next) => {
        let channel = 'clientMgmt';
        let menu = req.params.menu;
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
  
    require('./vipGrade')(app);
    require('./whiteList')(app);
    require('./information')(app);
    require('./labelApplication')(app);
    require('./badgeMangement')(app);
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