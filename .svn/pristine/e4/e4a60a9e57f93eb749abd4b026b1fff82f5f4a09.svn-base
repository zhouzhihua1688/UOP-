const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemGroupMgmt.ruleParamsConfig;
module.exports = function (app) {
    //查询
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/search.ajax', (req, res, next) => {
        let params = {};
        req.body.key && (params.key = req.body.key);
        req.body.name && (params.name = req.body.name);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/search.ajax',
            req: req,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode === 0 && Array.isArray(body.body.rows)) {
                res.send({error: 0, msg: '查询成功', data: body.body});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //删除
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/del.ajax', (req, res, next) => {
        let params = {};
        params.key = req.body.key;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            qs: params,
            url: apiUrlList.del,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
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
    //新增
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/add.ajax', (req, res, next) => {
        let params = {};
        params.name = req.body.name;
        params.key = req.body.key;
        params.remark = req.body.remark;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            timeout: 30000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '添加成功', data: null});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '添加失败', data: null});
            }
        });
    });
    //修改
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/update.ajax', (req, res, next) => {
        let params = {};
        params.key = req.body.key;
        params.name = req.body.name;
        params.remark = req.body.remark;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleParamsConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            timeout: 30000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '修改成功', data: null});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '修改失败', data: null});
            }
        });
    });
};
