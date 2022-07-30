const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.IDInspect;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/accountQuery/IDInspect/inspect.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.inspect,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/IDInspect/inspect.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/accountQuery/IDInspect/inspect.ajax error:', error);
            console.log('/customerService/accountQuery/IDInspect/inspect.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/IDInspect/inspect.ajax body:', body);
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
    // 获取  初始数据和查询
    app.post('/customerService/accountQuery/IDInspect/geiInfo.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.geiInfo,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/IDInspect/geiInfo.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/accountQuery/IDInspect/geiInfo.ajax error:', error);
            console.log('/customerService/accountQuery/IDInspect/geiInfo.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/IDInspect/geiInfo.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '客户信息获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '客户信息调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '客户信息获取失败'
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