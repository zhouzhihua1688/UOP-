const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeDataQuery.prizeDetailLog;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/activeDataQuery/prizeDetailLog/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            req,
            url: apiUrl.dataList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/marketingActive/activeDataQuery/prizeDetailLog/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/marketingActive/activeDataQuery/prizeDetailLog/getList.ajax error:', error);
            console.log('/marketingActive/activeDataQuery/prizeDetailLog/getList.ajax statusCode:', response && response.statusCode);
            console.log('/marketingActive/activeDataQuery/prizeDetailLog/getList.ajax body:', {
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
                result.body.userName = userName;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    userName,
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    userName,
                    msg: '获取数据失败'
                });
            }
        });
    });

};