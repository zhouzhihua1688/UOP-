const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.firstTradeInspect;
module.exports = function (app) {

    // 获取  数据
    app.post('/customerService/accountQuery/firstTradeInspect/processed.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/customerService/accountQuery/firstTradeInspect/processed.ajax',
            session: req.session,
            url: apiUrl.processed,
            req,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                var data = result.body.filter(item => String(item.custNo).includes(params.custNo) && String(item.result).includes(params.result))
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  数据
    app.post('/customerService/accountQuery/firstTradeInspect/unprocessed.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/customerService/accountQuery/firstTradeInspect/unprocessed.ajax',
            session: req.session,
            url: apiUrl.unprocessed,
            req,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                var data = result.body.filter(item => String(item.custNo).includes(params.custNo) && String(item.result).includes(params.result))

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: data
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  详情数据
    app.post('/customerService/accountQuery/firstTradeInspect/detail.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/customerService/accountQuery/firstTradeInspect/detail.ajax',
            session: req.session,
            url: apiUrl.detail,
            qs: params,
            req,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  详情数据
    app.post('/customerService/accountQuery/firstTradeInspect/modify.ajax', (req, res, next) => {
        let params = req.body;
        params.operAcco = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/customerService/accountQuery/firstTradeInspect/modify.ajax',
            session: req.session,
            url: apiUrl.modify,
            qs: params,
            req,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                if (result.body) {
                    res.send({
                        error: 0,
                        msg: '处理成功',
                        data: result.body
                    });
                } else {
                    res.send({
                        error: 0,
                        msg: '处理失败',
                        data: result.body
                    });
                }

            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });



};