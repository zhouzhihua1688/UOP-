const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').userMgmt;
module.exports = function (app) {
    //查询用户
    app.post('/operationMgmt/userMgmt/user/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.searchField && (params.searchField = req.body.searchField);
        params.page = req.body.page;
        params.rows = req.body.rows;
        let option = {
            pageUrl: '/operationMgmt/userMgmt/user/getTableData.ajax',
            req: req,
            url: apiUrlList.getUserInfo,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.formList)) {
                result.body.formList.forEach((item) => {
                    item.check = false;
                });
                let resultData = {};
                resultData.page = result.body.page;
                resultData.records = result.body.records;
                resultData.total = Math.ceil(result.body.total / req.body.rows);
                resultData.tableData = result.body.formList;
                res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //新增用户
    app.post('/operationMgmt/userMgmt/user/add.ajax', (req, res, next) => {
        let params = {};
        req.body.userId && (params.userId = req.body.userId);
        req.body.userName && (params.userName = req.body.userName);
        req.body.passwd && (params.passwd = req.body.passwd);
        req.body.confirmPasswd && (params.confirmPasswd = req.body.confirmPasswd);
        req.body.remark && (params.remark = req.body.remark);
        req.body.phone && (params.phone = req.body.phone);
        req.body.email && (params.email = req.body.email);
        req.body.status && (params.status = req.body.status);
        let option = {
            pageUrl: '/operationMgmt/userMgmt/user/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.userAdd,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '添加成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
    //修改用户
    app.post('/operationMgmt/userMgmt/user/update.ajax', (req, res, next) => {
        let params = {};
        req.body.userId && (params.userId = req.body.userId);
        req.body.userName && (params.userName = req.body.userName);
        req.body.remark && (params.remark = req.body.remark);
        req.body.phone && (params.phone = req.body.phone);
        req.body.email && (params.email = req.body.email);
        req.body.status && (params.status = req.body.status);
        req.body.id && (params.id = req.body.id);
        let option = {
            pageUrl: '/operationMgmt/userMgmt/user/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.userEdit,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //删除用户
    app.post('/operationMgmt/userMgmt/user/deleteUser.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/operationMgmt/userMgmt/user/deleteUser.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.userDelete,
            qs: {ids: req.body.ids},
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
};