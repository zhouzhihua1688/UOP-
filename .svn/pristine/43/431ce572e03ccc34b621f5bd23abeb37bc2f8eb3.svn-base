const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeBasics;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/activeBasics/marketingRule/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            session: req.session,
            pageUrl: '/marketingActive/activeBasics/marketingRule/getList.ajax',
            req,
            url: apiUrl.dataList,
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
            if (result && result.returnCode == '0') {
                result.body.rows.forEach(element => {
                    if (element.baseRuleType == 01) {
                        element.viewRule = '参与规则'
                    } else if (element.baseRuleType == 02) {
                        element.viewRule = '发奖规则'
                    }
                });
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
    // 新增
    app.post('/marketingActive/activeBasics/marketingRule/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeBasics/marketingRule/dataAdd.ajax',
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
    // 修改
    app.post('/marketingActive/activeBasics/marketingRule/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeBasics/marketingRule/dataChange.ajax',
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
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
        });
    });
    // 删除
    app.post('/marketingActive/activeBasics/marketingRule/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeBasics/marketingRule/dataDelete.ajax',
            req,
            url: apiUrl.dataDelete,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
        });
    });
    // 查询单个数据
    app.post('/marketingActive/activeBasics/marketingRule/dataQuery.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeBasics/marketingRule/dataQuery.ajax',
            req,
            url: apiUrl.dataQuery,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
};