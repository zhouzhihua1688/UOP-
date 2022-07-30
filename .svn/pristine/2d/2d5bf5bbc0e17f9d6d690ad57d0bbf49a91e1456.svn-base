const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').userMgmt;
module.exports = function (app) {
    //获取用户数据
    app.post('/operationMgmt/userMgmt/role/getUserInfo.ajax', (req, res, next) => {
        let params = {};
        params.searchField = req.body.searchField ? req.body.searchField : '';
        params.page = 1;
        params.rows = 999999;
        let option = {
            pageUrl: '/operationMgmt/userMgmt/role/getUserInfo.ajax',
            req: req,
            qs: params,
            url: apiUrlList.getUserInfo,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body.formList)) {
                let resultData = {};
                let distributedUser = [];
                let unDistributedUser = [];
                result.body.formList.forEach((item) => {
                    item.check = false;
                    if (item.roleList.length === 0) {
                        unDistributedUser.push(item);
                    }
                    else {
                        let roleArr = [];
                        item.roleList.forEach((item) => {
                            roleArr.push(item.roleName);
                        });
                        item.distributedRole = roleArr.join('，');
                        distributedUser.push(item);
                    }
                });
                resultData.distributedUser = distributedUser;
                resultData.unDistributedUser = unDistributedUser;
                res.send({error: 0, msg: '获取用户数据成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取用户数据失败'});
            }
        });
    });
    //获取角色数据
    app.post('/operationMgmt/userMgmt/role/getRoleInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/operationMgmt/userMgmt/role/getRoleInfo.ajax',
            req: req,
            url: apiUrlList.getRoleList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let resultData = result.body;
                resultData.forEach((item) => {
                    item.check = false;
                });
                res.send({error: 0, msg: '获取角色数据成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取角色数据失败', data: []});
            }
        });
    });
    //删除用户的角色
    app.post('/operationMgmt/userMgmt/role/deleteUserRole.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/operationMgmt/userMgmt/role/deleteUserRole.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.addRole,
            body: JSON.parse(req.body.userIds),
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '删除角色成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除角色失败'});
            }
        });
    });
    //分配角色权限
    app.post('/operationMgmt/userMgmt/role/distributeRole.ajax', (req, res, next) => {
        let params = {
            userIds: req.body.userIds ? JSON.parse(req.body.userIds) : [],
            roleIds: req.body.roleIds ? JSON.parse(req.body.roleIds) : []
        };
        let option = {
            pageUrl: '/operationMgmt/userMgmt/role/distributeRole.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.addRole,
            timeout: 15000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '分配角色成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '分配角色失败'});
            }
        });
    });
};