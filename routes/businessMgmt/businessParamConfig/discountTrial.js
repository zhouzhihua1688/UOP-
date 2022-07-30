const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').businessParamConfig.discountTrial;

module.exports = function (app) {

    // 获取  select选择项数据
    app.post('/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax',
            req,
            url: apiUrl.selectOption,
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
    app.post('/businessMgmt/businessParamConfig/discountTrial/getData.ajax', (req, res, next) => {
        let params = req.body;
        for (const key in params) {
            params[key] == '' ? delete params[key] : '';
        }
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/discountTrial/getData.ajax',
            req,
            url: apiUrl.gatData,
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
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body,
                    userId
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    })

}