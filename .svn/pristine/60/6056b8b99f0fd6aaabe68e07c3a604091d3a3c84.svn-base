const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.mobileNumInspect;
module.exports = function (app) {

    app.post('/customerService/accountQuery/mobileNumInspect/inspect.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.inspect,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/mobileNumInspect/inspect.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/accountQuery/mobileNumInspect/inspect.ajax error:', error);
            console.log('/customerService/accountQuery/mobileNumInspect/inspect.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/mobileNumInspect/inspect.ajax body:',{
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
                    msg: result.returnMsg,
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
    app.post('/customerService/accountQuery/mobileNumInspect/inspectLogs.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.inspectLogs,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/mobileNumInspect/inspectLogs.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/mobileNumInspect/inspectLogs.ajax error:', error);
            console.log('/customerService/accountQuery/mobileNumInspect/inspectLogs.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/mobileNumInspect/inspectLogs.ajax body:', {
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