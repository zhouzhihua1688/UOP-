const menuUrl = require('../../local_data/authorityMgmt/menu.js');
const apiConfig = require('../userMgmt/apiConfig');
const request = require('request');
const querystring = require('querystring');

module.exports = function (app) {
    app.post("*", function (req, res, next) {
        if (req.session && req.session['loginValid'] && req.path.slice(-5) === '.ajax') {
            console.log("POST req.originalUrl=", req.originalUrl);
            console.log("POST req.path=", req.path);
            if (req.session.loginInfo && !req.session.loginInfo.isAdmin) {
                if (checkUrl(req.path, req.session.loginInfo.urls)) {
                    console.log(`POST ${req.path} ${req.session.loginInfo.userid} ${req.session.loginInfo.username} 权限验证已通过 `);
                    next();
                } else {
                    console.log(`POST ${req.path} ${req.session.loginInfo.userid} ${req.session.loginInfo.username} 权限验证未通过 `);
                    res.json({
                        error: -1,
                        msg: '抱歉，您没有当前操作的权限'
                    });
                }
            } else {
                next();
            }
        } else {
            if (req.path.slice(-5) == '.ajax') {
                res.json({
                    error: -1,
                    msg: '会话过期，请重新登录',
                    resultOpen: '/user/login.html'
                });
            } else {
                res.redirect('/user/login.html');
            }
        }
    });

    app.get("*", function (req, res, next) {
        // static resoures not found, return 404 Not Found.
        if (req.path.match(/\.(gif|jpg|png|js|css)($|(\?.*?$))/ig)) {
            console.log('' + req.path + 'not found...............');
            return res.status(404).send('Not Found');
        }
        if (req.session && req.session['loginValid']) {
            console.log("GET req.originalUrl=", req.originalUrl);
            console.log("GET req.path=", req.path);
            if (req.path.slice(-5) == '.ajax') {
                if (req.session.loginInfo.isAdmin) {
                    return next();
                }
                if (checkUrl(req.path, req.session.loginInfo.urls)) {
                    console.log(`GET ${req.path} ${req.session.loginInfo.userid} ${req.session.loginInfo.username} 权限验证已通过 `);
                    return next();
                } else {
                    console.log(`GET ${req.path} ${req.session.loginInfo.userid} ${req.session.loginInfo.username} 权限验证未通过 `);
                    return res.json({
                        error: -1,
                        msg: '抱歉，您没有当前操作的权限'
                    });
                }
            }
            res.locals.username = '';
            res.locals.isLdap = '';
            res.locals.isAdmin = false;
            if (req.session.loginInfo) {
                res.locals.username = req.session.loginInfo.username;
                res.locals.isLdap = req.session.loginInfo.isLdap;
                res.locals.isAdmin = req.session.loginInfo.isAdmin;
            }
            res.locals.pageAuthority = req.session.loginInfo.pageAuthority;
            if (req.path == '/index.html') {
                return next();
            }
            //判断req.path是否有效
            let reqPath = req.path.split('/');
            //去除末尾的index.html
            if (reqPath[reqPath.length - 1] == 'index.html') {
                reqPath.pop();
            }
            reqPath = reqPath.join('/');
            if (!inMenu(reqPath, menuUrl)) {
                return res.redirect('/user/404.html');
            }
            //判断req.path是否有权限
            let simpleSessionUrl = [];
            let sessionUrl = JSON.parse(JSON.stringify(req.session['loginInfo'].urls));
            makeSimpleUrl(sessionUrl, simpleSessionUrl);
            if (!simpleSessionUrl.includes(reqPath)) {
                return res.redirect('/user/noAuthority.html');
            }
            // used in header.html S
            let url = '';
            let reqPathArr = reqPath.split('/');
            reqPathArr.shift();
            //将对应的channel,menu,page的check属性根据req.path置为true
            reqPathArr.forEach(value => {
                url += `/${value}`;
                findUrl(url, sessionUrl);
            });
            let channels = getChannels(sessionUrl);
            let menus = findMenus(reqPathArr[0], sessionUrl);
            res.locals.channels = channels;
            res.locals.menus = menus;
            next();
        } else {
            console.log("req.originalUrl=", req.originalUrl);
            console.log("req.path=", req.path);
            if (req.path.slice(-5) == '.ajax') {
                res.json({
                    error: -1,
                    msg: '会话过期，请重新登录'
                });
            } else {
                // 除去地址栏中的ticket参数,防止伪造
                let queryObj = JSON.parse(JSON.stringify(req.query));
                delete queryObj.ticket;
                let querys = querystring.stringify(queryObj);
                querys = querys ? '?' + querys : '';
                // service参数前缀
                const urlPrefixion = `${req.protocol}://${req.headers.host}`;
                // cas系统地址
                const casAddress = apiConfig.casAddress;
                const originalUrl = req.path + querys;
                if (req.query.ticket) {
                    let ticket = req.query.ticket;
                    console.log('已获取ticket', ticket);
                    loginUAAByTicket(ticket, casAddress, urlPrefixion, originalUrl, req, res);
                } else {
                    console.log('ticket不存在,跳转至cas系统');
                    res.redirect(`${casAddress}/login?service=${encodeURIComponent(urlPrefixion + originalUrl)}`);
                }
            }
        }
    });
};
//使用ticket登录UAA
function loginUAAByTicket(ticket, casAddress, urlPrefixion, originalUrl, req, res) {
    let postData = {
        grant_type: apiConfig.grant_type_cas,
        scope: apiConfig.scope_cas,
        ticket: ticket,
        service: encodeURIComponent(urlPrefixion + originalUrl)
    };
    let option = {
        headers: {
            'X-Invoker': 'UOP',
        },
        auth: {
            username: apiConfig.clientId,
            password: apiConfig.clientSecret
        },
        url: apiConfig.user.login,
        form: postData,
        timeout: 15000
    };
    console.log('通过ticket登录UAA系统参数:', option);
    request.post(option, (error, response, body) => {
        if (error) {
            // console.log('UAA系统验证出错');
            // res.redirect(`${casAddress}/login?service=${encodeURIComponent(urlPrefixion + originalUrl)}`);
            console.log('UAA系统验证出错,跳转到没有权限页面');
            return res.redirect('/user/noAuthority.html');
        }
        try {
            let data = JSON.parse(body);
            console.log('UAA系统验证返回数据:', data);
            if (data.returnCode == 0 && data.loginUserDto && data.loginUserDto.userInfo) {
                let userInfoStatus = data.loginUserDto.userInfo.status;
                if (userInfoStatus == 2 || userInfoStatus == 3 || userInfoStatus == 4) { // 用户状态无效
                    res.redirect('/user/noAuthority.html');
                } else {
                    if (data.loginUserDto.roles.length === 0) { // 用户无权限访问
                        res.redirect('/user/noAuthority.html');
                    } else {
                        req.session['loginValid'] = true;
                        let loginInfo = {
                            userid: data.loginUserDto.userInfo.userId,
                            username: data.loginUserDto.userInfo.userName,
                            isLdap: data.loginUserDto.userInfo.isLdap,
                            isAdmin: data.isAdmin
                        };
                        if (loginInfo.isAdmin) {
                            let menus = require('../../local_data/authorityMgmt/menu.js');
                            loginInfo.urls = formatMenuJson(menus);
                            loginInfo.pageAuthority = {};
                        } else {
                            loginInfo.urls = formatUrls(data.loginUserDto.roles); // 存放leftMenu相关数据
                            loginInfo.pageAuthority = formatPageAuthority(data.loginUserDto.rolePermCodes); // 存放所有页面内权限(针对第三级页面)
                        }
                        console.log('loginInfo.urls=', loginInfo.urls);
                        console.log('loginInfo.pageAuthority=', loginInfo.pageAuthority);
                        //存session
                        req.session['loginInfo'] = loginInfo;
                        req.session['access_token'] = 'bearer ' + data['access_token'];
                        req.session['refresh_token'] = 'bearer ' + data['refresh_token'];
                        console.log('UAA系统验证完毕,准备跳转');
                        sysLogger(0, req, option, body.replace(/\\/g,'\\\\'));
                        res.redirect(originalUrl);
                    }
                }
            } else {
                console.log('UAA系统验证失败,跳转到没有权限页面');
                res.redirect('/user/noAuthority.html');
                // console.log('UAA系统验证失败,跳转cas登录');
                // res.redirect(`${casAddress}/login?service=${encodeURIComponent(urlPrefixion + originalUrl)}`);
            }
        } catch (e) {
            console.log('loginUAAByTicket e=', e);
        }
    })
}
//判断是否为合法url
function inMenu(reqPath, menuUrl) {
    if (!menuUrl.length) {
        return false;
    }
    for (let i = 0; i < menuUrl.length; i++) {
        if (menuUrl[i].url == reqPath) {
            return true;
        }
    }
    return false;
}
//将tree结构的sessionUrl整理成一维数组
function makeSimpleUrl(sessionTree, resultArr) {
    sessionTree.forEach(item => {
        if (Array.isArray(item.child)) {
            makeSimpleUrl(item.child, resultArr);
        }
        resultArr.push(item.url);
    });
}

function findUrl(url, arr) {
    arr.forEach((item) => {
        if (item.url === url) {
            item.checked = true;
        }
        if (Array.isArray(item.child)) {
            findUrl(url, item.child);
        }
    });
}

function getChannels(urlList) {
    let channels = [];
    urlList.forEach((item) => {
        channels.push({
            name: item.name,
            url: item.url,
            checked: item.checked
        });
    });
    return channels;
}

function findMenus(channel, urlList) {
    for (let item of urlList) {
        if (item.url === '/' + channel) {
            return item.child;
        }
    }
}
//检测是否有ajax权限
function checkUrl(path, urlObj) {
    let obj = {
        hasAuth: false
    };
    let arr = path.split('/');
    arr.pop();
    let htmlUrlArr = [];
    arr[arr.length - 1].split('~').forEach(prePage => {
        arr.pop();
        arr.push(prePage + '.html');
        htmlUrlArr.push(arr.join('/'));
    });
    findChildUrls(htmlUrlArr, urlObj, obj);
    return obj.hasAuth;
}

function findChildUrls(htmlUrlArr, urlObj, obj) {
    urlObj.forEach((item) => {
        if (htmlUrlArr.includes(item.url)) {
            obj.hasAuth = true;
            return;
        }
        if (Array.isArray(item.child)) {
            findChildUrls(htmlUrlArr, item.child, obj);
        }
    });
}

function formatPageAuthority(rolePermCodes) {
    if(!rolePermCodes){
        return {};
    }
    let arr = [];
    rolePermCodes.forEach(value => {
        arr = arr.concat(JSON.parse(value));
    });
    arr = Array.from(new Set(arr)); // 数组去重
    let pageAuthority = {} // 用于存放该角色在每个页面内的权限
    arr.forEach(item => {
        let menuId = item.split('@')[0];
        let pageAuth = item.split('@')[1];
        if(pageAuthority[menuId]){
            if(pageAuthority[menuId].hasPageAllAuthority){ // 该角色已存在对该页面的所有权限
                pageAuthority[menuId].authorityList = [];
            }
            else { // 该角色已存在对该页面的部分权限
                if(!pageAuth){
                    pageAuthority[menuId].hasPageAllAuthority = true;
                    pageAuthority[menuId].authorityList = [];
                }
                else {
                    let authArr = pageAuthority[menuId].authorityList;
                    pageAuthority[menuId].authorityList = Array.from(new Set(authArr.concat(pageAuth.toLocaleUpperCase().split(''))));
                }
            }
        }
        else { // 该角色未存在对该页面的权限
            pageAuthority[menuId] = {
                hasPageAllAuthority: pageAuth ? false : true,
                authorityList: pageAuth ? pageAuth.toLocaleUpperCase().split('') : []
            };
        }
    });
    return pageAuthority;
}

function formatMenuJson(menus) {
    let list = [];
    menus.forEach((item) => {
        if (item.type == 2) {
            let listItem = {
                id: item.menuId,
                parentId: item.parentMenuId,
                name: item.name,
                url: item.url,
                type: item.type,
                child: item.hasSubmenu ? [] : undefined,
                checked: false
            };
            if (item.parentMenuId) {
                findParent(item.parentMenuId, list, listItem);
            } else {
                list.push(listItem);
            }
        }
    });
    return list;
}

function formatUrls(arr) {
    let menuIdsArr = [];
    try {
        menuIdsArr = require('../../local_data/authorityMgmt/menu.js').map(item => item.menuId);
        arr.forEach(item => {
            for (let i = 0; i < menuIdsArr.length; i++) {
                if (menuIdsArr[i] === item.menuCode) {
                    menuIdsArr.splice(i + 1, 0, item);
                    break;
                }
            }
        })
    } catch (error) {

    }
    let list = [];
    menuIdsArr.filter(item => typeof item === 'object').forEach((item) => {
        let listItem = {
            id: item.menuCode,
            parentId: item.parentCode,
            name: item.resourceName,
            url: item.defaultUrl,
            type: item.resourceType,
            child: item.hasSubmenu ? [] : undefined,
            checked: false
        };
        if (item.parentCode) {
            findParent(item.parentCode, list, listItem);
        } else {
            list.push(listItem);
        }
    });
    return list;
}

function findParent(menuId, arr, listdata) {
    for (let item of arr) {
        if (item.id === menuId) {
            item.child.push(listdata);
            return;
        }
        if (Array.isArray(item.child)) {
            findParent(menuId, item.child, listdata);
        }
    }
}