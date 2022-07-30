const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.bankCardInspect;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/accountQuery/bankCardInspect/inspectZT.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.inspectZT,
            req,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/bankCardInspect/inspectZT.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/accountQuery/bankCardInspect/inspectZT.ajax error:', error);
            console.log('/customerService/accountQuery/bankCardInspect/inspectZT.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/bankCardInspect/inspectZT.ajax body:', {
                ...body,
                ['body']: '*****'
            });
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
    app.post('/customerService/accountQuery/bankCardInspect/inspectGEO.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.inspectGEO,
            req,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/bankCardInspect/inspectGEO.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/accountQuery/bankCardInspect/inspectGEO.ajax error:', error);
            console.log('/customerService/accountQuery/bankCardInspect/inspectGEO.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/bankCardInspect/inspectGEO.ajax body:', {
                ...body,
                ['body']: '*****'
            });
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


};