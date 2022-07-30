
// const request = require('../../local_data/requestWrapper');
const mapRouter = require('./breadRouter');
const viewUrlObj = require('./mappingConfig').viewUrlObj;
module.exports = function (app) {
    app.get('/tableauPanel/:menu/:page', (req, res, next) => {
        console.log('req.params=', req.params)
        let urlList = req.session.loginInfo.urlList;
        let channel = 'tableauPanel';
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
        let tableauServer= global.envConfig['tableauServer'];
        let option = {
            // pageUrl: tableauServer + '/trusted',
            // req,
            url: tableauServer + '/trusted',
            // body: {"username": "chenwenjian"},
            formData: {"username": "chenwenjian"},
            timeout: 15000,
            // json: true
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };
        renderData.tableauServer= tableauServer;
        require('request').post(option, (error, response, body) => {
            // if (error) {
			// 	return res.send({
			// 		error: 1,
			// 		msg: '数据获取失败'
			// 	});
			// }
			// let result = typeof body === 'string' ? JSON.parse(body) : body;
			// if (result && result.returnCode == '0') {
			// 	res.send({
			// 		error: 0,
			// 		msg: '调用成功',
			// 		data: result.body
			// 	});
			// } else {
			// 	res.send({
			// 		error: 1,
			// 		msg: '获取数据失败'
			// 	});
			// }
            console.log('error=', error);
            // console.log('response=', response);
            console.log('body=', body);
            renderData.tableauTicket=body;
            renderData.tableauViewUrl=viewUrlObj[req.path];
            page = 'detail.html';
            res.render(channel + '/' + page, renderData);
            // renderData.tableauViewUrl=viewUrlObj['/'+channel+'/'+ menu + '/' + page];
            // res.render(channel + '/' + menu + '/' + page, renderData);
        })

    });
    app.get('/tableauPanel/:menu', (req, res, next) => {
        let urlList = req.session.loginInfo.urlList;
        let channel = 'tableauPanel';
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

    // 统一在此文件处理，暂时不需要分页面的route处理
    // require('./antDataPanel')(app);
    // require('./antOperation')(app);
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
