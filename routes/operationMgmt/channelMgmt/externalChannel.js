const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').channelMgmt;
module.exports = function (app) {
    //查询用户
    app.post('/operationMgmt/channelMgmt/externalChannel/getTableData.ajax', (req, res, next) => {
        // let params = {};
        // req.body.searchField && (params.searchField = req.body.searchField);
        // params.page = req.body.page;
        // params.rows = req.body.rows;
        let option = {
            pageUrl: '/operationMgmt/channelMgmt/externalChannel/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                // result.body.formList.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                // resultData.page = result.body.page;
                // resultData.records = result.body.records;
                // resultData.total = Math.ceil(result.body.total / req.body.rows);
                resultData.tableData = result.body;
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
    app.post('/operationMgmt/channelMgmt/externalChannel/getSingleData.ajax', (req, res, next) => {
        let params = {};
        params.channel_code = req.body.channel_code;
        let option = {
            pageUrl: '/operationMgmt/channelMgmt/externalChannel/getSingleData.ajax',
            req: req,
            url: apiUrlList.getSingleData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                let resultData = {};
                resultData.tableData = result.body;
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
    app.post('/operationMgmt/channelMgmt/externalChannel/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.channelCode = req.body.channelCode;
        params.channelName = req.body.channelName;
        params.branchCode = req.body.branchCode;
        params.acceptMode = req.body.acceptMode;
        params.platformAppId = req.body.platformAppId;
        params.platformCode = req.body.platformCode;
        params.platformAppSecret = req.body.platformAppSecret;
        params.platformKindCode = req.body.platformKindCode;
        params.openOfficialAcct = req.body.openOfficialAcct;
        params.status = req.body.status;
        let option = {
            pageUrl: '/operationMgmt/channelMgmt/externalChannel/saveParam.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
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
    app.post('/operationMgmt/channelMgmt/externalChannel/update.ajax', (req, res, next) => {
        let params = {};
        params.channelCode = req.body.channelCode;
        params.channelName = req.body.channelName;
        params.branchCode = req.body.branchCode;
        params.acceptMode = req.body.acceptMode;
        params.platformAppId = req.body.platformAppId;
        params.platformCode = req.body.platformCode;
        params.platformAppSecret = req.body.platformAppSecret;
        params.platformKindCode = req.body.platformKindCode;
        params.openOfficialAcct = req.body.openOfficialAcct;
        params.status = req.body.status;
        let option = {
            pageUrl: '/operationMgmt/channelMgmt/externalChannel/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
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
    app.post('/operationMgmt/channelMgmt/externalChannel/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.channel_code = req.body.channel_code;
        let option = {
            pageUrl: '/operationMgmt/channelMgmt/externalChannel/deleteParam.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs:params,
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