const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').appMgmt;
module.exports = function (app) {
    //查询客户端
    app.post('/operationMgmt/appMgmt/client/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.searchField && (params.searchField = req.body.searchField);
        params.page = req.body.page;
        params.rows = req.body.rows;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/client/getTableData.ajax',
            req: req,
            url: apiUrlList.client,
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
    //新增客户端
    app.post('/operationMgmt/appMgmt/client/add.ajax', (req, res, next) => {
        let params = {};
        params.clientId = req.body.clientId;
        params.resourceIds = req.body.resourceIds;
        params.clientSecret = req.body.clientSecret;
        params.scope = req.body.scope;
        params.authorizedGrantTypes = req.body.authorizedGrantTypes;
        params.webServerRedirectUri = req.body.webServerRedirectUri;
        params.authorities = req.body.authorities;
        params.accessTokenValidity = req.body.accessTokenValidity;
        params.refreshTokenValidity = req.body.refreshTokenValidity;
        params.additionalInformation = req.body.additionalInformation;
        params.autoapprove = req.body.autoapprove;
        params.tenantId = req.body.tenantId;
        params.status = req.body.status;
        params.purpose = req.body.purpose;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/client/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.client,
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
    //修改客户端
    app.post('/operationMgmt/appMgmt/client/update.ajax', (req, res, next) => {
        let params = {};
        params.clientId = req.body.clientId;
        params.resourceIds = req.body.resourceIds;
        params.clientSecret = req.body.clientSecret;
        params.scope = req.body.scope;
        params.authorizedGrantTypes = req.body.authorizedGrantTypes;
        params.webServerRedirectUri = req.body.webServerRedirectUri;
        params.authorities = req.body.authorities;
        params.accessTokenValidity = req.body.accessTokenValidity;
        params.refreshTokenValidity = req.body.refreshTokenValidity;
        params.additionalInformation = req.body.additionalInformation;
        params.autoapprove = req.body.autoapprove;
        params.tenantId = req.body.tenantId;
        params.status = req.body.status;
        params.purpose = req.body.purpose;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/client/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.client,
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
    //删除客户端
    app.post('/operationMgmt/appMgmt/client/delete.ajax', (req, res, next) => {
        let params = {};
        params.clientId = req.body.clientId;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/client/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.client,
            qs: params,
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
    //查看客户端所有应用
    app.post('/operationMgmt/appMgmt/client/checkApp.ajax', (req, res, next) => {
        let params = {};
        params.clientId = req.body.clientId;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/client/checkApp.ajax',
            req: req,
            url: apiUrlList.checkApp,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //获取所有应用
    app.post('/operationMgmt/appMgmt/client/getAllApp.ajax', (req, res, next) => {
        let params = {};
        params.page = 1;
        params.rows = 999999;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/client/getAllApp.ajax',
            req: req,
            url: apiUrlList.app,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body.formList)) {
                let resultArr = result.body.formList;
                resultArr.forEach((item) => {
                    item.check = false;
                });
                res.send({error: 0, msg: '查询成功', data: resultArr});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //关联应用
    app.post('/operationMgmt/appMgmt/client/relevantClientApp.ajax', (req, res, next) => {
        let params = {};
        params.clientId = req.body.clientId;
        params.appIds = JSON.parse(req.body.appIds);
        let option = {
            pageUrl: '/operationMgmt/appMgmt/client/relevantClientApp.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.checkApp,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '关联成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '关联成功'});
            }
        });
    });
};
