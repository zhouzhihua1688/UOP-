const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').selfFundManage.staticFund;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/selfFundManage/staticFund/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            req,
            url: apiUrl.getList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/selfFundManage/staticFund/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/selfFundManage/staticFund/getList.ajax error:', error);
            console.log('/customerService/selfFundManage/staticFund/getList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/selfFundManage/staticFund/getList.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
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
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  提交修改后数据
    app.post('/customerService/selfFundManage/staticFund/submitData.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.data);
        let option = {
            req,
            url: apiUrl.submitData,
            headers: {
                operator: req.session.loginInfo.userid
            },
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/selfFundManage/staticFund/submitData.ajax option:', {
            ...option,
            req: '#'
        });
        request.put(option, (error, response, body) => {
            console.log('/customerService/selfFundManage/staticFund/submitData.ajax error:', error);
            console.log('/customerService/selfFundManage/staticFund/submitData.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/selfFundManage/staticFund/submitData.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '提交失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '提交成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '提交失败'
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