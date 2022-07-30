const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').assetTestify.doneQuery;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/assetTestify/doneQuery/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            session: req.session,
            req,
            url: apiUrl.getList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/assetTestify/doneQuery/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/assetTestify/doneQuery/getList.ajax error:', error);
            console.log('/customerService/assetTestify/doneQuery/getList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/assetTestify/doneQuery/getList.ajax body:', '*****');
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
                    msg: '调用失败'
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