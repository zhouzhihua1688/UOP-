const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeTemplateMgmt.activeTemplateDeploy;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/activeTemplateMgmt/activeTemplate/deployDataQueryId.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeTemplateMgmt/activeTemplate/deployDataQueryId.ajax',
            req,
            url: apiUrl.dataQueryId,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            result.body.mcpActCutinPointConfigs.forEach(element => {
                element.mcpActComponentConfigs = result.body.mcpActComponentConfigs
            });
            if (result && result.returnCode == '0') {
                result.body.userName = userName;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });
    //修改
    app.post('/marketingActive/activeTemplateMgmt/activeTemplate/deployDataChange.ajax', (req, res, next) => {
        let params = req.body;
        params.cutinPointComponents = JSON.parse(params.cutinPointComponents)
        let option = {
            pageUrl: '/marketingActive/activeTemplateMgmt/activeTemplate/deployDataChange.ajax',
            req,
            url: apiUrl.dataChange,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '保存成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });
    // 新增
    app.post('/marketingActive/activeTemplateMgmt/activeTemplate/deployDataAdd.ajax', (req, res, next) => {
        let params = req.body;
        params.cutinPointComponents = JSON.parse(params.cutinPointComponents)
        let option = {
            pageUrl: '/marketingActive/activeTemplateMgmt/activeTemplate/deployDataAdd.ajax',
            req,
            url: apiUrl.dataAdd,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });


};