// 用户管理路由
const mapRouter = require('./breadRouter');
const request = require('request');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const RedisClient = require('ioredis');
const apiConfig = require('./apiConfig');
const redisCluster = require('./apiConfig').redisCluster;
const querystring = require('querystring');
const cipher = require('../../local_data/cipher');
const casAddress = require('./apiConfig').casAddress;

const client = new RedisClient.Cluster(redisCluster);
const adminList = [];

const redisOption = {
    client: client,
    prefix: 'uop:sess:'
};

module.exports = function (app) {
    app.use(session({
        secret: 'unique operation platform',
        resave: false,
        saveUninitialized: true,
        rolling: true,
        store: new RedisStore(redisOption),
        cookie: {
            maxAge: 1800000
        }
        // cookie: { secure: true }
    }));

    app.get('/', (req, res, next) => {
        let loginValid = req.session['loginValid'];
        if (loginValid) {
            res.redirect('/index.html');
        } else {
            res.redirect(`${casAddress}/login?service=${encodeURIComponent(`${req.protocol}://${req.headers.host}/index.html`)}`);
        }
    });

    app.get('/user/:page', (req, res, next) => {
        let page = req.params.page;
        if (page.slice(-5) != '.html') {
            return next();
        }
        console.log('page=', page);

        // used in header.html S
        res.locals.username = '';
        res.locals.isLdap = '';
        if (req.session.loginInfo) {
            res.locals.username = req.session.loginInfo.username;
            res.locals.isLdap = req.session.loginInfo.isLdap;
        }
        // used in header.html E

        res.locals.title = mapRouter[page.slice(0, -5)];
        res.render('user/' + page);
    });

    app.get('/user/captcha.ajax', function (req, res, next) {
        try {
            let url = apiConfig.user.captcha;

            console.log('get /user/captcha.ajax url=', url);
            request(url, {
                'headers': {
                    'X-Invoker': 'UOP',
                },
                timeout: 15000
            }, (error, response, body) => {
                console.log('get /user/captcha.ajax error:', error);
                console.log('get /user/captcha.ajax statusCode:', response && response.statusCode);
                // console.log('get /user/captcha.ajax body:', body);

                if (error) {
                    return res.end();
                }

                let data = JSON.parse(body);
                console.log('captcha word=', data['word']);
                // console.log(data['base64Src']);
                if (!data || !data['word'] || !data['base64Src']) {
                    return res.end();
                }
                req.session.captcha = data['word'];
                res.end(new Buffer(data['base64Src'].replace(/^data:image\/\w+;base64,/, ''), 'base64'));
            })

        } catch (error) {
            console.log('captcha catched error=', error);
            return res.end();
        }
    });

    app.get('/user/signout', (req, res, next) => {
        let store = req.sessionStore;
        store.destroy(req.sessionID, function (err, data) {
            if (err) console.log('/user/signout store.destroy err=', err);
        });
        // req.session.destroy();
        res.redirect(`${casAddress}/logout`);
    });

    app.post('/user/signin.ajax', (req, res, next) => {
        let params = req.body;
        console.log('req.session.captcha2=', req.session.captcha);
        // 图片验证码
        // if (!req.session.captcha || req.session.captcha.toLowerCase() != params['captcha'].toLowerCase()) {
        //     return res.json({'error': -1, 'msg': '验证码输入错误'})
        // }
        let url = apiConfig.user.login;
        let postData = {
            // 'Authorization': apiConfig['Authorization'], //set to headers
            'grant_type': apiConfig['grant_type'],
            'scope': apiConfig['scope'],
            'loginName': params['loginName'],
            // 'password': params['loginPassword']
            'password': '******'
        };
        let option = {
            headers: {
                'X-Invoker': 'UOP',
                'Authorization': apiConfig['Authorization']
            },
            url: url,
            // formData: postData,
            form: postData,
            timeout: 15000
        };
        console.log('-----------------------------/user/signin.ajax option=', option);
        option.form['password'] = params['loginPassword'];
        request.post(option, (error, response, body) => {
            if (error) {
                return res.json({
                    'error': -1,
                    'msg': '验证用户名密码出错'
                })
            }
            let data = JSON.parse(body);
            console.log('--------------------------------------------/user/signin.ajax data:', data);
            console.log(!data || !data.loginUserDto || !data.loginUserDto.userInfo);
            if (!data || !data.loginUserDto || !data.loginUserDto.userInfo) {
                return res.json({
                    error: -1,
                    msg: data.error_description ? data.error_description : '验证用户名密码出错'
                })
            }
            let result = {};
            if (data.returnCode == 0 && data.loginUserDto && data.loginUserDto.userInfo) {
                let userInfoStatus = data.loginUserDto.userInfo.status;
                if (userInfoStatus == 2 || userInfoStatus == 3 || userInfoStatus == 4) { // 用户状态无效
                    result.error = -1;
                    result.msg = '用户状态异常，无法登录系统';
                    res.json(result);
                } else {
                    if (data.loginUserDto.roles.length === 0) { // 用户无权限访问
                        res.json({
                            error: -1,
                            msg: '用户无权限访问'
                        });
                    } else {
                        req.session['loginValid'] = true;
                        let loginInfo = {
                            userid: data.loginUserDto.userInfo.userId,
                            username: data.loginUserDto.userInfo.userName,
                            isLdap: data.loginUserDto.userInfo.isLdap,
                            isAdmin: data.isAdmin || adminList.includes(data.loginUserDto.userInfo.userId)
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

                        result.error = 0;
                        result.msg = 'success';
                        result.resultOpen = (params['_goto'] ? params['_goto'] : '/');
                        sysLogger(0, req, option, body.replace(/\\/g, '\\\\'));
                        res.json(result);
                    }
                }
            } else {
                result.error = -1;
                result.msg = data.error_description ? data.error_description : '用户名不存在或密码错误';
                res.json(result);
            }
        })
    });
    app.post('/user/resetPwd.ajax', (req, res, next) => {
        let userIds = req.session.loginInfo.userid;
        let params = req.body;
        let postData = {
            // 'Authorization': apiConfig['Authorization'], //set to headers
            'grant_type': apiConfig['grant_type'],
            'scope': apiConfig['scope'],
            'userId': userIds,
            'oldPassword': cipher(params['oldPassword']),
            'newPassword': cipher(params['newPassword']),
        };
        let option = {
            headers: {
                'Authorization': req.session['access_token'],
            },
            url: apiConfig.user.resetPwd,
            qs: postData,
            timeout: 15000,
            json: true
        };
        console.log('/user/resetPwd.ajax option:', option);
        option.qs['oldPassword'] = params['oldPassword'];
        option.qs['newPassword'] = params['newPassword'];
        request.put(option, (error, response, body) => {
            sysLogger(4, req, option, body);
            console.log('/user/resetPwd.ajax error:', error);
            console.log('/user/resetPwd.ajax statusCode:', response && response.statusCode);
            console.log('/user/resetPwd.ajax body:', body);
            if (error) {
                // next();
                // return;
                return res.json({
                    'error': -1,
                    'msg': '修改密码出错'
                })
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                // 删掉session重新登录 S
                let store = req.sessionStore;
                store.destroy(req.sessionID, function (err, data) {
                    if (err) console.log('/user/resetPwd.ajax success store.destroy err=', err);
                });
                // req.session.destroy();
                // 删掉session重新登录 E
                res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        })
    })

};

function formatPageAuthority(rolePermCodes) {
    if (!rolePermCodes) {
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
        if (pageAuthority[menuId]) {
            if (pageAuthority[menuId].hasPageAllAuthority) { // 该角色已存在对该页面的所有权限
                pageAuthority[menuId].authorityList = [];
            } else { // 该角色已存在对该页面的部分权限
                if (!pageAuth) {
                    pageAuthority[menuId].hasPageAllAuthority = true;
                    pageAuthority[menuId].authorityList = [];
                } else {
                    let authArr = pageAuthority[menuId].authorityList;
                    pageAuthority[menuId].authorityList = Array.from(new Set(authArr.concat(pageAuth.toLocaleUpperCase().split(''))));
                }
            }
        } else { // 该角色未存在对该页面的权限
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